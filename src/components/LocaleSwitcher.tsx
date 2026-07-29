"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "en" ? "fr" : "en";

  return (
    <Link
      href={pathname}
      locale={other}
      className="border border-line px-2 py-1 text-ink transition-colors hover:border-petrol hover:text-petrol"
      aria-label={other === "fr" ? "Version française" : "English version"}
    >
      {other.toUpperCase()}
    </Link>
  );
}
