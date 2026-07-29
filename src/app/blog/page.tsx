import Link from "next/link";
import { posts } from "@/data/posts";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-flame-deep">
        Notes from the field
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-petrol">
        Blog<span className="text-flame">.</span>
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
        Notes on Java, Spring and AI assisted engineering. Written in English.
      </p>

      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <p className="font-mono text-xs text-petrol-2">
              {dateFormat.format(new Date(post.date))}
            </p>
            <h2 className="mt-1 font-heading text-xl font-bold text-ink">
              <Link
                href={`/blog/${post.slug}`}
                className="transition-colors hover:text-petrol"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
              {post.description}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
