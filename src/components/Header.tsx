import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-y-2 px-5 py-3 sm:flex-row sm:justify-between sm:gap-x-6">
        <Link
          href="/"
          className="font-heading text-lg font-extrabold tracking-tight text-ink"
        >
          N. Ben Zekri<span className="text-flame">.</span>
        </Link>
        <nav
          aria-label="Main"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[11px] whitespace-nowrap uppercase tracking-widest text-muted sm:gap-x-6 sm:text-xs"
        >
          <Link
            href="/#experience"
            className="transition-colors hover:text-petrol"
          >
            {t("work")}
          </Link>
          <Link href="/#skills" className="transition-colors hover:text-petrol">
            {t("skills")}
          </Link>
          <Link
            href="/#projects"
            className="transition-colors hover:text-petrol"
          >
            {t("projects")}
          </Link>
          <NextLink
            href="/blog"
            className="transition-colors hover:text-petrol"
          >
            {t("blog")}
          </NextLink>
          <Link
            href="/#contact"
            className="transition-colors hover:text-petrol"
          >
            {t("contact")}
          </Link>
          <LocaleSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
