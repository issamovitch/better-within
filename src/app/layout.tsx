import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Why Did I Say That? — A Free Science-Based Field Guide to Post-Event Rumination",
  description:
    "Stop the 2 a.m. replays of every work conversation. A free, 24-page, evidence-based field guide built on published psychology research. Download the PDF.",
  keywords: [
    "social anxiety",
    "rumination",
    "overthinking",
    "post-event processing",
    "work anxiety",
    "CBT",
    "free ebook",
    "cognitive defusion",
  ],
  authors: [{ name: "Better Within" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Why Did I Say That? — A Free Science-Based Field Guide",
    description:
      "Learn how to stop the social anxiety, rumination, and intrusive thoughts that replay every work conversation. Free PDF.",
    siteName: "Better Within",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Did I Say That? — Free Field Guide",
    description:
      "A science-based field guide to post-event rumination at work. Free PDF.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
