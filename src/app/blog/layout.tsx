import type { Metadata } from "next";
import { fontClasses } from "@/app/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Blog | Nouriddin Ben Zekri",
    template: "%s | Nouriddin Ben Zekri",
  },
  description:
    "Notes on Java, Spring and AI assisted engineering, by Nouriddin Ben Zekri.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <html lang="en" className={`${fontClasses} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
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
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-8 text-center font-mono text-xs text-muted">
            <p>© {year} Nouriddin Ben Zekri · All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
