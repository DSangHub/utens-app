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
