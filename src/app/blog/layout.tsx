import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontClasses } from "@/app/fonts";
import { site } from "@/data/site";
import ThemeToggle from "@/components/ThemeToggle";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Blog | Nouriddin Ben Zekri",
    template: "%s | Nouriddin Ben Zekri",
  },
  description:
    "Notes on Java, Spring and AI assisted engineering, by Nouriddin Ben Zekri.",
  alternates: { canonical: "/blog" },
  openGraph: {
    siteName: "Nouriddin Ben Zekri",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/api/og"] },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <html
      lang="en"
      className={`${fontClasses} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-3">
            <a
              href="/"
              className="font-heading text-lg font-extrabold tracking-tight text-ink"
            >
              N. Ben Zekri<span className="text-flame">.</span>
            </a>
            <nav
              aria-label="Main"
              className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-muted sm:gap-6 sm:text-xs"
            >
              <a href="/" className="transition-colors hover:text-petrol">
                Home
              </a>
              <a
                href="/blog"
                className="text-petrol transition-colors hover:text-petrol"
              >
                Blog
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-8 text-center font-mono text-xs text-muted">
            <p>© {year} Nouriddin Ben Zekri · All rights reserved.</p>
          </div>
        </footer>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
