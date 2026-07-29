import type { Metadata } from "next";
import { posts } from "@/data/posts";
import { site } from "@/data/site";
import JsonLd from "@/components/JsonLd";

const post = posts.find(
  (p) => p.slug === "what-ai-gets-wrong-spring-transactions",
)!;

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
  openGraph: {
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.date,
  },
};

export default function Post() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <JsonLd data={postJsonLd} />
      <article className="prose-article">
        <p className="font-mono text-xs text-petrol-2">29 Jul 2026</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-petrol sm:text-4xl">
          {post.title}
        </h1>

        <p>
          I use AI assistants every day, at work on a large Spring Boot system
          and at home on my own products. They are genuinely good at Spring
          now. The code compiles, the naming is clean, the annotations are in
          the right place. That is exactly what makes the failures dangerous:
          the wrong code looks like the right code, sails through review, and
          only misbehaves in production, quietly.
        </p>
        <p>
          Transactions are where I catch the most of these. Here are the three
          mistakes I keep seeing in generated code, why they pass review, and
          how they actually fail.
        </p>

        <h2>1. Self-invocation: the annotation that does nothing</h2>
        <p>
          Ask an assistant to refactor a long transactional method and it will
          often produce something like this:
        </p>
        <pre>
          <code>{`@Service
public class OrderImportService {

  public void importOrders(List<OrderFile> files) {
    for (OrderFile file : files) {
      processFile(file);   // looks fine, is not
    }
  }

  @Transactional   // silently ignored
  void processFile(OrderFile file) {
    // writes everyone assumes are atomic
  }
}`}</code>
        </pre>
        <p>
          Spring implements <code>@Transactional</code> with a proxy around the
          bean. The transaction interceptor only runs when a call crosses the
          proxy, meaning it comes from outside the class. A call to{" "}
          <code>processFile(file)</code> from inside the same class goes
          through <code>this</code>, never touches the proxy, and the
          annotation does nothing at all. Every file is processed with no
          transaction, and a failure halfway through a file leaves half its
          writes behind.
        </p>
        <p>
          The assistant is not wrong about the syntax. It has simply never been
          bitten by the proxy semantics. Reviewers miss it because the diff
          looks like a tidy extraction. The fix is boring and reliable: move
          the transactional method to its own bean, or use{" "}
          <code>TransactionTemplate</code> explicitly where you need the
          boundary.
        </p>

        <h2>2. readOnly as a harmless performance flag</h2>
        <p>
          Generated service layers love{" "}
          <code>@Transactional(readOnly = true)</code>. It gets sprinkled on
          anything whose name starts with <code>get</code> or{" "}
          <code>find</code>, presented as a free optimization. It is not free.
          With Hibernate, <code>readOnly</code> sets the flush mode to manual,
          so dirty entities are never flushed at commit:
        </p>
        <pre>
          <code>{`@Transactional(readOnly = true)
public Customer recordLogin(String id) {
  Customer customer = repository.findById(id).orElseThrow();
  customer.setLastLoginAt(clock.instant());  // dirty-checked...
  return customer;                           // ...never flushed, silently lost
}`}</code>
        </pre>
        <p>
          No exception, no log line, no failed request. The update simply never
          reaches the database. This one passes review precisely because
          everyone has internalized that <code>readOnly</code> is safe by
          definition. It is safe only when the method, and everything it calls,
          truly reads.
        </p>
        <p>
          My rule: <code>readOnly = true</code> is a claim about the entire
          call graph under the method, and whoever adds it owns that claim. If
          an AI added it, nobody made the claim, so verify it.
        </p>

        <h2>3. Rollback rules and checked exceptions</h2>
        <p>
          The default nobody remembers: Spring rolls back on unchecked
          exceptions only. A checked exception crossing a transactional
          boundary commits. Assistants produce this pattern a lot, because it
          looks like careful error handling:
        </p>
        <pre>
          <code>{`@Transactional
public void register(User user) throws NotificationException {
  userRepository.save(user);
  auditRepository.record(user);
  notifier.send(user);   // throws checked NotificationException
}`}</code>
        </pre>
        <p>
          If <code>notifier.send</code> fails, the exception propagates, the
          caller sees an error, and the user plus the audit row are committed
          anyway. Half the operation happened, and the system now disagrees
          with what the caller was told. The inverse trap exists too: catching
          an exception from a nested transactional call and carrying on, then
          getting an <code>UnexpectedRollbackException</code> at commit because
          the inner transaction already marked itself rollback-only.
        </p>
        <p>
          If your domain uses checked exceptions, say what you mean:{" "}
          <code>{`@Transactional(rollbackFor = Exception.class)`}</code>. Or
          keep exceptions unchecked at transaction boundaries and let the
          default do its job. Either is fine. The unstated middle is where data
          goes wrong.
        </p>

        <h2>The pattern behind all three</h2>
        <p>
          None of these are syntax errors, and none of them show up in a happy
          path test. They are all semantics of the proxy and the session,
          learned by being burned, and an assistant has never been burned. It
          learned the shape of correct Spring code, not the machinery
          underneath it.
        </p>
        <p>
          So I review generated Spring code the way I review a talented junior
          engineer's: I assume every annotation is decorative until proven
          otherwise. Two habits make that cheap. Integration tests with
          Testcontainers that assert actual database state after a failure, not
          just that a method threw. And in development, transaction interceptor
          logging turned all the way up, so the boundaries are visible instead
          of assumed:
        </p>
        <pre>
          <code>{`logging.level.org.springframework.transaction.interceptor=TRACE`}</code>
        </pre>
        <p>
          AI made me faster at writing Spring code. It also made the reviewer
          side of my job more important, not less. The tools write the happy
          path. The engineer still owns the failure modes.
        </p>
      </article>
    </main>
  );
}
