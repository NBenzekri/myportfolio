"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import Section from "@/components/Section";
import { site } from "@/data/site";

const initialState: ContactState = { status: "idle" };

function DocIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

const fieldClasses =
  "w-full border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted/60 focus:border-petrol focus:outline-none focus:ring-2 focus:ring-petrol/20";

export default function Contact() {
  const t = useTranslations("contact");
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  return (
    <Section id="contact" kicker={t("kicker")} title={t("heading")} tinted>
      <p className="max-w-xl text-[15px] leading-relaxed text-ink">
        {t("lead")}
      </p>

      {state.status === "sent" ? (
        <p className="mt-8 max-w-xl border-t-2 border-petrol bg-mist p-5 text-[15px] leading-relaxed text-ink">
          {t("sent")}
        </p>
      ) : (
        <form action={formAction} className="mt-8 max-w-xl space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs font-semibold tracking-widest text-muted uppercase">
                {t("name")}
              </span>
              <input
                type="text"
                name="name"
                required
                maxLength={200}
                autoComplete="name"
                className={fieldClasses}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs font-semibold tracking-widest text-muted uppercase">
                {t("email")}
              </span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className={fieldClasses}
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block font-mono text-xs font-semibold tracking-widest text-muted uppercase">
              {t("message")}
            </span>
            <textarea
              name="message"
              required
              maxLength={5000}
              rows={5}
              className={fieldClasses}
            />
          </label>
          {/* Honeypot: humans never see it, bots fill it. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={pending}
              className="bg-petrol px-6 py-2.5 font-heading text-sm font-bold text-paper transition-colors hover:bg-petrol-2 disabled:opacity-60"
            >
              {pending ? t("sending") : t("send")}
            </button>
            {state.status === "error" ? (
              <p className="text-sm text-kicker">{t("error")}</p>
            ) : null}
            {state.status === "unavailable" ? (
              <p className="text-sm text-muted">
                {t("unavailable")}{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-petrol underline underline-offset-2"
                >
                  {site.email}
                </a>
              </p>
            ) : null}
          </div>
        </form>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <span className="font-mono text-xs font-semibold tracking-widest text-muted uppercase">
          {t("cvLabel")}
        </span>
        <a
          href="/cv/CV-Nouriddin-BEN-ZEKRI-EN.pdf"
          className="inline-flex items-center gap-2 border border-line px-4 py-2 font-heading text-sm font-bold text-petrol transition-colors hover:border-petrol"
        >
          <DocIcon />
          {t("cvEn")}
        </a>
        <a
          href="/cv/CV-Nouriddin-BEN-ZEKRI-FR.pdf"
          className="inline-flex items-center gap-2 border border-line px-4 py-2 font-heading text-sm font-bold text-petrol transition-colors hover:border-petrol"
        >
          <DocIcon />
          {t("cvFr")}
        </a>
      </div>
    </Section>
  );
}
