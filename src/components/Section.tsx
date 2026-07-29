export default function Section({
  id,
  kicker,
  title,
  children,
  tinted = false,
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
  tinted?: boolean;
}) {
  return (
    <section id={id} className={`scroll-mt-16 ${tinted ? "bg-mist" : ""}`}>
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-kicker">
          {kicker}
        </p>
        <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-title">
          {title}
          <span className="text-flame">.</span>
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
