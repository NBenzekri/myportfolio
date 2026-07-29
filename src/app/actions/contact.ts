"use server";

import { headers } from "next/headers";
import { validateContact } from "@/lib/contact-validation";
import { allowSubmission } from "@/lib/rate-limit";

export type ContactState = {
  status: "idle" | "sent" | "error" | "unavailable" | "rate_limited";
};

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (!allowSubmission(ip)) return { status: "rate_limited" };

  const result = validateContact({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  });

  // Bots get a polite fake success; real validation errors are caught
  // client-side by the required attributes, so a server-side failure here
  // is either a bot or a broken client.
  if (!result.ok) {
    return result.error === "bot" ? { status: "sent" } : { status: "error" };
  }

  // Fail closed: without both the URL and the secret, show the email
  // fallback instead of calling the webhook unauthenticated.
  const url = process.env.CONTACT_WEBHOOK_URL;
  const secret = process.env.PORTFOLIO_CONTACT_SECRET;
  if (!url || !secret) return { status: "unavailable" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ ...result.data, source: "nbenzekri.com" }),
    });
    return res.ok ? { status: "sent" } : { status: "error" };
  } catch {
    return { status: "error" };
  }
}
