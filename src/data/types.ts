import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(l: Localized<T>, locale: Locale): T {
  return l[locale];
}

export type Experience = {
  id: string;
  dates: Localized;
  current?: boolean;
  role: Localized;
  client: string;
  via?: string;
  location: Localized;
  context: Localized;
  bullets: Localized<string[]>;
  stack: string[];
};

export type Project = {
  id: string;
  name: string;
  url: string;
  tier: "featured" | "compact";
  description: Localized;
  stack?: string[];
};
