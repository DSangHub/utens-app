import { NextResponse } from "next/server";
import { z } from "zod";
import { answerCustomer } from "@/lib/ai";
import { isAuthorized } from "@/lib/auth";
import { sendEscalation } from "@/lib/twilio";

const RequestSchema = z.object({
  message: z.string().trim().min(1).max(4000),
  brandName: z.string().trim().min(1).max(100),
  brandVoice: z.string().trim().max(300).optional(),
  hostPhone: z.string().trim().max(30).optional(),
  scripts: z.array(z.object({ topic: z.string().max(100), answer: z.string().max(2000) })).max(50).optional(),
});

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const input = RequestSchema.parse(await request.json());
    const answer = await answerCustomer(input);
    let escalation = null;
    if (answer.needsEscalation || answer.confidence < 0.75) {
      escalation = await sendEscalation({ to: input.hostPhone, brandName: input.brandName, customerMessage: input.message, suggestedReply: answer.reply, reason: answer.reason });
    }
    return NextResponse.json({ answer, escalated: Boolean(escalation), escalation });
  } catch (error) {
    console.error("answers route failed", error);
    return NextResponse.json({ error: error instanceof z.ZodError ? "Invalid request" : "Unable to create answer" }, { status: error instanceof z.ZodError ? 400 : 500 });
  }
}
