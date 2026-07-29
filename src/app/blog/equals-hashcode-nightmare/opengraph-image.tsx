import { posts } from "@/data/posts";
import { postOgImage, postOgSize } from "@/lib/post-og";

const post = posts.find((p) => p.slug === "equals-hashcode-nightmare")!;

export const alt = post.title;
export const size = postOgSize;
export const contentType = "image/png";

export default function Image() {
  return postOgImage(post);
}
