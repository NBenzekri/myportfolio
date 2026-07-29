import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "pronofans",
    name: "PronoFans",
    url: "https://pronofans.com",
    tier: "featured",
    logo: "/images/projects/pronofans.png",
    description: {
      en: "A free social football prediction game, launched for the 2026 World Cup and run live through the whole tournament. Friends create private leagues, predict scores, follow live leaderboards during matches and share their result cards. Trilingual in French, English and Arabic, with full right-to-left support.",
      fr: "Un jeu social et gratuit de pronostics football, lancé pour la Coupe du Monde 2026 et exploité en direct pendant tout le tournoi. On y crée des ligues privées entre amis, on pronostique les scores, on suit les classements en direct pendant les matchs et on partage ses cartes de résultats. Trilingue français, anglais et arabe, avec prise en charge complète de l'écriture de droite à gauche.",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Supabase",
      "next-intl",
      "Vercel AI SDK",
    ],
  },
  {
    id: "certi-dpe",
    name: "Certi-DPE",
    url: "https://certi-dpe.fr",
    tier: "featured",
    logo: "/images/projects/certi-dpe.png",
    description: {
      en: "A SaaS that reads a French energy performance certificate (DPE) and returns a rental compliance verdict in minutes: whether the property faces a rental ban, on what timeline, and which renovations matter first. Built for real estate agents and landlords, with an AI document pipeline doing the reading.",
      fr: "Un SaaS qui lit un DPE et rend un verdict de conformité locative en quelques minutes : interdiction de location ou non, à quelle échéance, et quels travaux prioriser. Pensé pour les agents immobiliers et les propriétaires, avec un pipeline IA qui lit le document.",
    },
    stack: ["Next.js", "Supabase", "Stripe", "GPT-4o Vision", "n8n"],
  },
  {
    id: "truqar",
    name: "Truqar",
    url: "https://truqar.ma",
    tier: "compact",
    logo: "/images/projects/truqar.png",
    description: {
      en: "Car rental marketplace for Morocco, connecting verified agencies and renters.",
      fr: "Marketplace marocaine de location de voitures, entre agences vérifiées et conducteurs.",
    },
  },
  {
    id: "marocbooking",
    name: "MarocBooking",
    url: "https://marocbooking.ma",
    tier: "compact",
    logo: "/images/projects/marocbooking.png",
    description: {
      en: "Accommodation booking platform for Morocco, for guests and hosts.",
      fr: "Plateforme marocaine de réservation d'hébergements, côté voyageurs et côté hôtes.",
    },
  },
];
