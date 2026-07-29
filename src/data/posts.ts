export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

// Newest first. Adding a post: create src/app/blog/<slug>/page.tsx
// and add its entry at the top of this list.
export const posts: Post[] = [
  {
    slug: "what-ai-gets-wrong-spring-transactions",
    title: "What AI assistants get subtly wrong about Spring transactions",
    date: "2026-07-29",
    description:
      "Self-invocation, readOnly and rollback rules: three places where generated Spring code compiles, passes review, and still loses data in production.",
  },
];
