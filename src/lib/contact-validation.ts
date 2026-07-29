export type ContactInput = {
  name: string;
  email: string;
  message: string;
  website: string;
};

export type ContactValidation =
  | { ok: true; data: { name: string; email: string; message: string } }
  | { ok: false; error: "invalid_email" | "missing_fields" | "too_long" | "bot" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: ContactInput): ContactValidation {
  if (input.website.trim() !== "") return { ok: false, error: "bot" };

  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name || !email || !message) return { ok: false, error: "missing_fields" };
  if (name.length > 200 || email.length > 254 || message.length > 5000)
    return { ok: false, error: "too_long" };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "invalid_email" };

  return { ok: true, data: { name, email, message } };
}
