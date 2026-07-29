import { useLocale, useTranslations } from "next-intl";
import Section from "@/components/Section";
import { experiences } from "@/data/experiences";
import { pick } from "@/data/types";
import type { Locale } from "@/i18n/routing";

export default function Experience() {
  const locale = useLocale() as Locale;
  const t = useTranslations("experience");

  return (
    <Section id="experience" kicker={t("kicker")} title={t("heading")}>
      <div className="ml-1 space-y-12 border-l-2 border-line pl-6">
        {experiences.map((xp) => (
          <article key={xp.id} className="relative">
            <span
              aria-hidden
              className={`absolute top-1 -left-[33px] h-3 w-3 rounded-full border-2 ${
                xp.current
                  ? "border-flame bg-flame ring-4 ring-flame/15"
                  : "border-petrol-2 bg-paper"
              }`}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-heading text-lg font-bold text-ink">
                {pick(xp.role, locale)}
              </h3>
              <p className="font-mono text-xs font-medium whitespace-nowrap text-petrol-2">
                {pick(xp.dates, locale)}
              </p>
            </div>
            <p className="mt-1 font-semibold text-petrol">
              {xp.client}
              <span className="font-normal text-muted">
                {xp.via ? ` · via ${xp.via}` : ""} · {pick(xp.location, locale)}
              </span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {pick(xp.context, locale)}
            </p>
            <ul className="mt-3 space-y-1.5">
              {pick(xp.bullets, locale).map((bullet) => (
                <li
                  key={bullet}
                  className="relative pl-4 text-[15px] leading-relaxed text-ink before:absolute before:top-[0.55em] before:left-0 before:h-1.5 before:w-1.5 before:bg-flame"
                >
                  {bullet}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-xs leading-relaxed text-petrol">
              {xp.stack.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
