import type { Localized } from "./types";

export type SkillGroup = {
  label: Localized;
  items: string;
};

export const skillGroups: SkillGroup[] = [
  {
    label: { en: "Backend", fr: "Backend" },
    items: "Java 8 → 23 · Spring Boot 3 (Web, Data JPA, Batch, Security, Kafka) · Node.js",
  },
  {
    label: { en: "Event-driven", fr: "Event-driven" },
    items: "Apache Kafka · Avro · Schema Registry · replay patterns",
  },
  {
    label: { en: "Frontend", fr: "Frontend" },
    items: "React · Next.js · Redux · TypeScript · Tailwind CSS · shadcn/ui",
  },
  {
    label: { en: "Data", fr: "Données" },
    items: "PostgreSQL · Oracle · MongoDB · Flyway · JOOQ",
  },
  {
    label: { en: "Quality & testing", fr: "Qualité & tests" },
    items:
      "JUnit 5 · Mockito · WireMock · Testcontainers · EmbeddedKafka · SonarQube · TDD / BDD",
  },
  {
    label: { en: "DevOps & Cloud", fr: "DevOps & Cloud" },
    items: "Docker · Kubernetes · GitLab CI · Jenkins · AWS · Gradle · Maven",
  },
  {
    label: { en: "Applied AI", fr: "IA appliquée" },
    items: "Claude Code (skills, MCP) · context engineering · Python tooling",
  },
];

export type Education = {
  year: string;
  title: Localized;
  org: Localized;
};

export const education: Education[] = [
  {
    year: "2026",
    title: {
      en: "AWS Solutions Architect & Developer, Associate",
      fr: "AWS Solutions Architect & Developer, Associate",
    },
    org: { en: "Néosoft training", fr: "formation Néosoft" },
  },
  {
    year: "2025",
    title: {
      en: "AI Program, Software Engineering Expertise",
      fr: "Programme IA, Expertise Software Engineering",
    },
    org: { en: "Néosoft training", fr: "formation Néosoft" },
  },
  {
    year: "2018",
    title: {
      en: "Engineering degree, Computer Science & e-Logistics",
      fr: "Diplôme d'ingénieur, Informatique & e-Logistique",
    },
    org: { en: "ENSIAS, Rabat", fr: "ENSIAS, Rabat" },
  },
  {
    year: "2016",
    title: { en: "Machine Learning", fr: "Machine Learning" },
    org: { en: "Coursera", fr: "Coursera" },
  },
];
