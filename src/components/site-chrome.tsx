import Link from "next/link";
import { Moon, ShieldCheck, BookOpen } from "lucide-react";

/** Compact dark header used on sub-pages (success, dashboard). */
export function CompactHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0e1422]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0e1422]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c9a24a]/40 text-[#c9a24a]">
            <Moon className="h-4 w-4" />
          </span>
          <span className="font-serif font-semibold tracking-tight text-lg">
            Better Within
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-white/70 transition-colors hover:text-white"
        >
          Back to site
        </Link>
      </div>
    </header>
  );
}

/** Shared site footer (matches the landing footer). */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#e0d6c0] bg-[#f2ece0]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 text-[#1a1410]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b8893f]/40 text-[#b8893f]">
                <Moon className="h-4 w-4" />
              </span>
              <span className="font-serif font-semibold tracking-tight text-lg text-[#1a1410]">
                Better Within
              </span>
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
