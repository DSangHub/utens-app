import twilio from "twilio";
import { isValidTwilioWebhook } from "@/lib/twilio";

export async function POST(request: Request) {
  const form = new URLSearchParams(await request.text());
  if (!isValidTwilioWebhook(request, form)) return new Response("Invalid signature", { status: 403 });
  const response = new twilio.twiml.MessagingResponse();
  response.message("Utens received your message. Open the Utens dashboard to review and send the final customer reply.");
  return new Response(response.toString(), { headers: { "content-type": "text/xml" } });
}
