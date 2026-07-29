import { useTranslations } from "next-intl";
import { site } from "@/data/site";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-8 font-mono text-xs text-muted">
        <p>
          © {year} Nouriddin Ben Zekri · {t("rights")}
        </p>
        <div className="flex gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noopener"
            className="transition-colors hover:text-petrol"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener"
            className="transition-colors hover:text-petrol"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-petrol"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
