# Utens.app

Backend-ready Next.js application for OpenAI customer answers and Twilio SMS escalation.

## Flow

1. A trusted integration posts a customer message to `POST /api/answers`.
2. OpenAI returns a structured answer, confidence, sentiment, and escalation decision.
3. Safe, high-confidence answers are returned to the caller for posting.
4. Sensitive or uncertain messages trigger a Twilio SMS to the business owner.
5. Twilio inbound SMS webhooks go to `POST /api/twilio/inbound` and are signature-validated.

## Setup

Copy `.env.example` to `.env.local`, fill in the server-only values, then run:

```bash
npm install
npm run typecheck
npm run build
```

Set the same variables in Vercel. Configure the Twilio Messaging webhook as `https://YOUR_DOMAIN/api/twilio/inbound`. Set `TWILIO_WEBHOOK_URL` to that exact URL if a proxy changes the request URL.

Call `/api/answers` with the `x-api-key` header set to `INTERNAL_API_SECRET`. Never expose OpenAI or Twilio credentials in browser code.
