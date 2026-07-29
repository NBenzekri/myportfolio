import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import SocialLinks from "@/components/SocialLinks";
import portrait from "../../../public/images/portrait.jpg";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="border-b border-line">
      <div className="mx-auto flex max-w-3xl flex-col-reverse gap-8 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-24">
        <div className="max-w-xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-flame">
            {t("kicker")}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-petrol sm:text-5xl">
            {t("title")}
            <span className="text-flame">.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink">{t("lead")}</p>
          <p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-flame"
            />
            {t("current")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#experience"
              className="bg-petrol px-5 py-2.5 font-heading text-sm font-bold text-paper transition-colors hover:bg-petrol-2"
            >
              {t("ctaWork")}
            </Link>
            <Link
              href="/#contact"
              className="border border-line px-5 py-2.5 font-heading text-sm font-bold text-petrol transition-colors hover:border-petrol"
            >
              {t("ctaContact")}
            </Link>
            <span aria-hidden className="hidden h-6 w-px bg-line sm:block" />
            <SocialLinks />
          </div>
        </div>
        <Image
          src={portrait}
          alt="Nouriddin Ben Zekri"
          placeholder="blur"
          priority
          className="h-28 w-28 rounded-2xl border-2 border-petrol object-cover object-top sm:h-40 sm:w-40"
          sizes="(min-width: 640px) 160px, 112px"
        />
      </div>
    </section>
  );
}
