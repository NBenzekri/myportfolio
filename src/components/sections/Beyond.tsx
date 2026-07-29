import { useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";
import Section from "@/components/Section";
import portrait from "../../../public/images/portrait.jpg";

// Swap these for real travel shots: drop files in public/images/travel/
// and replace the entries below (src can be a static import or a path).
const travelPhotos: { src: StaticImageData | string; alt: string }[] = [
  { src: portrait, alt: "On the road" },
  { src: portrait, alt: "Iceland" },
  { src: portrait, alt: "Morocco" },
  { src: portrait, alt: "Somewhere next" },
];

export default function Beyond() {
  const t = useTranslations("beyond");

  return (
    <Section id="beyond" kicker={t("kicker")} title={t("heading")}>
      <p className="max-w-xl text-[15px] leading-relaxed text-ink">
        {t("text")}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {travelPhotos.map((photo, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-md bg-mist"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 176px, 45vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
