import OpenAI from "openai";
import { z } from "zod";

const AnswerSchema = z.object({
  reply: z.string().min(1).max(1200),
  confidence: z.number().min(0).max(1),
  sentiment: z.enum(["positive", "neutral", "negative"]),
  category: z.enum(["question", "complaint", "refund", "legal", "sales", "other"]),
  needsEscalation: z.boolean(),
  reason: z.string().max(300),
});

export type AiAnswer = z.infer<typeof AnswerSchema>;

function client() {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function answerCustomer(input: {
  message: string;
  brandName: string;
  brandVoice?: string;
  scripts?: Array<{ topic: string; answer: string }>;
}): Promise<AiAnswer> {
  const scripts = (input.scripts ?? []).map((s) => `${s.topic}: ${s.answer}`).join("\n") || "No approved scripts supplied.";
  const response = await client().responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5.5-mini",
    instructions: `You are the customer-response assistant for ${input.brandName}. Be ${input.brandVoice || "friendly, professional, and concise"}. Use approved scripts as the source of truth. Never invent policies, prices, refunds, legal conclusions, order status, or promises. Escalate complaints, refunds, threats, legal or safety issues, requests involving private account data, or any answer below 0.75 confidence. Return JSON only with reply, confidence, sentiment, category, needsEscalation, and reason.`,
    input: `APPROVED SCRIPTS:\n${scripts}\n\nCUSTOMER MESSAGE:\n${input.message}`,
    text: {
      format: {
        type: "json_schema",
        name: "utens_answer",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            reply: { type: "string" },
            confidence: { type: "number", minimum: 0, maximum: 1 },
            sentiment: { type: "string", enum: ["positive", "neutral", "negative"] },
            category: { type: "string", enum: ["question", "complaint", "refund", "legal", "sales", "other"] },
            needsEscalation: { type: "boolean" },
            reason: { type: "string" }
          },
          required: ["reply", "confidence", "sentiment", "category", "needsEscalation", "reason"]
        }
      }
    }
  });
  return AnswerSchema.parse(JSON.parse(response.output_text));
}
