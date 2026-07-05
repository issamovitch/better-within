"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Copy,
  FileDown,
  Inbox,
  RefreshCw,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { CompactHeader, SiteFooter } from "@/components/site-chrome";

type Lead = {
  id: string;
  email: string;
  source: string;
  createdAt: string;
};

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

function fmtFull(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function DashboardClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to load");
      setLeads(data.leads ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Refresh on window focus so new opt-ins show without a manual click.
  useEffect(() => {
    function onFocus() {
      load();
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) => l.email.toLowerCase().includes(q));
  }, [leads, query]);

  const csv = useMemo(() => {
    const header = "email,source,createdAt\n";
    const rows = filtered
      .map((l) => `${l.email},${l.source},${l.createdAt}`)
      .join("\n");
    return header + rows;
  }, [filtered]);

  async function copyAll() {
    const text = filtered.map((l) => l.email).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  function exportCsv() {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f2e9]">
      <CompactHeader />
      <main className="flex-1">
        <section className="bg-[#f7f2e9]">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            {/* top bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0e1422] text-[#c9a24a]">
                  <Inbox className="h-5 w-5" />
                </span>
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#1a1410]">
                    Loop-breakers inbox
                  </h1>
                  <p className="text-sm text-[#6b6253]">
                    Every opt-in subscriber, newest first.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={load}
                  disabled={loading}
                  className="border-[#e0d6c0] bg-white text-[#3a3328] hover:bg-[#f7f2e9]"
                >
                  <RefreshCw
                    className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>
            </div>

            {/* stats */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Card className="border-[#e7dfd0] bg-white shadow-sm">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#9a8f78]">
                    Total subscribers
                  </p>
                  <p className="mt-1 font-serif text-3xl font-bold text-[#1a1410]">
                    {leads.length}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#e7dfd0] bg-white shadow-sm">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#9a8f78]">
                    Showing
                  </p>
                  <p className="mt-1 font-serif text-3xl font-bold text-[#1a1410]">
                    {filtered.length}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#e7dfd0] bg-white shadow-sm">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#9a8f78]">
                    Latest opt-in
                  </p>
                  <p className="mt-1 font-serif text-lg font-semibold text-[#1a1410]">
                    {leads[0] ? timeAgo(leads[0].createdAt) : "—"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* search + actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a8f78]" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search emails…"
                  className="h-10 border-[#e0d6c0] bg-white pl-9 text-[#1a1410] placeholder:text-[#9a8f78]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={copyAll}
                  disabled={filtered.length === 0}
                  className="border-[#e0d6c0] bg-white text-[#3a3328] hover:bg-[#f7f2e9]"
                >
                  {copied ? (
                    <CheckCircle2 className="mr-2 h-4 w-4 text-[#b8893f]" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy all"}
                </Button>
                <Button
                  variant="outline"
                  onClick={exportCsv}
                  disabled={filtered.length === 0}
                  className="border-[#e0d6c0] bg-white text-[#3a3328] hover:bg-[#f7f2e9]"
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* table */}
            <Card className="mt-4 border-[#e7dfd0] bg-white shadow-sm">
              <CardContent className="p-0">
                {error ? (
                  <div className="p-8 text-center text-sm text-red-600">
                    {error}
                  </div>
                ) : loading && leads.length === 0 ? (
                  <div className="flex items-center justify-center gap-2 p-10 text-sm text-[#9a8f78]">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading subscribers…
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="p-10 text-center text-sm text-[#9a8f78]">
                    {query ? "No emails match your search." : "No subscribers yet."}
                  </div>
                ) : (
                  <div className="max-h-[60vh] overflow-y-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-[#faf7f0]">
                        <TableRow className="border-[#e7dfd0] hover:bg-transparent">
                          <TableHead className="text-[#9a8f78]">Email</TableHead>
                          <TableHead className="w-[140px] text-[#9a8f78]">
                            Source
                          </TableHead>
                          <TableHead className="w-[200px] text-right text-[#9a8f78]">
                            Opted in
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtered.map((l) => (
                          <TableRow
                            key={l.id}
                            className="border-[#f0e8d6] hover:bg-[#faf7f0]"
                          >
                            <TableCell className="font-medium text-[#1a1410]">
                              {l.email}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="border-[#e0d6c0] bg-[#faf7f0] text-[#9a8f78]"
                              >
                                {l.source}
                              </Badge>
                            </TableCell>
                            <TableCell
                              className="text-right text-sm text-[#6b6253]"
                              title={fmtFull(l.createdAt)}
                            >
                              {timeAgo(l.createdAt)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            <p className="mt-4 text-xs text-[#9a8f78]">
              This page is public-by-obscure-URL. Anyone with the link can see
              it. Don't share it.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
