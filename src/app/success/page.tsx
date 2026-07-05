import type { Metadata } from "next";
import {
  CheckCircle2,
  BellRing,
  Download,
  BookOpen,
  Calendar,
  NotebookPen,
  Headphones,
  Moon,
} from "lucide-react";
import { CompactHeader, SiteFooter } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Your field guide is ready — Why Did I Say That?",
  description:
    "Your free PDF and audio edition of Why Did I Say That? are on the way to your inbox.",
  robots: { index: false, follow: false },
};

const NEXT_STEPS = [
  {
    icon: BookOpen,
    title: "Read it tonight",
    body: "Cover to cover, under an hour. It's short on purpose — that's the design, not a limitation.",
  },
  {
    icon: Calendar,
    title: "Start the plan tomorrow morning",
    body: "The 14-day plan in Chapter 8 is where change happens. Reading informs; the repetitions transform.",
  },
  {
    icon: NotebookPen,
    title: "Print the worksheet",
    body: "Page 23 — one copy per day for 14 days. The daily loop-breaker is what turns the skills into a habit.",
  },
];

export default function SuccessPage() {
  // Read the deliverable URLs from env (same source as the email), with a
  // local fallback for the PDF so dev still works without .env.
  const pdfUrl = process.env.PDF_URL?.trim() || "/why-did-i-say-that.pdf";
  const audioUrl = process.env.AUDIO_URL?.trim() || "";
  const pdfExternal = pdfUrl.startsWith("http");

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f2e9]">
      <CompactHeader />
      <main className="flex-1 overflow-x-clip">
        <section className="relative overflow-hidden bg-[#f7f2e9]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#c9a24a]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#3a5a8c]/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0e1422] text-[#c9a24a] shadow-lg">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#b8893f]">
                <BellRing className="h-3.5 w-3.5" />
                You're in
              </span>
              <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[#1a1410] sm:text-5xl">
                The field guide is yours.
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-[#5a5246]">
                We've sent{" "}
                <span className="font-semibold">Why Did I Say That?</span> to
                your inbox — both the PDF and the audio edition. You can also
                open them right now.
              </p>

              <div className="mt-8 flex w-full max-w-xs flex-col items-center gap-3">
                <a
                  href={pdfUrl}
                  target={pdfExternal ? "_blank" : undefined}
                  rel={pdfExternal ? "noopener noreferrer" : undefined}
                  download={!pdfExternal}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#c9a24a] px-6 text-base font-semibold text-[#1a1410] shadow-lg shadow-[#c9a24a]/20 transition-colors hover:bg-[#d8b25e]"
                >
                  <Download className="h-5 w-5" />
                  {pdfExternal ? "Open the PDF" : "Download the PDF"}
                </a>
                {audioUrl && (
                  <a
                    href={audioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-[#b8893f]/40 bg-white px-6 text-base font-semibold text-[#1a1410] transition-colors hover:bg-[#f7f2e9]"
                  >
                    <Headphones className="h-5 w-5 text-[#b8893f]" />
                    Listen to the audio
                  </a>
                )}
              </div>
              <p className="mt-3 text-xs text-[#8a7d68]">
                24 pages · For education only
              </p>
            </div>

            <div className="mt-14 rounded-2xl border border-[#e7dfd0] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-[#1a1410]">
                What to do next
              </h2>
              <ol className="mt-6 space-y-5">
                {NEXT_STEPS.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7f2e9] text-[#b8893f]">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-medium text-[#1a1410]">
                        <span className="mr-2 font-serif text-[#b8893f]">
                          {i + 1}.
                        </span>
                        {s.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#6b6253]">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 rounded-2xl border border-[#e7dfd0] bg-[#0e1422] p-6 text-white shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#c9a24a]">
                  <Moon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a24a]">
                    Try this tonight · 60 seconds
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-white/85">
                    Next time a replay starts, don't fight it. Just label it,
                    silently and precisely:{" "}
                    <span className="italic text-white">
                      "This is post-event processing. This is the smoke
                      detector, not a fire."
                    </span>{" "}
                    Naming the process creates a small gap between you and the
                    thought — and that gap is where every tool in the book
                    lives.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-xs leading-relaxed text-[#8a7d68]">
              This book is for education only. It is not therapy, medical
              advice, or a diagnosis. If distress is severe or persistent,
              please talk to a qualified professional.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}