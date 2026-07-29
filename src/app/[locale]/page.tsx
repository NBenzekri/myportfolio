import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Beyond from "@/components/sections/Beyond";
import BlogTeaser from "@/components/sections/BlogTeaser";
import Contact from "@/components/sections/Contact";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Experience />
      <Projects />
      <Beyond />
      <BlogTeaser />
      <Contact />
    </main>
  );
}
