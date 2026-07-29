import { useLocale, useTranslations } from "next-intl";
import Section from "@/components/Section";
import { education, skillGroups } from "@/data/skills";
import { pick } from "@/data/types";
import type { Locale } from "@/i18n/routing";

export default function Skills() {
  const locale = useLocale() as Locale;
  const t = useTranslations("skills");

  return (
    <Section id="skills" kicker={t("kicker")} title={t("heading")} tinted>
      <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.label.en}>
            <p className="font-mono text-xs font-semibold tracking-widest text-kicker uppercase">
              {pick(group.label, locale)}
            </p>
            <p className="mt-1 text-[15px] leading-relaxed text-ink">
              {group.items}
            </p>
          </div>
        ))}
        <div>
          <p className="font-mono text-xs font-semibold tracking-widest text-kicker uppercase">
            {t("languages")}
          </p>
          <p className="mt-1 text-[15px] leading-relaxed text-ink">
            {t("languagesValue")}
          </p>
        </div>
      </div>

      <h3 className="mt-12 font-heading text-lg font-bold text-title">
        {t("education")}
        <span className="text-flame">.</span>
      </h3>
      <ul className="mt-4 space-y-3">
        {education.map((entry) => (
          <li key={entry.year + entry.title.en} className="flex gap-4">
            <span className="w-10 shrink-0 font-mono text-xs font-semibold text-petrol-2">
              {entry.year}
            </span>
            <span className="text-[15px] leading-relaxed">
              <span className="font-semibold text-ink">
                {pick(entry.title, locale)}
              </span>{" "}
              <span className="text-muted">· {pick(entry.org, locale)}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
