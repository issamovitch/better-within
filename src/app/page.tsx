"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Moon,
  Brain,
  Eye,
  Clock,
  Repeat,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Mail,
  Lock,
  Quote,
  Sparkles,
  Send,
  AlertCircle,
  Users,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const PAINS = [
  {
    icon: Repeat,
    title: "The sentence on loop",
    body: "One slightly awkward line from a meeting plays on repeat — for hours, then days.",
  },
  {
    icon: Mail,
    title: "Re-read ten times",
    body: "You draft and re-read messages hunting for the phrase that 'ruined everything.'",
  },
  {
    icon: Users,
    title: "Silence feels safer",
    body: "You stop speaking up — not because you have nothing to say, but to dodge the replay.",
  },
  {
    icon: Moon,
    title: "Wide awake at 2 a.m.",
    body: "The meeting ended at 3 p.m. Your brain didn't get the memo. Frame by frame, again.",
  },
];

const CHAPTERS = [
  { n: "Letter", title: "A Letter From Someone Who's Been There" },
  { n: "1", title: "What Your Brain Is Actually Doing at 2 A.M." },
  { n: "2", title: "Why 'Just Stop Thinking About It' Always Fails" },
  { n: "3", title: "Nobody Noticed: The Spotlight Effect" },
  { n: "4", title: "Tool 1 — The Scheduled Review" },
  { n: "5", title: "Tool 2 — Watching the Replay From the Balcony" },
  { n: "6", title: "Tool 3 — Unhooking From the Thought" },
  { n: "7", title: "The Night Protocol: Ending the 2 A.M. Replays" },
  { n: "8", title: "The 14-Day Plan" },
  { n: "—", title: "What Peace Actually Feels Like" },
  { n: "—", title: "Your Worksheet" },
  { n: "—", title: "References" },
];

const TOOLS = [
  {
    icon: Clock,
    tag: "Tool 1",
    title: "The Scheduled Review",
    pitch: "Give the replay an appointment.",
    body: "Stop fighting the worry — reschedule it. A fixed 15-minute daily window turns ambushes into entries on a list. Capture, don't chew. By review time, most of them already feel trivial.",
    science: "Borkovec — worry postponement",
  },
  {
    icon: Eye,
    tag: "Tool 2",
    title: "The Balcony View",
    pitch: "Watch the replay from the back of the room.",
    body: "Switch from 'I' to your own name. Move the camera to the wide shot. Ask the friend question. Same event, different angle — radically different pain. The 4-second rule beats the felt minute.",
    science: "Kross — self-distancing",
  },
  {
    icon: Brain,
    tag: "Tool 3",
    title: "Unhooking From the Thought",
    pitch: "The thought still visits. It no longer runs the house.",
    body: "A thought feels like news. Wrap it: 'I notice I'm having the thought that…' Name the station: Radio 2 A.M. Thank the smoke detector. You're not arguing — you're acknowledging and declining.",
    science: "Hayes — ACT cognitive defusion",
  },
];

const PLAN = [
  {
    days: "Days 1–3",
    title: "Observe & capture",
    detail: "Set your 15-minute review window. Capture every replay in one line. Redirect with 'booked for 6 p.m.' See with your own eyes how many are reruns.",
    time: "~20 min / day",
  },
  {
    days: "Days 4–7",
    title: "Add the balcony",
    detail: "For the single hottest replay each day, run the balcony view: own-name self-talk, wide camera shot, friend question. Depth beats volume.",
    time: "~25 min / day",
  },
  {
    days: "Days 8–10",
    title: "Add defusion",
    detail: "Now at the moment a replay strikes — not waiting for the window — apply the labeling frame, name the radio station, thank the smoke detector.",
    time: "~25 min / day",
  },
  {
    days: "Days 11–14",
    title: "Add the night protocol",
    detail: "Pre-bed download, handover sentence, 15-minute rule, counting task. In one meeting, deliberately speak up — then run the balcony, not the anxious, review.",
    time: "~30 min / day",
  },
];

const RESEARCH = [
  "Nolen-Hoeksema — rumination",
  "Clark & Wells — post-event processing",
  "Wegner — white bear / ironic process",
  "Gilovich — the spotlight effect",
  "Kross — self-distancing",
  "Hayes — ACT & defusion",
  "Neff — self-compassion",
  "Borkovec — worry postponement",
  "Bootzin — stimulus control",
  "Scullin — bedtime writing",
  "Wells — attention training",
  "Zeigarnik — unfinished tasks",
];

const FAQS = [
  {
    q: "Is this therapy?",
    a: "No. The book is for education only. It is not therapy, medical advice, or a diagnosis, and it is not a substitute for professional support. If distress is severe, persistent, or interfering with daily life, please talk to a qualified professional — that is a strong move, not a weak one.",
  },
  {
    q: "How long does it take to read?",
    a: "Under an hour. It's 24 pages, short on purpose — read it cover to cover in one sitting. Then start the 14-day plan the very next morning. Reading informs; the 14 days transform.",
  },
  {
    q: "I've tried 'just stop thinking about it.' It never works. Why would this?",
    a: "That's exactly what Chapter 2 is about. Thought suppression backfires — Wegner's white-bear experiments showed the suppressed thought rebounds, often stronger. These tools don't fight the thought; they change your relationship to it: when you review, from what distance, and how seriously you take the dramatization.",
  },
  {
    q: "Will the replays ever fully stop?",
    a: "Maybe not to absolute zero — and that's fine. The goal is shorter visits and a weaker voice. In the author's recovery, ninety-minute occupations became ninety-second visits. A resident becomes a passerby. That is what winning actually looks like.",
  },
  {
    q: "Who is it for?",
    a: "Anyone who replays work conversations — meetings, calls, emails, hallway moments — and pays for them in sleep, confidence, or visibility. It's especially for people who've gone quiet in rooms where they used to have a voice.",
  },
  {
    q: "Is my email safe?",
    a: "You'll get one email with the PDF. No spam, no daily newsletters, no selling your address. If you ever want off the list, one click and you're gone.",
  },
];

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif font-semibold tracking-tight ${className}`}>
      Better Within
    </span>
  );
}

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------------------------------------------------------------------ */
/*  Lead form                                                          */
/* ------------------------------------------------------------------ */

function LeadForm({
  onSuccess,
  tone = "dark",
}: {
  onSuccess: () => void;
  tone?: "dark" | "light";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      if (typeof window !== "undefined" && (window as any).fbq) {
        try {
          const normalized = email.trim().toLowerCase();
          const buf = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(normalized)
          );
          const hash = Array.from(new Uint8Array(buf))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
          (window as any).fbq("init", "1779611606725498", { em: hash });
        } catch {
          // hashing failed — still fire the event without em
        }
        (window as any).fbq("track", "Lead");
      }
      onSuccess();
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputTone =
    tone === "dark"
      ? "border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-[#c9a24a]/50 focus-visible:border-[#c9a24a]/60"
      : "border-[#e0d6c0] bg-white text-[#1a1410] placeholder:text-[#8a7d68] focus-visible:ring-[#b8893f]/40 focus-visible:border-[#b8893f]/60";

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <Label htmlFor={`email-${tone}`} className="sr-only">
            Email address
          </Label>
          <Input
            id={`email-${tone}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@work.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`h-12 text-base ${inputTone}`}
            aria-invalid={status === "error"}
            disabled={status === "loading"}
          />
        </div>
        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-12 bg-[#c9a24a] text-[#1a1410] font-semibold shadow-lg shadow-[#c9a24a]/20 hover:bg-[#d8b25e] hover:text-[#1a1410] disabled:opacity-60"
        >
          {status === "loading" ? (
            "Sending…"
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send me the PDF
            </>
          )}
        </Button>
      </div>

      <div
        className={`mt-3 flex min-h-5 items-center gap-2 text-sm ${
          tone === "dark" ? "text-white/60" : "text-[#7a6f5c]"
        }`}
      >
        {status === "error" ? (
          <span className="flex items-center gap-1.5 text-red-400">
            <AlertCircle className="h-4 w-4" />
            {errorMsg}
          </span>
        ) : (
          <span className="flex items-center gap-1.5 mx-auto w-fit">
            <Lock className="h-3.5 w-3.5" />
            Free PDF + audio version · 24 pages · One email, no spam.
          </span>
        )}
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Header & Footer                                                    */
/* ------------------------------------------------------------------ */

function Header({ compact = false }: { compact?: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0e1422]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0e1422]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => scrollToId("top")}
          className="flex items-center gap-2 text-white"
          aria-label="Better Within — back to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c9a24a]/40 text-[#c9a24a]">
            <Moon className="h-4 w-4" />
          </span>
          <Wordmark className="text-white text-lg" />
        </button>

        {!compact && (
          <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
            <button onClick={() => scrollToId("problem")} className="transition-colors hover:text-white">
              The loop
            </button>
            <button onClick={() => scrollToId("inside")} className="transition-colors hover:text-white">
              Inside
            </button>
            <button onClick={() => scrollToId("tools")} className="transition-colors hover:text-white">
              The tools
            </button>
            <button onClick={() => scrollToId("plan")} className="transition-colors hover:text-white">
              14-day plan
            </button>
            <button onClick={() => scrollToId("faq")} className="transition-colors hover:text-white">
              FAQ
            </button>
          </nav>
        )}

        {!compact && (
          <Button
            onClick={() => scrollToId("get")}
            className="bg-[#c9a24a] text-[#1a1410] font-semibold hover:bg-[#d8b25e] hover:text-[#1a1410]"
          >
            Get the book
          </Button>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e0d6c0] bg-[#f2ece0]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 text-[#1a1410]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b8893f]/40 text-[#b8893f]">
                <Moon className="h-4 w-4" />
              </span>
              <Wordmark className="text-[#1a1410] text-lg" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#6b6253]">
              Evidence-based field guides for the loops your mind runs after
              hours. Built on published research you can verify — never on
              motivational quotes.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-[#6b6253] md:items-end md:text-right">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#b8893f]" />
              Educational only — not therapy or medical advice
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-[#b8893f]" />
              Every claim is referenced in the back of the book
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[#e0d6c0] pt-6 text-xs text-[#8a7d68] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Better Within. All rights reserved.</p>
          <p>
            If distress is severe or persistent, please talk to a qualified
            professional.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Landing view                                                       */
/* ------------------------------------------------------------------ */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b8893f]">
      {children}
    </span>
  );
}

function LandingView({ onSuccess }: { onSuccess: () => void }) {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section id="top" className="relative overflow-hidden bg-[#0e1422] text-white">
        {/* ambient glows */}
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#c9a24a]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#3a5a8c]/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 pt-8 sm:px-6 md:grid-cols-2 md:gap-12 md:py-24">
          {/* copy */}
          <div
            className="text-center md:text-left"
          >
            <SectionEyebrow>A free · science-based field guide</SectionEyebrow>

            <h1 className="mt-5 font-serif text-4xl font-bold tracking-tight sm:text-5xl sm:leading-tight md:text-6xl leading-12 md:leading-17">
              Stop Replaying Every Work Conversation
            </h1>

            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/70 md:mx-0">
              Learn how I stopped the social anxiety, rumination, and intrusive
              thoughts that replayed every work conversation I had, before the
              overthinking cost me my peace and my career.
            </p>

            <div className="mx-auto mt-8 max-w-md md:mx-0">
              <LeadForm onSuccess={onSuccess} tone="dark" />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/55 md:justify-start">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#c9a24a]" />
                Under an hour to read
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#c9a24a]" />
                References to every study
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#c9a24a]" />
                A 14-day plan that actually moves the needle
              </span>
            </div>
          </div>

          {/* book cover */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 -z-10 translate-y-6 scale-95 rounded-2xl bg-[#c9a24a]/15 blur-2xl" />
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/50 ring-1 ring-white/5">
              <Image
                  src="/book-cover.png"
                  alt="Cover of the book 'Why Did I Say That?'"
                  width={600}
                  height={800}
                  priority
                  loading="eager"
                  sizes="(max-width: 640px) 100vw, 384px"
                  className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROBLEM ---------- */}
      <section id="problem" className="bg-[#f7f2e9] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Does this sound familiar?</SectionEyebrow>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#1a1410] sm:text-4xl">
              The meeting ended at 3 p.m.
              <br />
              <span className="text-[#b8893f]">Your brain didn't get the memo.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5a5246]">
              At 4 p.m. you're replaying the interruption. At 7 p.m. you're
              analyzing a colleague's face. At 2 a.m. you're running the whole
              meeting again, frame by frame, hunting for the exact second you
              ruined your reputation.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PAINS.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              >
                <Card className="h-full border-[#e7dfd0] bg-white shadow-sm">
                  <CardContent className="p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7f2e9] text-[#b8893f]">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4  text-lg font-semibold text-[#1a1410]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6b6253]">
                      {p.body}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp}>
            <div className="mt-12 rounded-2xl border border-[#e7dfd0] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0e1422] text-[#c9a24a]">
                  <Brain className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg leading-relaxed text-[#1a1410]">
                    It has a name. Psychologists call it{" "}
                    <span className="font-semibold text-[#b8893f]">
                      post-event processing
                    </span>{" "}
                    — the review-and-replay loop that follows social situations.
                    It's a core feature of social anxiety, and it's been studied
                    for decades.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-[#6b6253]">
                    That matters for one reason: if it has a name, it has
                    research. And if it has research, it has methods that have
                    been tested on real people — not motivational quotes.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- WHAT'S INSIDE ---------- */}
      <section id="inside" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-2xl">
            <SectionEyebrow>What's inside</SectionEyebrow>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#1a1410] sm:text-4xl">
              A short field guide, cover to cover in under an hour.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#5a5246]">
              Eight chapters, three tools, one 14-day plan, a printable worksheet,
              and a reference list so every claim can be checked.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#e7dfd0] bg-[#e7dfd0] sm:grid-cols-2 lg:grid-cols-3">
            {CHAPTERS.map((c, i) => (
              <motion.div
                key={c.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
                className="flex items-start gap-4 bg-[#faf7f0] p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e0d6c0] bg-white font-serif text-sm font-bold text-[#b8893f]">
                  {c.n}
                </span>
                <p className="pt-1 text-sm font-medium leading-snug text-[#3a3328]">
                  {c.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- THREE TOOLS ---------- */}
      <section id="tools" className="bg-[#f7f2e9] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>The three tools</SectionEyebrow>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#1a1410] sm:text-4xl">
              Three tools that break the loop.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#5a5246]">
              Control the container, not the thought. Each tool comes from
              clinical psychology research — and each is something you can do
              tonight.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {TOOLS.map((t, i) => (
              <motion.div
                key={t.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              >
                <Card className="flex h-full flex-col border-[#e7dfd0] bg-white shadow-sm">
                  <CardContent className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0e1422] text-[#c9a24a]">
                        <t.icon className="h-5 w-5" />
                      </span>
                      <Badge
                        variant="outline"
                        className="border-[#e0d6c0] bg-[#faf7f0] text-[#b8893f]"
                      >
                        {t.tag}
                      </Badge>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[#1a1410]">
                      {t.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium italic text-[#b8893f]">
                      {t.pitch}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#6b6253]">
                      {t.body}
                    </p>
                    <p className="mt-5 border-t border-[#f0e8d6] pt-4 text-xs font-semibold uppercase tracking-wide text-[#9a8f78]">
                      <Sparkles className="mr-1 inline h-3.5 w-3.5 text-[#b8893f]" />
                      {t.science}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 14-DAY PLAN ---------- */}
      <section id="plan" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-2xl">
            <SectionEyebrow>The 14-day plan</SectionEyebrow>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#1a1410] sm:text-4xl">
              Knowledge doesn't break the loop.
              <br />
              <span className="text-[#b8893f]">Repetitions do.</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#5a5246]">
              One small addition at a time. Total daily cost: under 30 minutes.
              Missing a day is data, not failure — resume the next day at the
              same stage.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {PLAN.map((p, i) => (
              <motion.div
                key={p.days}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 2) * 0.08 }}
              >
                <Card className="h-full border-[#e7dfd0] bg-[#faf7f0] shadow-sm">
                  <CardContent className="p-7">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-2xl font-bold text-[#b8893f]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-semibold uppercase tracking-wide text-[#9a8f78]">
                          {p.days}
                        </span>
                      </div>
                      <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-[#6b6253] ring-1 ring-[#e0d6c0]">
                        <Clock className="h-3.5 w-3.5 text-[#b8893f]" />
                        {p.time}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-semibold text-[#1a1410]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6b6253]">
                      {p.detail}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- RESEARCH BAND ---------- */}
      <section className="bg-[#0e1422] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Grounded in published research</SectionEyebrow>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
              Not motivational quotes. Tested methods.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              Every claim in the book traces back to a research program you can
              look up tonight. The plain-language summary below names who did the
              work — the reference list in the book gives you the rest.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
          >
            {RESEARCH.map((r) => (
              <span
                key={r}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75"
              >
                {r}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- OUTCOME QUOTE ---------- */}
      <section className="bg-[#f7f2e9] py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div {...fadeUp}>
            <Quote className="h-10 w-10 text-[#c9a24a]" />
            <blockquote className="mt-5 font-serif text-2xl font-medium leading-snug text-[#1a1410] sm:text-3xl">
              "I left a meeting, got coffee, and realized an hour later that I
              hadn't reviewed the meeting once. The tape simply hadn't started."
            </blockquote>
            <p className="mt-6 text-sm uppercase tracking-wide text-[#9a8f78]">
              What peace actually feels like — Chapter 9
            </p>
            <p className="mt-2 text-base leading-relaxed text-[#5a5246]">
              The replays may never reach absolute zero — and that's fine. The
              skills you'll hold turn a resident into a passerby. And the career
              effects are real: when the tax on speaking collapses, your ideas
              come back into the room — and so do opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section id="get" className="bg-white py-20 sm:py-24">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-3xl px-4 sm:px-6"
        >
          <div className="overflow-hidden rounded-3xl border border-[#e7dfd0] bg-[#0e1422] p-8 text-white shadow-xl sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a24a]/10 blur-3xl" />
            <div className="relative">
              <SectionEyebrow>Get the free PDF</SectionEyebrow>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                Run the fourteen days.
                <br />
                <span className="text-[#e8c878]">Then enjoy the silence.</span>
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
                Drop your email and we'll send the 24-page field guide straight to
                your inbox. Read it tonight. Start the plan tomorrow.
              </p>
              <div className="mt-8 max-w-lg">
                <LeadForm onSuccess={onSuccess} tone="dark" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="bg-[#f7f2e9] py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center">
            <SectionEyebrow>Questions</SectionEyebrow>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#1a1410] sm:text-4xl">
              Before you download
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="border-b border-[#e0d6c0]"
                >
                  <AccordionTrigger className="py-5 text-left font-serif text-lg font-medium text-[#1a1410] hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[15px] leading-relaxed text-[#6b6253]">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f2e9]">
      <Header />
      <main className="flex-1">
        <LandingView onSuccess={() => router.push("/success")} />
      </main>
      <Footer />
    </div>
  );
}

