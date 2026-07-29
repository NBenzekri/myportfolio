import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing, type Locale } from "@/i18n/routing";
import { fontClasses } from "@/app/fonts";
import { site } from "@/data/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "meta",
  });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: "Nouriddin Ben Zekri, Senior Full Stack Engineer",
      template: "%s | Nouriddin Ben Zekri",
    },
    description: t("description"),
    alternates: {
      canonical: locale === "en" ? "/" : "/fr",
      languages: { en: "/", fr: "/fr", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: locale === "en" ? "/" : "/fr",
      siteName: "Nouriddin Ben Zekri",
      title: "Nouriddin Ben Zekri, Senior Full Stack Engineer",
      description: t("description"),
      locale: locale === "en" ? "en_US" : "fr_FR",
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: "Nouriddin Ben Zekri, Senior Full Stack Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nouriddin Ben Zekri, Senior Full Stack Engineer",
      description: t("description"),
      images: ["/api/og"],
    },
  };
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Senior Full Stack Engineer",
  url: site.url,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  sameAs: [site.linkedin, site.github],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${fontClasses} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={personJsonLd} />
        <NextIntlClientProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
