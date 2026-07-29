import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("hero");

  return (
    <main className="p-16">
      <h1 className="font-heading text-4xl font-bold text-petrol">
        {t("title")}
      </h1>
      <p className="mt-2 text-muted">{t("subtitle")}</p>
    </main>
  );
}
