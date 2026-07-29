import { useTranslations } from "next-intl";
import NextLink from "next/link";
import Section from "@/components/Section";
import { posts } from "@/data/posts";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function BlogTeaser() {
  const t = useTranslations("blog");
  if (posts.length === 0) return null;
  const latest = posts.slice(0, 3);

  return (
    <Section id="blog" kicker={t("kicker")} title={t("heading")} tinted>
      <ul className="space-y-6">
        {latest.map((post) => (
          <li key={post.slug}>
            <p className="font-mono text-xs text-petrol-2">
              {dateFormat.format(new Date(post.date))}
            </p>
            <h3 className="mt-1 font-heading text-lg font-bold text-ink">
              <NextLink
                href={`/blog/${post.slug}`}
                className="transition-colors hover:text-petrol"
              >
                {post.title}
              </NextLink>
            </h3>
            <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted">
              {post.description}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <NextLink
          href="/blog"
          className="font-mono text-xs font-semibold tracking-widest text-petrol uppercase transition-colors hover:text-flame-deep"
        >
          {t("all")} →
        </NextLink>
      </p>
    </Section>
  );
}
