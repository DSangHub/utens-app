"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-400 grid place-items-center text-white">
            U
          </span>
          Utens<span className="text-indigo-600">.app</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 shadow-sm transition"
          >
            Start free
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-700"
          aria-label="Menu"
        >
          ☰
        </button>
      </nav>
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-gray-700">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <Link href="/signup" className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-center">
            Start free
          </Link>
        </div>
      )}
    </header>
  );
}import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* gradient blob */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-40 -left-40 w-[400px] h-[400px] bg-cyan-200 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1">
            🤖 AI-powered · 24/7 · Stripe-ready
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Your AI front desk for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              comments, questions & complaints.
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Utens.app replies to every comment on your profiles and ads using
            your pre-scripted messages. When AI isn't sure, it pings you via
            SMS or email — and keeps the customer engaged while you decide.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup"
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 shadow-lg shadow-indigo-200 transition text-center"
            >
              Start free — no card needed
            </Link>
            <Link
              href="#how"
              className="rounded-xl border border-gray-200 hover:border-gray-300 text-gray-800 font-semibold px-6 py-3 transition text-center"
            >
              See how it works →
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Check /> Setup in 5 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Check /> 20× cheaper than a hire
            </span>
          </div>
        </div>

        {/* Chat mockup */}
        <div className="relative">
          <div className="rounded-2xl bg-white border border-gray-200 shadow-2xl shadow-indigo-100 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-50">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-gray-500">@yourbrand · Instagram</span>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <Bubble side="in">Hi! Do you ship to Canada? 🇨🇦</Bubble>
              <Bubble side="out">
                Yes! We ship to Canada in 5–7 business days. Free over $75.
                <Tag>AI · Script #shipping</Tag>
              </Bubble>
              <Bubble side="in">My order arrived damaged 😞</Bubble>
              <Bubble side="out">
                So sorry about that — I'm checking with our team right now and
                will get back to you within the hour.
                <Tag warn>Escalated to host via SMS</Tag>
              </Bubble>
              <div className="rounded-lg bg-amber-50 border border-amber-200 text-amber-800 p-3 text-xs">
                <strong>Host notified:</strong> "Customer reports damaged item
                — suggested reply ready. Approve in 1 tap."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ children, side }: { children: React.ReactNode; side: "in" | "out" }) {
  const base = "max-w-[80%] rounded-2xl px-4 py-2.5";
  return (
    <div className={side === "out" ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          side === "out"
            ? `${base} bg-indigo-600 text-white`
            : `${base} bg-gray-100 text-gray-800`
        }
      >
        {children}
      </div>
    </div>
  );
}

function Tag({ children, warn }: { children: React.ReactNode; warn?: boolean }) {
  return (
    <span
      className={`block mt-1.5 text-[10px] font-medium ${
        warn ? "text-amber-200" : "text-indigo-200"
      }`}
    >
      {children}
    </span>
  );
}

function Check() {
  return (
    <svg className="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
    </svg>
  );
}export default function LogoCloud() {
  const logos = ["Shopify", "Gymshark", "Glossier", "Nike", "Allbirds", "Sephora"];
  return (
    <section className="border-y bg-gray-50 py-10">
      <p className="text-center text-xs uppercase tracking-widest text-gray-500">
        Trusted by teams managing 1M+ comments a month
      </p>
      <div className="mt-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
        {logos.map((l) => (
          <span key={l} className="text-xl font-bold text-gray-700">{l}</span>
        ))}
      </div>
    </section>
  );
}export default function Problem() {
  const items = [
    { icon: "⏰", title: "Comments pile up overnight", body: "80% of questions go unanswered after hours — customers bounce." },
    { icon: "💸", title: "Hiring is expensive", body: "A community manager costs $2,500+/mo and still misses messages." },
    { icon: "😡", title: "Complaints spiral", body: "One ignored DM becomes a 1-star review and a lost customer." },
    { icon: "📉", title: "CSI drops quietly", body: "Slow replies kill retention, referrals, and paid ad ROI." },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Every unanswered comment is a lost customer.
        </h2>
        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
          Your audience is talking. Your team can't keep up. Utens.app closes the gap.
        </p>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition">
              <div className="text-3xl">{i.icon}</div>
              <h3 className="mt-4 font-semibold text-gray-900">{i.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}export default function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI replies with your scripts",
      body: "Upload canned responses — AI matches intent and answers on-brand, instantly.",
    },
    {
      icon: "🚨",
      title: "Smart escalation",
      body: "Unsure or sensitive? AI pings the host via SMS or email with a suggested reply.",
    },
    {
      icon: "💬",
      title: "Holding messages",
      body: "Keeps the customer engaged while waiting for the correct answer — zero dead air.",
    },
    {
      icon: "🔌",
      title: "Works everywhere",
      body: "Instagram, Facebook, TikTok, YouTube, X, LinkedIn, Google Business.",
    },
    {
      icon: "📊",
      title: "Analytics that matter",
      body: "Track resolution rate, sentiment, response time, and CSI lift.",
    },
    {
      icon: "💳",
      title: "Built-in Stripe billing",
      body: "Usage-based plans. Upgrade, downgrade, and get paid — no code required.",
    },
  ];
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Everything you need to scale conversations
        </h2>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white border border-gray-100 p-6 hover:-translate-y-0.5 hover:shadow-xl transition"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 grid place-items-center text-xl">
                {f.icon}
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}export default function HowItWorks() {
  const steps = [
    { n: 1, title: "Connect your profiles", body: "One-click OAuth for Instagram, TikTok, YouTube, and more." },
    { n: 2, title: "Add your scripts", body: "Paste FAQs, brand voice, and canned responses. AI learns instantly." },
    { n: 3, title: "AI handles the rest", body: "Comments get classified, answered, or escalated to you via SMS/email." },
    { n: 4, title: "You approve & grow", body: "One-tap replies, better CSI, more repeat customers." },
  ];
  return (
    <section id="how" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          From chaos to calm in 4 steps
        </h2>
        <div className="mt-14 space-y-8">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 text-white grid place-items-center font-bold text-lg">
                {s.n}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{s.title}</h3>
                <p className="text-gray-600 mt-1">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "Try it on one profile",
    features: ["100 AI replies / mo", "1 profile", "Email escalation", "Basic scripts"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Starter",
    price: "$29",
    cadence: "/month",
    tagline: "For solo founders & creators",
    features: ["2,000 AI replies / mo", "3 profiles", "SMS + email escalation", "Analytics dashboard"],
    cta: "Start 14-day trial",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$99",
    cadence: "/month",
    tagline: "For growing brands & agencies",
    features: ["15,000 AI replies / mo", "10 profiles", "Priority SMS", "Custom brand voice", "Team seats"],
    cta: "Start 14-day trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    tagline: "For large teams",
    features: ["Unlimited replies", "Unlimited profiles", "SSO + API", "SLA & dedicated support"],
    cta: "Talk to sales",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900">Simple, honest pricing</h2>
          <p className="mt-4 text-gray-600">
            A human employee costs $2,500/mo. Utens costs a fraction — and never sleeps.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-6 flex flex-col border ${
                p.highlight
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-2xl lg:scale-105"
                  : "bg-white border-gray-200"
              }`}
            >
              {p.highlight && (
                <span className="self-start text-[10px] font-bold uppercase bg-white/20 rounded-full px-2 py-1 mb-3">
                  Most popular
                </span>
              )}
              <h3 className={`text-lg font-semibold ${p.highlight ? "text-white" : "text-gray-900"}`}>
                {p.name}
              </h3>
              <p className={`text-sm mt-1 ${p.highlight ? "text-indigo-100" : "text-gray-500"}`}>
                {p.tagline}
              </p>
              <div className="mt-5 flex items-end gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className={p.highlight ? "text-indigo-200" : "text-gray-500"}>
                  {p.cadence}
                </span>
              </div>
              <ul className={`mt-6 space-y-2 text-sm ${p.highlight ? "text-indigo-50" : "text-gray-600"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`mt-8 rounded-xl px-4 py-2.5 text-center font-semibold text-sm transition ${
                  p.highlight
                    ? "bg-white text-indigo-700 hover:bg-indigo-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}export default function Testimonials() {
  const quotes = [
    {
      quote: "We cut our community team's workload by 70% in the first month. AI replies sound exactly like us.",
      name: "Maya R.",
      role: "Head of Social, DTC skincare brand",
    },
    {
      quote: "The escalation pings are genius. I approve a reply in 10 seconds while getting coffee.",
      name: "Daniel K.",
      role: "Founder, 1.2M-follower fitness account",
    },
    {
      quote: "Our CSAT jumped 22 points. Customers think we hired a night shift — we didn't.",
      name: "Priya S.",
      role: "CX Lead, e-commerce",
    },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Loved by founders & social teams
        </h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <figure key={q.name} className="rounded-2xl bg-gray-50 p-6 border border-gray-100">
              <blockquote className="text-gray-800">"{q.quote}"</blockquote>
              <figcaption className="mt-4 text-sm">
                <div className="font-semibold text-gray-900">{q.name}</div>
                <div className="text-gray-500">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}"use client";
import { useState } from "react";

const faqs = [
  {
    q: "How does the AI know what to say?",
    a: "You upload pre-scripted responses mapped to intents (shipping, pricing, complaints, etc.). The AI matches each comment to the closest script and replies in your brand voice.",
  },
  {
    q: "What happens if the AI isn't sure?",
    a: "It sends you an SMS or email with the comment and a suggested reply. Meanwhile, it posts a warm holding message so the customer knows they've been heard.",
  },
  {
    q: "Which platforms do you support?",
    a: "Instagram, Facebook, TikTok, YouTube, X (Twitter), LinkedIn, and Google Business Profiles. More coming monthly.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. OAuth tokens are encrypted at rest, PII is scrubbed before AI calls, and we're GDPR-compliant with a one-click data deletion option.",
  },
  {
    q: "Can I try it before paying?",
    a: "Absolutely — the Free plan gives you 100 AI replies/month forever. Paid plans include a 14-day trial.",
  },
  {
    q: "How is this cheaper than hiring?",
    a: "A community manager costs ~$2,500/mo. Utens handles 10,000+ comments for around $100 in usage — 20× cheaper, 24/7.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Frequently asked questions
        </h2>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-xl bg-white border border-gray-200">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-900"
              >
                {f.q}
                <span className="text-indigo-600 text-xl">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-gray-600 text-sm">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 to-cyan-500 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold">
          Stop losing customers to slow replies.
        </h2>
        <p className="mt-6 text-lg text-indigo-50">
          Set up Utens.app in 5 minutes. Let AI handle the noise while you grow.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="rounded-xl bg-white text-indigo-700 font-semibold px-6 py-3 hover:bg-indigo-50 transition"
          >
            Start free — no card
          </Link>
          <Link
            href="/demo"
            className="rounded-xl border border-white/40 text-white font-semibold px-6 py-3 hover:bg-white/10 transition"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  );
}export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-white text-lg">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-400 grid place-items-center">
              U
            </span>
            Utens<span className="text-indigo-400">.app</span>
          </div>
          <p className="mt-4">The AI front desk for comments, questions & complaints.</p>
        </div>
        <FooterCol title="Product" links={["Features", "Pricing", "Integrations", "Changelog"]} />
        <FooterCol title="Company" links={["About", "Blog", "Careers", "Contact"]} />
        <FooterCol title="Legal" links={["Privacy", "Terms", "Security", "GDPR"]} />
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-xs">
        © {new Date().getFullYear()} Utens.app — All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-3">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-white transition">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoCloud />
        <Problem />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
}
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ProgressBar from "@/components/onboarding/ProgressBar";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signup");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (user?.onboardDone) redirect("/dashboard");

  const step = user?.onboardStep ?? 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-400 grid place-items-center text-white text-sm">
              U
            </span>
            Utens<span className="text-indigo-600">.app</span>
          </div>
          <a href="/api/auth/signout" className="text-sm text-gray-500 hover:text-gray-800">
            Save & exit
          </a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <ProgressBar current={step} total={7} />
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {children}
        </div>
      </div>
    </div>
  );
}export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>Step {current} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  nextHref: string;
  backHref?: string;
  onNext?: () => Promise<void> | void;
  nextLabel?: string;
  skipHref?: string;
};

export default function StepShell({
  title, subtitle, children, nextHref, backHref, onNext,
  nextLabel = "Continue", skipHref,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleNext() {
    setLoading(true);
    try {
      if (onNext) await onNext();
      router.push(nextHref);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}

      <div className="mt-6 space-y-5">{children}</div>

      <div className="mt-8 flex items-center justify-between">
        {backHref ? (
          <button
            onClick={() => router.push(backHref)}
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            ← Back
          </button>
        ) : <span />}

        <div className="flex items-center gap-3">
          {skipHref && (
            <button
              onClick={() => router.push(skipHref)}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Skip for now
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={loading}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold px-6 py-2.5 transition"
          >
            {loading ? "Saving…" : nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json();
      setErr(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }
    // auto-login
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    router.push("/onboarding/step-1-account");
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-8">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-400 grid place-items-center text-white">
              U
            </span>
            Utens<span className="text-indigo-600">.app</span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-sm text-gray-500 mt-1">Free forever. No credit card.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <Input label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Input label="Work email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Input label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required minLength={8} />

            {err && <p className="text-sm text-red-600">{err}</p>}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold py-2.5 transition"
            >
              {loading ? "Creating…" : "Create account"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-gray-400">
            <div className="flex-1 h-px bg-gray-200" /> OR <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="space-y-2">
            <OAuthBtn provider="google" label="Continue with Google" />
            <OAuthBtn provider="facebook" label="Continue with Facebook" />
          </div>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-semibold">Log in</Link>
          </p>
        </div>
      </div>

      {/* Right: value prop */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-600 to-cyan-500 text-white p-12">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold">Set up in 5 minutes.</h2>
          <ul className="mt-8 space-y-4 text-indigo-50">
            <li>✅ AI replies to comments with your scripts</li>
            <li>✅ Smart escalation to your phone</li>
            <li>✅ Works on IG, FB, TikTok, YouTube & more</li>
            <li>✅ 20× cheaper than a hire</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Input({
  label, value, onChange, type = "text", required, minLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        minLength={minLength}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none px-3 py-2.5 text-sm"
      />
    </label>
  );
}

function OAuthBtn({ provider, label }: { provider: string; label: string }) {
  return (
    <button
      onClick={() => signIn(provider, { callbackUrl: "/onboarding/step-1-account" })}
      className="w-full rounded-xl border border-gray-200 hover:bg-gray-50 py-2.5 text-sm font-medium text-gray-700 transition"
    >
      {label}
    </button>
  );
}
import StepShell from "@/components/onboarding/StepShell";
import AccountForm from "./form";

export default function Page() {
  return (
    <StepShell
      title="Welcome! Let's get you set up 🎉"
      subtitle="This takes about 5 minutes. We'll save as you go."
      nextHref="/onboarding/step-2-organization"
    >
      <AccountForm />
    </StepShell>
  );
}"use client";
import { useState } from "react";

export default function AccountForm() {
  const [phone, setPhone] = useState("");
  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Mobile (for escalation SMS)</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 555 123 4567"
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
        />
        <span className="text-xs text-gray-500">Optional — you can add this later.</span>
      </label>
    </div>
  );
}"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StepShell from "@/components/onboarding/StepShell";

const INDUSTRIES = [
  "E-commerce / DTC", "Beauty & Skincare", "Fitness & Wellness",
  "Food & Beverage", "SaaS", "Creator / Influencer",
  "Agency", "Hospitality", "Other",
];

export default function Page() {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [voice, setVoice] = useState("friendly");
  const router = useRouter();

  async function save() {
    await fetch("/api/onboarding/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: 2, name, industry, brandVoice: voice }),
    });
  }

  return (
    <StepShell
      title="Tell us about your brand"
      subtitle="We'll use this to tune your AI replies."
      nextHref="/onboarding/step-3-connect"
      backHref="/onboarding/step-1-account"
      onNext={save}
    >
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Brand name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Glow Skincare"
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
        />
      </label>

      <div>
        <span className="text-sm font-medium text-gray-700">Industry</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {INDUSTRIES.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndustry(i)}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                industry === i
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm font-medium text-gray-700">Brand voice</span>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {["friendly", "professional", "playful", "luxurious"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVoice(v)}
              className={`rounded-lg border px-3 py-2 text-sm capitalize transition ${
                voice === v
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </StepShell>
  );
}"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StepShell from "@/components/onboarding/StepShell";

const PLATFORMS = [
  { id: "instagram", name: "Instagram", icon: "📸", color: "from-pink-500 to-purple-500" },
  { id: "facebook", name: "Facebook", icon: "👍", color: "from-blue-500 to-blue-700" },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "from-gray-900 to-black" },
  { id: "youtube", name: "YouTube", icon: "▶️", color: "from-red-500 to-red-700" },
  { id: "x", name: "X (Twitter)", icon: "🐦", color: "from-gray-800 to-black" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", color: "from-blue-600 to-blue-800" },
  { id: "google", name: "Google Business", icon: "🔍", color: "from-yellow-400 to-red-500" },
];

export default function Page() {
  const router = useRouter();
  const [connected, setConnected] = useState<string[]>([]);

  function connect(id: string) {
    // Real flow: redirect to /api/oauth/{id}
    // Demo: simulate success
    setConnected([...connected, id]);
  }

  return (
    <StepShell
      title="Connect your profiles"
      subtitle="Pick at least one. You can add more later."
      nextHref="/onboarding/step-4-scripts"
      backHref="/onboarding/step-2-organization"
      skipHref="/onboarding/step-4-scripts"
      nextLabel="Continue"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PLATFORMS.map((p) => {
          const isConnected = connected.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => !isConnected && connect(p.id)}
              className={`relative rounded-xl border p-4 text-left transition ${
                isConnected
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} grid place-items-center text-white text-lg`}>
                {p.icon}
              </div>
              <div className="mt-3 text-sm font-medium text-gray-900">{p.name}</div>
              <div className={`mt-1 text-xs ${isConnected ? "text-green-600 font-semibold" : "text-gray-500"}`}>
                {isConnected ? "✓ Connected" : "Click to connect"}
              </div>
            </button>
          );
        })}
      </div>
    </StepShell>
  );"use client";
import { useState } from "react";
import StepShell from "@/components/onboarding/StepShell";

const TEMPLATES: Record<string, { intent: string; response: string }[]> = {
  ecommerce: [
    { intent: "shipping", response: "We ship within 24 hours and typically deliver in 3–5 business days. Free over $75!" },
    { intent: "returns", response: "You can return any item within 30 days for a full refund — no questions asked." },
    { intent: "sizing", response: "Our sizes run true to fit. If unsure, size up — we offer free exchanges." },
    { intent: "discount", response: "Use code WELCOME10 for 10% off your first order 💛" },
  ],
  creator: [
    { intent: "collab", response: "Thanks for reaching out! Please email collabs@yourname.com with your media kit." },
    { intent: "product", response: "Link is in my bio! Use my code for a discount." },
    { intent: "fan_love", response: "You just made my day 🥹 Thank you!" },
  ],
  saas: [
    { intent: "pricing", response: "Plans start at $29/mo. Full pricing at yoursite.com/pricing" },
    { intent: "trial", response: "Yes! 14-day free trial, no credit card required." },
    { intent: "support", response: "Sorry you're stuck — email support@yoursite.com and we'll jump in within an hour." },
  ],
};

export default function Page() {
  const [template, setTemplate] = useState<keyof typeof TEMPLATES>("ecommerce");
  const [scripts, setScripts] = useState(TEMPLATES.ecommerce);

  function applyTemplate(t: keyof typeof TEMPLATES) {
    setTemplate(t);
    setScripts(TEMPLATES[t]);
  }

  return (
    <StepShell
      title="Teach your AI what to say"
      subtitle="Pick a starter template or write your own. Edit anytime."
      nextHref="/onboarding/step-5-escalation"
      backHref="/onboarding/step-3-connect"
      onNext={async () => {
        await fetch("/api/onboarding/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: 4, scripts }),
        });
      }}
    >
      <div className="flex flex-wrap gap-2">
        {Object.keys(TEMPLATES).map((t) => (
          <button
            key={t}
            onClick={() => applyTemplate(t as any)}
            className={`rounded-full px-4 py-1.5 text-sm capitalize border transition ${
              template === t
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3 mt-4">
        {scripts.map((s, i) => (
          <div key={i} className="rounded-xl border border-gray-200 p-3">
            <input
              value={s.intent}
              onChange={(e) => {
                const next = [...scripts];
                next[i].intent = e.target.value;
                setScripts(next);
              }}
              className="w-full text-xs font-semibold uppercase tracking-wider text-indigo-600 border-none outline-none"
            />
            <textarea
              value={s.response}
              onChange={(e) => {
                const next = [...scripts];
                next[i].response = e.target.value;
                setScripts(next);
              }}
              rows={2}
              className="mt-1 w-full text-sm border-none outline-none resize-none"
            />
          </div>
        ))}
        <button
          onClick={() => setScripts([...scripts, { intent: "new_intent", response: "" }])}
          className="text-sm text-indigo-600 font-semibold hover:underline"
        >
          + Add another script
        </button>
      </div>
    </StepShell>
  );
}
}"use client";
import { useState } from "react";
import StepShell from "@/components/onboarding/StepShell";

export default function Page() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState<"sms" | "email" | "both">("sms");

  return (
    <StepShell
      title="Where should we ping you?"
      subtitle="When the AI isn't sure, we'll send you a suggested reply here."
      nextHref="/onboarding/step-6-plan"
      backHref="/onboarding/step-4-scripts"
      skipHref="/onboarding/step-6-plan"
      onNext={async () => {
        await fetch("/api/onboarding/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: 5, escalationPhone: phone, escalationEmail: email, channel }),
        });
      }}
    >
      <div className="grid grid-cols-3 gap-2">
        {(["sms", "email", "both"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setChannel(c)}
            className={`rounded-xl border py-3 text-sm font-medium capitalize transition ${
              channel === c
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            {c === "sms" ? "📱 SMS" : c === "email" ? "✉️ Email" : "🔔 Both"}
          </button>
        ))}
      </div>

      {(channel === "sms" || channel === "both") && (
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Mobile number</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 123 4567"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
          />
        </label>
      )}

      {(channel === "email" || channel === "both") && (
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Escalation email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@brand.com"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
          />
        </label>
      )}

      <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4 text-sm text-indigo-800">
        💡 <strong>How escalation works:</strong> If confidence is below 70% or the comment is
        a complaint, we'll send you the message + a suggested reply. Meanwhile, the customer
        gets a warm holding message so they know you're on it.
      </div>
    </StepShell>
  );
}"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StepShell from "@/components/onboarding/StepShell";

const PLANS = [
  { id: "FREE", name: "Free", price: "$0", tagline: "Try it out", features: ["100 replies/mo", "1 profile", "Email escalation"] },
  { id: "STARTER", name: "Starter", price: "$29", tagline: "Solo founders", features: ["2,000 replies/mo", "3 profiles", "SMS + email"] },
  { id: "PRO", name: "Pro", price: "$99", tagline: "Growing brands", features: ["15,000 replies/mo", "10 profiles", "Priority SMS"], popular: true },
];

export default function Page() {
  const router = useRouter();
  const [selected, setSelected] = useState("FREE");
  const [loading, setLoading] = useState(false);

  async function finish() {
    setLoading(true);
    if (selected === "FREE") {
      await fetch("/api/onboarding/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 7, plan: "FREE" }),
      });
      router.push("/onboarding/step-7-done");
    } else {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selected }),
      });
      const { url } = await res.json();
      window.location.href = url;
    }
  }

  return (
    <StepShell
      title="Choose your plan"
      subtitle="Start free — upgrade anytime."
      nextHref="/onboarding/step-7-done"
      backHref="/onboarding/step-5-escalation"
      onNext={finish}
      nextLabel={selected === "FREE" ? "Start free" : "Continue to payment"}
    >
      <div className="grid sm:grid-cols-3 gap-3">
        {PLANS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`relative rounded-2xl border p-5 text-left transition ${
              selected === p.id
                ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-2 right-3 text-[10px] font-bold uppercase bg-indigo-600 text-white rounded-full px-2 py-0.5">
                Popular
              </span>
            )}
            <div className="text-sm font-semibold text-gray-900">{p.name}</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">
              {p.price}<span className="text-sm font-normal text-gray-500">/mo</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">{p.tagline}</div>
            <ul className="mt-4 space-y-1 text-xs text-gray-600">
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrialBanner() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/me/access")
      .then((r) => r.json())
      .then((d) => setDays(d.trialDaysLeft ?? null));
  }, []);

  if (days === null || days === 0) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
        <span>
          🎉 <strong>{days} day{days !== 1 && "s"} left</strong> in your free trial — full Pro access unlocked.
        </span>
        <Link
          href="/billing"
          className="rounded-lg bg-white/20 hover:bg-white/30 px-3 py-1 text-xs font-semibold transition"
        >
          Upgrade now →
        </Link>
      </div>
    </div>
  );
}
import Link from "next/link";

const plans = [
  {
    name: "Free Trial",
    price: "$0",
    cadence: "for 14 days",
    tagline: "Full Pro access. No card required.",
    features: [
      "All Pro features unlocked",
      "Unlimited test replies",
      "Connect 1 profile",
      "No credit card needed",
      "Cancel anytime — auto-expires",
    ],
    cta: "Start 14-day trial",
    highlight: false,
    badge: "Start here",
  },
  {
    name: "Starter",
    price: "$19.95",
    cadence: "/month",
    tagline: "AI prompt response & comment management",
    features: [
      "AI replies with your scripts",
      "Comments, questions & complaints",
      "Smart escalation (SMS + email)",
      "Holding messages while awaiting reply",
      "3 profiles · 2,000 replies/mo",
      "Basic analytics",
    ],
    cta: "Choose Starter",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49.95",
    cadence: "/month",
    tagline: "Deeper analysis + sales conversations",
    features: [
      "Everything in Starter, plus:",
      "Deep sentiment & intent analysis",
      "Extended AI conversation after comment",
      "Product promotion & objection handling",
      "Follow-ups until purchase",
      "Conversion tracking (comment → sale)",
      "10 profiles · 15,000 replies/mo",
      "Priority SMS escalation",
    ],
    cta: "Choose Pro",
    highlight: true,
    badge: "Most popular",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-green-100 text-green-700 text-xs font-semibold px-3 py-1">
            🎉 2 weeks free — no credit card
          </span>
          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Start free. Upgrade when it pays for itself.
          </h2>
          <p className="mt-4 text-gray-600">
            Try every Pro feature for 14 days. If Utens doesn't earn its keep, walk away —
            no charge, no card, no awkward phone call.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-6 flex flex-col border transition ${
                p.highlight
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-2xl lg:scale-105"
                  : "bg-white border-gray-200"
              }`}
            >
              {p.badge && (
                <span
                  className={`self-start text-[10px] font-bold uppercase rounded-full px-2 py-1 mb-3 ${
                    p.highlight ? "bg-white/20 text-white" : "bg-indigo-50 text-indigo-700"
                  }`}
                >
                  {p.badge}
                </span>
              )}
              <h3 className={`text-lg font-semibold ${p.highlight ? "text-white" : "text-gray-900"}`}>
                {p.name}
              </h3>
              <p className={`text-sm mt-1 ${p.highlight ? "text-indigo-100" : "text-gray-500"}`}>
                {p.tagline}
              </p>
              <div className="mt-5 flex items-end gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className={p.highlight ? "text-indigo-200" : "text-gray-500"}>
                  {p.cadence}
                </span>
              </div>
              <ul className={`mt-6 space-y-2 text-sm ${p.highlight ? "text-indigo-50" : "text-gray-600"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`mt-8 rounded-xl px-4 py-2.5 text-center font-semibold text-sm transition ${
                  p.highlight
                    ? "bg-white text-indigo-700 hover:bg-indigo-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison callout */}
        <div className="mt-12 rounded-2xl bg-white border border-gray-200 p-6 md:p-8">
          <h3 className="font-semibold text-gray-900 text-lg">What's the difference?</h3>
          <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm">
            <div className="rounded-xl bg-gray-50 p-5">
              <div className="font-semibold text-indigo-700">Starter — $19.95</div>
              <p className="mt-2 text-gray-600">
                AI answers the comment, question or complaint with your scripted reply,
                and escalates to you when it's unsure. Perfect for managing high-volume
                social chatter.
              </p>
            </div>
            <div className="rounded-xl bg-indigo-50 p-5">
              <div className="font-semibold text-indigo-700">Pro — $49.95</div>
              <p className="mt-2 text-gray-600">
                Everything in Starter <strong>plus</strong> a sales conversation.
                After the first reply, the AI keeps chatting — answering follow-ups,
                promoting the right product, overcoming objections, and sending a
                checkout link. Follows up until they buy.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Cancel anytime · 30-day money-back guarantee · Prices in USD
        </p>
      </div>
    </section>
  );
}import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getOrgAccess } from "@/lib/trial";
import UpgradeButton from "./upgrade-button";

export default async function BillingPage() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session!.user.id },
    include: { org: true },
  });
  const access = await getOrgAccess(user.orgId!);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-900">Billing</h1>

      <div className="mt-6 rounded-2xl border border-gray-200 p-6 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Current plan</div>
            <div className="text-xl font-bold text-gray-900 mt-1">{access.plan}</div>
            {access.trialDaysLeft > 0 && (
              <div className="text-sm text-indigo-600 mt-1">
                🎉 {access.trialDaysLeft} days left in free trial
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {access.plan !== "PRO" && <UpgradeButton plan="PRO" label="Upgrade to Pro — $49.95" />}
            {access.plan === "TRIAL" && <UpgradeButton plan="STARTER" label="Choose Starter — $19.95" />}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 p-6 bg-white">
        <div className="text-sm text-gray-500">Usage this cycle</div>
        <div className="mt-3 grid sm:grid-cols-3 gap-4">
          <Stat label="AI replies" value={`${0} / ${access.limits.replies}`} />
          <Stat label="Profiles" value={`${user.org!.name ? 0 : 0} / ${access.limits.profiles}`} />
          <Stat label="Deep conversations" value={access.limits.deepMode ? "Enabled" : "Locked"} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-semibold text-gray-900 mt-1">{value}</div>
    </div>
  );
}"use client";
export default function UpgradeButton({ plan, label }: { plan: string; label: string }) {
  async function go() {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const { url } = await res.json();
    window.location.href = url;
  }
  return (
    <button
      onClick={go}
      className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 transition"
    >
      {label}
    </button>
  );
}
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getOrgAccess } from "@/lib/trial";
import ProductRow from "./product-row";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session!.user.id },
    include: { org: true },
  });

  if (!user.orgId) {
    return <Empty title="Set up your brand first" cta={{ href: "/onboarding/step-2-organization", label: "Complete setup" }} />;
  }

  const access = await getOrgAccess(user.orgId);
  const products = await prisma.product.findMany({
    where: { orgId: user.orgId },
    orderBy: { createdAt: "desc" },
  });

  const locked = !access.limits.deepMode;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">
            The AI promotes these products during extended Pro conversations.
          </p>
        </div>
        {!locked && (
          <Link
            href="/products/new"
            className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 transition"
          >
            + Add product
          </Link>
        )}
      </div>

      {locked && (
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white p-6">
          <h2 className="font-semibold text-lg">🔒 Pro feature</h2>
          <p className="text-sm text-indigo-50 mt-1">
            Upgrade to Pro ($49.95/mo) to unlock the product catalog and let AI guide customers to checkout.
          </p>
          <Link
            href="/billing"
            className="inline-block mt-4 rounded-lg bg-white text-indigo-700 font-semibold text-sm px-4 py-2 hover:bg-indigo-50 transition"
          >
            Upgrade to Pro →
          </Link>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl">📦</div>
            <h3 className="mt-3 font-semibold text-gray-900">No products yet</h3>
            <p className="text-sm text-gray-500 mt-1">
              Add your first product so the AI knows what to recommend.
            </p>
            <Link
              href="/products/new"
              className="inline-block mt-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5"
            >
              Add your first product
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Product</th>
                <th className="text-left px-5 py-3 font-medium">Price</th>
                <th className="text-left px-5 py-3 font-medium">Keywords</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <ProductRow
                  key={p.id}
                  product={{
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: Number(p.price),
                    url: p.url,
                    imageUrl: p.imageUrl,
                    keywords: p.keywords,
                  }}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Empty({ title, cta }: { title: string; cta: { href: string; label: string } }) {
  return (
    <div className="max-w-6xl mx-auto p-8 text-center">
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      <Link
        href={cta.href}
        className="inline-block mt-4 rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm font-semibold"
      >
        {cta.label}
      </Link>
    </div>
  );
}"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type P = {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string | null;
  imageUrl: string | null;
  keywords: string[];
};

export default function ProductRow({ product }: { product: P }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function del() {
    if (!confirm(`Delete "${product.name}"?`)) return;
    setDeleting(true);
    await fetch(`/api/products/${product.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden grid place-items-center">
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400">📦</span>
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900">{product.name}</div>
            <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">{product.description}</div>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 text-sm text-gray-900 font-medium">${product.price.toFixed(2)}</td>
      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-1 max-w-xs">
          {product.keywords.slice(0, 3).map((k) => (
            <span key={k} className="rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-medium px-2 py-0.5">
              {k}
            </span>
          ))}
          {product.keywords.length > 3 && (
            <span className="text-[10px] text-gray-500">+{product.keywords.length - 3}</span>
          )}
        </div>
      </td>
      <td className="px-5 py-4 text-right">
        <div className="inline-flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Edit
          </Link>
          <button
            onClick={del}
            disabled={deleting}
            className="text-sm text-red-500 hover:text-red-600 font-medium disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  );
}"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initial?: {
    id?: string;
    name: string;
    description: string;
    price: number;
    url: string | null;
    imageUrl: string | null;
    keywords: string[];
  };
};

export default function ProductForm({ initial }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    url: initial?.url ?? "",
    imageUrl: initial?.imageUrl ?? "",
    keywords: initial?.keywords.join(", ") ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      url: form.url || null,
      imageUrl: form.imageUrl || null,
      keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
    };

    const res = await fetch(
      initial?.id ? `/api/products/${initial.id}` : "/api/products",
      {
        method: initial?.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setLoading(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setErr(d.error ?? "Something went wrong");
      return;
    }
    router.push("/products");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <Field label="Product name" required>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Glow Serum 30ml"
          className="input"
        />
      </Field>

      <Field label="Description" hint="AI uses this to pitch the product." required>
        <textarea
          required
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Vitamin C serum that brightens skin in 2 weeks. Dermatologist-tested, vegan."
          className="input resize-none"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Price (USD)" required>
          <input
            required
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="input"
          />
        </Field>
        <Field label="Checkout URL" hint="Where AI sends buyers.">
          <input
            type="url"
            value={form.url ?? ""}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://yourshop.com/glow-serum"
            className="input"
          />
        </Field>
      </div>

      <Field label="Image URL" hint="Shown in the dashboard only.">
        <input
          type="url"
          value={form.imageUrl ?? ""}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          placeholder="https://cdn.yourshop.com/glow.jpg"
          className="input"
        />
      </Field>

      <Field label="Keywords" hint="Comma-separated — helps AI match comments to this product.">
        <input
          value={form.keywords}
          onChange={(e) => setForm({ ...form, keywords: e.target.value })}
          placeholder="serum, vitamin c, brightening, skin"
          className="input"
        />
      </Field>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold px-5 py-2.5 transition"
        >
          {loading ? "Saving…" : initial?.id ? "Save changes" : "Add product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        :global(.input:focus) {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99,102,241,0.12);
        }
      `}</style>
    </form>
  );
}

function Field({
  label, hint, required, children,
}: {
  label: string; hint?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      <div className="mt-1">{children}</div>
    </label>
  );
}import ProductForm from "../product-form";

export default function NewProduct() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-900">Add product</h1>
      <p className="text-sm text-gray-500 mt-1">
        The AI will recommend this product during extended conversations.
      </p>
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <ProductForm />
      </div>
    </div>
  );
}import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ProductForm from "../product-form";

export default async function EditProduct({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session!.user.id },
  });

  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product || product.orgId !== user.orgId) notFound();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-900">Edit product</h1>
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <ProductForm
          initial={{
            id: product.id,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            url: product.url,
            imageUrl: product.imageUrl,
            keywords: product.keywords,
          }}
        />
      </div>
    </div>
  );
}
