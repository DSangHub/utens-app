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
