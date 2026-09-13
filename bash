npx create-next-app@latest utens-app --typescript --tailwind --app
cd utens-app
npm i prisma @prisma/client openai stripe twilio resend bullmq ioredis next-auth
npx prisma init
# Add .env keys
npx prisma migrate dev --name init
npm run dev
