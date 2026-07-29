import { useLocale, useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";
import Section from "@/components/Section";
import { pick, type Localized } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import paragliding from "../../../public/images/me/paragliding.jpg";
import skogafoss from "../../../public/images/me/skogafoss.jpg";
import cycling from "../../../public/images/me/cycling.jpg";
import icelandFilming from "../../../public/images/me/iceland-filming.jpg";
import bivouacHiking from "../../../public/images/me/bivouac-hiking.jpg";
import paris from "../../../public/images/me/paris.jpg";

const photos: { src: StaticImageData; label: Localized }[] = [
  { src: paragliding, label: { en: "Paragliding", fr: "Parapente" } },
  {
    src: skogafoss,
    label: { en: "Inside Skógafoss", fr: "Sous Skógafoss" },
  },
  { src: cycling, label: { en: "Cycling", fr: "À vélo" } },
  {
    src: icelandFilming,
    label: { en: "Filming in Iceland", fr: "Tournage en Islande" },
  },
  {
    src: bivouacHiking,
    label: { en: "Bivouac hike", fr: "Rando bivouac" },
  },
  { src: paris, label: { en: "Home base, Paris", fr: "Port d'attache, Paris" } },
];

export default function Beyond() {
  const locale = useLocale() as Locale;
  const t = useTranslations("beyond");

  return (
    <Section id="beyond" kicker={t("kicker")} title={t("heading")}>
      <p className="max-w-xl text-[15px] leading-relaxed text-ink">
        {t("text")}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3">
        {photos.map((photo) => {
          const label = pick(photo.label, locale);
          return (
            <figure key={photo.src.src}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-mist">
                <Image
                  src={photo.src}
                  alt={label}
                  placeholder="blur"
                  fill
                  sizes="(min-width: 640px) 240px, 45vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <figcaption className="mt-1.5 font-mono text-[10px] font-medium tracking-widest text-muted uppercase">
                {label}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Section>
  );
}
