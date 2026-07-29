import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Section from "@/components/Section";
import { projects } from "@/data/projects";
import { pick } from "@/data/types";
import type { Locale } from "@/i18n/routing";

export default function Projects() {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects");
  const featured = projects.filter((p) => p.tier === "featured");
  const compact = projects.filter((p) => p.tier === "compact");

  return (
    <Section id="projects" kicker={t("kicker")} title={t("heading")} tinted>
      <p className="max-w-xl text-[15px] leading-relaxed text-muted">
        {t("intro")}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {featured.map((project) => (
          <article
            key={project.id}
            className="flex flex-col border-t-2 border-petrol bg-paper p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="flex items-center gap-2.5 font-heading text-lg font-bold text-ink">
                <Image
                  src={project.logo}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-md object-contain"
                />
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener"
                  className="transition-colors hover:text-petrol"
                >
                  {project.name}
                  <span aria-hidden className="ml-1 text-petrol-2">
                    ↗
                  </span>
                </a>
              </h3>
              <span className="font-mono text-[10px] font-semibold tracking-widest whitespace-nowrap text-flame-deep uppercase">
                {t(project.id === "pronofans" ? "live" : "building")}
              </span>
            </div>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">
              {pick(project.description, locale)}
            </p>
            {project.stack ? (
              <p className="mt-4 font-mono text-xs leading-relaxed text-petrol">
                {project.stack.join(" · ")}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {compact.map((project) => (
          <article
            key={project.id}
            className="border-t-2 border-petrol-2 bg-paper p-5 shadow-sm"
          >
            <h3 className="flex items-center gap-2 font-heading text-base font-bold text-ink">
              <Image
                src={project.logo}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 rounded-sm object-contain"
              />
              <a
                href={project.url}
                target="_blank"
                rel="noopener"
                className="transition-colors hover:text-petrol"
              >
                {project.name}
                <span aria-hidden className="ml-1 text-petrol-2">
                  ↗
                </span>
              </a>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {pick(project.description, locale)}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
