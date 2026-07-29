import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-3xl px-5 py-8 text-center font-mono text-xs text-muted">
        <p>
          © {year} Nouriddin Ben Zekri · {t("rights")}
        </p>
      </div>
    </footer>
  );
}
