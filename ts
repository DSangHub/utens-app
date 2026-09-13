import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          500: "#6366F1",
          600: "#4F46E5",
        },
      },
      animation: {
        "fade-up": "fadeUp .6s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, passwordHash, onboardStep: 1 },
  });

  return NextResponse.json({ ok: true });import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { platform: string } }
) {
  const { platform } = params;
  const base = process.env.NEXTAUTH_URL!;
  const redirectUri = `${base}/api/oauth/${platform}/callback`;

  const urls: Record<string, string> = {
    instagram: `https://api.instagram.com/oauth/authorize?client_id=${process.env.IG_CLIENT_ID}&redirect_uri=${redirectUri}&scope=instagram_basic,instagram_manage_comments&response_type=code`,
    facebook: `https://www.facebook.com/v19.0/dialog/oauth?client_id=${process.env.FB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=pages_manage_engagement,pages_read_engagement`,
    tiktok: `https://www.tiktok.com/v2/auth/authorize/?client_key=${process.env.TT_CLIENT_KEY}&scope=comment.list,comment.list.manage&response_type=code&redirect_uri=${redirectUri}`,
    // ...
  };

  const url = urls[platform];
  if (!url) return NextResponse.json({ error: "Unsupported" }, { status: 404 });
  return NextResponse.redirect(url);
}
}import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { exchangeCode } from "@/lib/platforms";

export async function GET(
  req: NextRequest,
  { params }: { params: { platform: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.redirect("/login");

  const code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.redirect("/onboarding/step-3-connect?error=no_code");

  const tokens = await exchangeCode(params.platform, code);

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    include: { org: true },
  });

  // Auto-create org if user has none
  const org = user.org ?? (await prisma.organization.create({
    data: { name: `${user.name ?? "My"}'s Brand` },
  }));
  if (!user.orgId) {
    await prisma.user.update({ where: { id: user.id }, data: { orgId: org.id } });
  }

  await prisma.profile.create({
    data: {
      orgId: org.id,
      platform: params.platform.toUpperCase() as any,
      handle: tokens.handle ?? "unknown",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    },
  });

  return NextResponse.redirect("/onboarding/step-3-connect?success=1");
}
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const PRICES = {
  STARTER: process.env.STRIPE_PRICE_STARTER!, // price_xxx  → $19.95
  PRO:     process.env.STRIPE_PRICE_PRO!,     // price_yyy  → $49.95
};

export const TRIAL_DAYS = 14;

export const PLAN_LIMITS = {
  TRIAL:   { profiles: 3,  replies: 500,   deepMode: true,  conversion: true  },
  STARTER: { profiles: 3,  replies: 2000,  deepMode: false, conversion: false },
  PRO:     { profiles: 10, replies: 15000, deepMode: true,  conversion: true  },
  CANCELLED: { profiles: 0, replies: 0, deepMode: false, conversion: false },
} as const;import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe, PRICES, TRIAL_DAYS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauth" }, { status: 401 });

  const { plan } = await req.json(); // "STARTER" | "PRO"
  const priceId = PRICES[plan as "STARTER" | "PRO"];
  if (!priceId) return NextResponse.json({ error: "bad plan" }, { status: 400 });

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    include: { org: true },
  });
  const org = user.org!;

  // Create or reuse Stripe customer
  let customerId = org.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: org.name,
      metadata: { orgId: org.id },
    });
    customerId = customer.id;
    await prisma.organization.update({
      where: { id: org.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: TRIAL_DAYS,
      metadata: { orgId: org.id, plan },
    },
    success_url: `${process.env.NEXTAUTH_URL}/onboarding/step-7-done?session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/onboarding/step-6-plan?cancelled=1`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: checkout.url });
}import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();
  const event = stripe.webhooks.constructEvent(
    body, sig, process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object as any;
      await prisma.organization.update({
        where: { id: s.metadata.orgId },
        data: {
          plan: s.metadata.plan,
          stripeSubId: s.subscription,
          trialEndsAt: new Date(Date.now() + 14 * 864e5),
        },
      });
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as any;
      const orgId = sub.metadata.orgId;
      const status = sub.status; // trialing | active | past_due | canceled
      await prisma.organization.update({
        where: { id: orgId },
        data: {
          plan: status === "canceled" ? "CANCELLED"
              : sub.items.data[0].price.id === process.env.STRIPE_PRICE_PRO ? "PRO"
              : "STARTER",
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
          trialEndsAt: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as any;
      await prisma.organization.update({
        where: { id: sub.metadata.orgId },
        data: { plan: "CANCELLED" },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}const org = await prisma.organization.create({
  data: {
    name: `${name ?? "My"}'s Brand`,
    plan: "TRIAL",
    trialEndsAt: new Date(Date.now() + 14 * 864e5),
  },
});import { prisma } from "@/lib/db";
import { PLAN_LIMITS } from "@/lib/stripe";

export async function getOrgAccess(orgId: string) {
  const org = await prisma.organization.findUniqueOrThrow({ where: { id: orgId } });

  const now = new Date();
  const trialActive = org.plan === "TRIAL" && org.trialEndsAt && org.trialEndsAt > now;
  const trialExpired = org.plan === "TRIAL" && org.trialEndsAt && org.trialEndsAt <= now;

  if (trialExpired) {
    await prisma.organization.update({
      where: { id: orgId },
      data: { plan: "CANCELLED" },
    });
  }

  const effectivePlan = trialActive ? "TRIAL" : org.plan;
  return {
    plan: effectivePlan,
    limits: PLAN_LIMITS[effectivePlan as keyof typeof PLAN_LIMITS],
    trialDaysLeft: trialActive
      ? Math.ceil((org.trialEndsAt!.getTime() - now.getTime()) / 864e5)
      : 0,
  };
}
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getOrgAccess } from "@/lib/trial";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
  });
  if (!user.orgId) return NextResponse.json({ plan: "TRIAL", trialDaysLeft: 0 });

  const access = await getOrgAccess(user.orgId);
  return NextResponse.json(access);
}export async function deepConversationTurn({
  history,
  products,
  brandVoice,
}: {
  history: { role: "customer" | "ai" | "host"; content: string }[];
  products: { name: string; description: string; price: number; url?: string }[];
  brandVoice: string;
}) {
  const catalog = products
    .map((p) => `- ${p.name} ($${p.price}): ${p.description}${p.url ? ` — ${p.url}` : ""}`)
    .join("\n");

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a sales-savvy brand assistant for a ${brandVoice} brand.
Your goal: keep the customer engaged, answer follow-ups, overcome objections, and guide them to purchase.

Catalog:
${catalog}

Return JSON:
{
  "reply": string,               // next message to customer (max 3 sentences)
  "recommendedProduct": string?, // product name if relevant
  "nextStep": "ask_question" | "recommend" | "send_link" | "close" | "handoff",
  "conversionConfidence": number // 0-1 chance they'll buy
}

Rules:
- Never invent products. Only reference catalog.
- If customer is angry, complex, or asks about legal/refunds → nextStep = "handoff".
- If interest is high and product matched → nextStep = "send_link".
- Keep tone human, warm, not pushy.`,
      },
      ...history.map((m) => ({
        role: m.role === "customer" ? "user" : "assistant",
        content: m.content,
      })),
    ],
  });

  return JSON.parse(res.choices[0].message.content!);
}import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrgAccess } from "@/lib/trial";
import { deepConversationTurn } from "@/lib/ai";
import { postReply } from "@/lib/platforms";
import { escalateToHost } from "@/lib/twilio";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { customerMessage } = await req.json();
  const conv = await prisma.conversation.findUniqueOrThrow({
    where: { id: params.id },
    include: {
      comment: { include: { profile: true } },
      org: { include: { products: true, scripts: true } },
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  const access = await getOrgAccess(conv.orgId);
  if (!access.limits.deepMode) {
    return NextResponse.json({ error: "Deep mode requires Pro plan" }, { status: 402 });
  }

  // Save customer's message
  await prisma.conversationMessage.create({
    data: { conversationId: conv.id, role: "customer", content: customerMessage },
  });

  const history = [
    ...conv.messages.map((m) => ({ role: m.role as any, content: m.content })),
    { role: "customer" as const, content: customerMessage },
  ];

  const turn = await deepConversationTurn({
    history,
    products: conv.org.products.map((p) => ({
      name: p.name,
      description: p.description,
      price: Number(p.price),
      url: p.url ?? undefined,
    })),
    brandVoice: conv.org.brandVoice ?? "friendly",
  });

  // Save AI message
  await prisma.conversationMessage.create({
    data: { conversationId: conv.id, role: "ai", content: turn.reply },
  });

  // Handle next step
  if (turn.nextStep === "handoff") {
    await escalateToHost({
      email: conv.comment.profile.escalationEmail,
      phone: conv.comment.profile.escalationPhone,
      comment: { authorName: conv.comment.authorName, content: customerMessage, intent: "deep_handoff" },
      suggestedReply: turn.reply,
      confidence: turn.conversionConfidence,
      commentId: conv.commentId,
    });
    await prisma.conversation.update({
      where: { id: conv.id },
      data: { outcome: "HANDED_OFF" },
    });
  } else {
    await postReply(
      conv.comment.profile.platform,
      conv.comment.profile.accessToken!,
      conv.comment.externalId,
      turn.reply
    );
  }

  return NextResponse.json(turn);
}
// api/stripe/portal/route.ts
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session!.user.id },
    include: { org: true },
  });
  const portal = await stripe.billingPortal.sessions.create({
    customer: user.org!.stripeCustomerId!,
    return_url: `${process.env.NEXTAUTH_URL}/billing`,
  });
  return NextResponse.json({ url: portal.url });
}PRO: { profiles: 10, replies: 5000, deepMode: true, conversion: true }// On Stripe: metered price for overage at $0.01/reply
// Report usage via stripe.subscriptionItems.createUsageRecord()
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getOrgAccess } from "@/lib/trial";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauth" }, { status: 401 });

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } });
  if (!user.orgId) return NextResponse.json({ products: [] });

  const products = await prisma.product.findMany({
    where: { orgId: user.orgId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauth" }, { status: 401 });

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    include: { org: true },
  });
  if (!user.orgId) return NextResponse.json({ error: "no org" }, { status: 400 });

  const access = await getOrgAccess(user.orgId);
  if (!access.limits.deepMode) {
    return NextResponse.json(
      { error: "Product catalog requires the Pro plan" },
      { status: 402 }
    );
  }

  const body = await req.json();
  const { name, description, price, url, imageUrl, keywords } = body;

  if (!name || !description || typeof price !== "number") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      orgId: user.orgId,
      name,
      description,
      price,
      url: url || null,
      imageUrl: imageUrl || null,
      keywords: Array.isArray(keywords) ? keywords : [],
    },
  });

  return NextResponse.json({ product });
}import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function assertOwner(productId: string, userId: string) {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const product = await prisma.product.findUniqueOrThrow({ where: { id: productId } });
  if (!user.orgId || product.orgId !== user.orgId) throw new Error("forbidden");
  return product;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauth" }, { status: 401 });
  try {
    await assertOwner(params.id, session.user.id);
  } catch {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      url: body.url ?? null,
      imageUrl: body.imageUrl ?? null,
      keywords: body.keywords ?? [],
    },
  });
  return NextResponse.json({ product });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauth" }, { status: 401 });
  try {
    await assertOwner(params.id, session.user.id);
  } catch {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauth" }, { status: 401 });

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } });
  if (!user.orgId) return NextResponse.json({ conversations: [] });

  const outcome = req.nextUrl.searchParams.get("outcome");
  const search = req.nextUrl.searchParams.get("q");

  const conversations = await prisma.conversation.findMany({
    where: {
      orgId: user.orgId,
      ...(outcome && outcome !== "ALL" ? { outcome: outcome as any } : {}),
      ...(search
        ? {
            comment: {
              OR: [
                { content: { contains: search, mode: "insensitive" } },
                { authorName: { contains: search, mode: "insensitive" } },
              ],
            },
          }
        : {}),
    },
    include: {
      comment: {
        include: { profile: true },
      },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: { select: { messages: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 100,
  });

  return NextResponse.json({
    conversations: conversations.map((c) => ({
      id: c.id,
      outcome: c.outcome,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      purchaseAt: c.purchaseAt,
      messageCount: c._count.messages,
      lastMessage: c.messages[0]?.content ?? "",
      comment: {
        authorName: c.comment.authorName,
        authorHandle: c.comment.authorHandle,
        content: c.comment.content,
        platform: c.comment.profile.platform,
      },
    })),
  });
}import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauth" }, { status: 401 });

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } });
  const conv = await prisma.conversation.findUniqueOrThrow({
    where: { id: params.id },
    include: {
      comment: { include: { profile: true } },
      messages: { orderBy: { createdAt: "asc" } },
      org: { include: { products: true } },
    },
  });

  if (conv.orgId !== user.orgId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    conversation: {
      id: conv.id,
      outcome: conv.outcome,
      purchaseAt: conv.purchaseAt,
      createdAt: conv.createdAt,
      comment: {
        authorName: conv.comment.authorName,
        authorHandle: conv.comment.authorHandle,
        content: conv.comment.content,
        platform: conv.comment.profile.platform,
      },
      messages: conv.messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        createdAt: m.createdAt,
      })),
    },
  });
}
