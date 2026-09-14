import twilio from "twilio";

function twilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) throw new Error("Twilio credentials are not configured");
  return twilio(sid, token);
}

export async function sendEscalation(input: {
  to?: string;
  brandName: string;
  customerMessage: string;
  suggestedReply: string;
  reason: string;
}) {
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = input.to || process.env.UTENS_HOST_PHONE;
  if (!from || !to) throw new Error("Twilio from/to phone number is not configured");
  const body = [
    `Utens alert for ${input.brandName}`,
    `Customer: ${input.customerMessage}`,
    `Suggested: ${input.suggestedReply}`,
    `Why escalated: ${input.reason}`,
  ].join("\n\n").slice(0, 1500);
  const message = await twilioClient().messages.create({ from, to, body });
  return { sid: message.sid, status: message.status };
}

export async function sendTrialSignup(input: {
  name: string;
  business: string;
  email: string;
  phone?: string;
}) {
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.UTENS_HOST_PHONE;
  if (!from || !to) throw new Error("Twilio from/to phone number is not configured");
  const body = [
    "New Utens 14-day trial request",
    `Name: ${input.name}`,
    `Business: ${input.business}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : null,
  ].filter(Boolean).join("\n");
  const message = await twilioClient().messages.create({ from, to, body });
  return { sid: message.sid, status: message.status };
}

export function isValidTwilioWebhook(request: Request, form: URLSearchParams) {
  const token = process.env.TWILIO_AUTH_TOKEN;
  const signature = request.headers.get("x-twilio-signature");
  if (!token || !signature) return false;
  const configured = process.env.TWILIO_WEBHOOK_URL;
  const url = configured || request.url;
  return twilio.validateRequest(token, signature, url, Object.fromEntries(form));
}
