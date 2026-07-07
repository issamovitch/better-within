import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

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
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1779611606725498');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1779611606725498&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
