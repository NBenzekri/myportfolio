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
    slug: "equals-hashcode-nightmare",
    title: "The equals and hashCode nightmare",
    date: "2026-07-30",
    description:
      "The Java question that follows you from junior interviews to senior ones: what the contract really says, what HashMap does with your hashCode, and the two bugs that make it to production.",
  },
];
