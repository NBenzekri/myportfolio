import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    id: "grdf",
    dates: { en: "Jan 2025 - present", fr: "janv. 2025 - auj." },
    current: true,
    role: {
      en: "Software Engineer, Java / Spring Boot",
      fr: "Ingénieur Études et Développement, Java / Spring Boot",
    },
    client: "GRDF",
    via: "Néosoft",
    location: { en: "Paris", fr: "Paris" },
    context: {
      en: "VEGA program: rebuilding the business-critical information system that manages gas distribution for energy suppliers, moving it to an event-driven microservices architecture.",
      fr: "Programme VEGA : refonte du SI critique de gestion de l'acheminement du gaz (relation fournisseurs d'énergie) vers une architecture microservices event-driven.",
    },
    bullets: {
      en: [
        "Build and evolve the REST APIs behind the intervention request lifecycle, the core service of the platform, along with its Drools decision tables.",
        "Kafka producers and consumers with Avro and Schema Registry, replay of failed flows, and decommissioning of legacy integrations.",
        "Large-scale Spring Batch jobs: daily publications to energy suppliers, bulk file processing and reminders, orchestrated with VTOM.",
        "Brought Microcks to the program to share integration mocks across teams, from feasibility study to automated CI/CD rollout.",
      ],
      fr: [
        "Développement des API REST du cycle de vie des demandes d'intervention, brique cœur du SI, et des règles métier Drools (tables de décision).",
        "Producers et consumers Kafka Avro (Schema Registry), rejeu des flux en erreur, décommissionnement des intégrations legacy.",
        "Batchs Spring Batch à grande échelle : publications quotidiennes aux fournisseurs d'énergie, traitements de masse, relances, orchestrés avec VTOM.",
        "Introduction de Microcks pour mutualiser les bouchons d'intégration entre équipes, du POC au déploiement automatisé en CI/CD.",
      ],
    },
    stack: [
      "Java 17",
      "Spring Boot 3",
      "Kafka / Avro",
      "PostgreSQL",
      "Drools",
      "Spring Batch",
      "GitLab CI",
      "Testcontainers",
    ],
  },
  {
    id: "societe-generale",
    dates: { en: "Feb 2022 - Sep 2024", fr: "févr. 2022 - sept. 2024" },
    role: {
      en: "Full Stack Engineer, Java / React",
      fr: "Ingénieur Full Stack, Java / React",
    },
    client: "Société Générale",
    via: "NormaSys",
    location: { en: "Paris", fr: "Paris" },
    context: {
      en: "NOVA: rebuild of the credit rating application for non-retail counterparties (SMEs, large corporates, institutions) inside the RISQ division.",
      fr: "NOVA : refonte de l'application de notation crédit des contreparties non retail (PME, grandes entreprises, institutionnels) au sein de l'entité RISQ.",
    },
    bullets: {
      en: [
        "Designed and built performant REST APIs in Java and Spring Boot, documented with OpenAPI so other teams could adopt them.",
        "Built modern React and Redux interfaces, documented with Storybook.",
        "Drove the Java 17 and Spring Boot 3 migration, and the move to microservices on Kubernetes with automated Jenkins deployments.",
        "TDD and BDD as the daily standard: JUnit, Cucumber, FitNesse and thorough code reviews.",
      ],
      fr: [
        "Conception et développement d'API REST Java / Spring Boot performantes, documentées avec OpenAPI pour l'adoption par les autres équipes.",
        "Interfaces React / Redux modernes et ergonomiques, documentées via Storybook.",
        "Migration Java 17 et Spring Boot 3, passage à une architecture microservices sur Kubernetes avec déploiements Jenkins automatisés.",
        "TDD et BDD au quotidien : JUnit, Cucumber, FitNesse et revues de code approfondies.",
      ],
    },
    stack: [
      "Java 11/17",
      "Spring Boot",
      "React",
      "Redux",
      "PostgreSQL",
      "Kubernetes",
      "Docker",
      "Jenkins",
    ],
  },
  {
    id: "tanger-med",
    dates: { en: "Jul 2019 - Dec 2021", fr: "juil. 2019 - déc. 2021" },
    role: {
      en: "Full Stack Software Engineer",
      fr: "Ingénieur Études et Développement Full Stack",
    },
    client: "Tanger Med Port Authority",
    location: { en: "Tangier, Morocco", fr: "Tanger, Maroc" },
    context: {
      en: "Port Community System: the portal connecting the stakeholders of Africa's leading container port, from customs and freight forwarders to shipping lines and terminals.",
      fr: "Port Community System : le portail qui relie les acteurs du premier port à conteneurs d'Afrique, de la douane et des transitaires aux compagnies maritimes et aux terminaux.",
    },
    bullets: {
      en: [
        "Designed the architecture of the new platform on Kubernetes and Docker, built with Java and React.",
        "Built the BerthPlan and Slot Management microservices for real-time scheduling of vessel berthing slots.",
        "Integrated EDI and web service exchanges with strategic partners, including customs and other ports.",
        "Wrote the functional and technical documentation and trained end users.",
      ],
      fr: [
        "Conception de l'architecture de la nouvelle plateforme sur Kubernetes et Docker, développée en Java et React.",
        "Développement des microservices BerthPlan et Slot Management : planification en temps réel des créneaux d'accostage des navires.",
        "Intégration des échanges EDI et web services avec les partenaires stratégiques, dont la douane et d'autres ports.",
        "Documentation fonctionnelle et technique, formation des utilisateurs finaux.",
      ],
    },
    stack: [
      "Java 8/11",
      "Spring Boot",
      "React",
      "Oracle",
      "MongoDB",
      "Kubernetes",
      "GitLab CI",
    ],
  },
  {
    id: "axentis",
    dates: { en: "Nov 2018 - May 2019", fr: "nov. 2018 - mai 2019" },
    role: {
      en: "Software Engineer, Electronic Payments",
      fr: "Ingénieur Études et Développement, Monétique",
    },
    client: "Axentis Group",
    location: { en: "Casablanca, Morocco", fr: "Casablanca, Maroc" },
    context: {
      en: "Electronic payment projects, from design through to client delivery.",
      fr: "Projets monétiques, de la conception à la livraison client.",
    },
    bullets: {
      en: [
        "Built features for electronic payment terminals: card payments and security standards.",
        "Designed and built an invoice reconciliation application.",
      ],
      fr: [
        "Développement de fonctionnalités pour terminaux de paiement électronique : paiement par carte, normes de sécurité.",
        "Conception et développement d'une application de rapprochement financier des factures.",
      ],
    },
    stack: ["J2EE", "Hibernate", "JSF", "SQL Server"],
  },
];
