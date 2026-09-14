import { NextResponse } from "next/server";
import { z } from "zod";
import { sendTrialSignup } from "@/lib/twilio";

const SignupSchema = z.object({
  name: z.string().trim().min(2).max(100),
  business: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional(),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  try {
    const input = SignupSchema.parse(await request.json());
    await sendTrialSignup(input);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("trial signup failed", error);
    return NextResponse.json(
      { error: error instanceof z.ZodError ? "Please check the highlighted information." : "We could not start your trial. Please try again." },
      { status: error instanceof z.ZodError ? 400 : 503 },
    );
  }
}
