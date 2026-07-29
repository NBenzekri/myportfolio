import type { Metadata } from "next";
import { posts } from "@/data/posts";
import { site } from "@/data/site";
import JsonLd from "@/components/JsonLd";
import CodeBlock from "@/components/CodeBlock";

const post = posts.find((p) => p.slug === "equals-hashcode-nightmare")!;

const postJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  datePublished: post.date,
  url: `${site.url}/blog/${post.slug}`,
  author: {
    "@type": "Person",
    name: site.name,
    url: site.url,
  },
};

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.description,
    url: `/blog/${post.slug}`,
    siteName: "Nouriddin Ben Zekri",
    type: "article",
    publishedTime: post.date,
  },
  twitter: {
    card: "summary_large_image",
    images: [`/blog/${post.slug}/opengraph-image`],
  },
};

export default function Post() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <JsonLd data={postJsonLd} />
      <article className="prose-article">
        <p className="font-mono text-xs text-petrol-2">30 Jul 2026</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-title sm:text-4xl">
          {post.title}
        </h1>

        <p>
          There is one Java question that never retires. It shows up in junior
          interviews, it shows up in senior interviews, and I have watched
          people with ten years of experience get vague about it. Nobody
          escapes <code>equals</code> and <code>hashCode</code>. And honestly,
          that is fair, because getting them wrong does not fail loudly in an
          interview. It fails quietly in production.
        </p>

        <h2>What the two methods actually answer</h2>
        <p>
          Strip away the ceremony and each method answers one question:
        </p>
        <ul>
          <li>
            <code>equals</code> answers: <strong>are these two objects the
            same thing?</strong>
          </li>
          <li>
            <code>hashCode</code> answers: <strong>which drawer should I look
            in to find it?</strong>
          </li>
        </ul>
        <p>
          By default, Java answers both with memory identity: two objects are
          equal only if they are literally the same instance. Which gives you
          this classic:
        </p>
        <CodeBlock
          code={`public class User {
    private final String email;

    public User(String email) {
        this.email = email;
    }
    // no equals, no hashCode
}

Set<User> users = new HashSet<>();
users.add(new User("sara@mail.com"));
users.add(new User("sara@mail.com"));

System.out.println(users.size());   // 2. Same person, twice.`}
        />
        <p>
          The fix is to define what "the same thing" means for your class, and
          to keep the drawer consistent with that definition:
        </p>
        <CodeBlock
          code={`@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof User other)) return false;
    return email.equals(other.email);
}

@Override
public int hashCode() {
    return Objects.hash(email);
}`}
        />
        <p>
          The contract behind it fits in one sentence: <strong>if two objects
          are equal, they must return the same hashCode</strong>. The reverse
          is not required, two different objects may share a hashCode. That is
          just a collision, and collisions are legal. (Also: a{" "}
          <code>record User(String email)</code> writes all of this for you.
          Use records when you can.)
        </p>

        <h2>What HashMap does with your hashCode</h2>
        <p>
          To see why the contract matters, look at what happens on a{" "}
          <code>put</code>. A HashMap is an array of buckets. When you insert a
          key, the map:
        </p>
        <ul>
          <li>calls <code>hashCode()</code> on your key,</li>
          <li>
            derives the bucket index from it, roughly{" "}
            <code>hash &amp; (capacity - 1)</code>,
          </li>
          <li>
            walks the entries already sitting in that bucket and uses{" "}
            <code>equals</code> to check whether the key is already there.
          </li>
        </ul>
        <p>
          So <code>hashCode</code> picks the drawer, <code>equals</code>{" "}
          searches inside it. A lookup is fast precisely because the map never
          searches the whole table, only one small drawer. That whole promise
          rests on your hashCode spreading keys across drawers.
        </p>

        <h2>The same-bucket nightmare</h2>
        <p>Now break that promise on purpose:</p>
        <CodeBlock
          code={`@Override
public int hashCode() {
    return 42;   // perfectly legal. also a disaster.
}`}
        />
        <p>
          This violates nothing. Equal objects still return equal hashCodes.
          But every single key now maps to the same bucket. One drawer holds
          everything, the other drawers stay empty, and each insert or lookup
          walks through every entry you ever added, comparing with{" "}
          <code>equals</code> one by one:
        </p>
        <CodeBlock
          code={`Map<User, Integer> scores = new HashMap<>();
for (int i = 0; i < 100_000; i++) {
    scores.put(new User("user" + i + "@mail.com"), i);
}
// every put scans the same growing bucket:
// your O(1) map is now a list wearing a map costume.`}
        />
        <p>
          Since Java 8 the damage is capped: past eight entries a bucket turns
          from a linked list into a red-black tree, so lookups degrade to
          O(log n) instead of O(n), provided your keys are comparable. Nice
          safety net, still nothing like the O(1) you signed up for. The same
          thing happens in a milder form with any sloppy hashCode, hashing on
          one low-variety field, like a country code, quietly gives you a few
          giant buckets.
        </p>

        <h2>The vanishing key</h2>
        <p>
          The subtler production bug is not a slow map, it is a lying one.
          Imagine <code>email</code> was not final, and someone edits it while
          the object is a key:
        </p>
        <CodeBlock
          code={`Map<User, Integer> scores = new HashMap<>();
User sara = new User("sara@mail.com");
scores.put(sara, 10);

sara.setEmail("sara@corp.com");     // key mutated after insert

scores.containsKey(sara);   // false
scores.get(sara);           // null
scores.size();              // 1. Still in there. Unreachable.`}
        />
        <p>
          The map stored sara in the drawer chosen by her old hashCode. After
          the mutation, every lookup computes the new hashCode and opens a
          different drawer. The entry is not gone, it is stranded, and it will
          sit there leaking memory until the map dies. This is why keys should
          be immutable, and why hashing on mutable fields is the part of the
          contract people actually get burned by.
        </p>

        <h2>How to never get bitten</h2>
        <ul>
          <li>
            Override <code>equals</code> and <code>hashCode</code> together,
            always, on the same fields.
          </li>
          <li>
            Build them from immutable fields only, ideally a stable business
            identity.
          </li>
          <li>
            Let something else write them: records, your IDE, or{" "}
            <code>Objects.hash</code>.
          </li>
          <li>
            In the interview, mention the drawers and the vanishing key. The
            contract is the junior answer; what HashMap does with it is the
            senior one.
          </li>
        </ul>
        <p>
          And when an AI assistant generates an entity class for you, glance at
          which fields ended up in <code>hashCode</code>. It picks all of them
          by default, mutable ones included. Now you know exactly why that
          matters.
        </p>
      </article>
    </main>
  );
}
