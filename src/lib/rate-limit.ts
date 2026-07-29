// In-memory rate limiting for the contact form. Serverless instances
// reset on cold starts, so this is best-effort: it stops naive spam
// scripts, not a determined attacker. The Resend daily quota and the
// webhook's own cap are the harder backstops.

// Global cap sits well above realistic legit traffic so a handful of
// hostile requests can't lock the form for real visitors; the webhook's
// own 10/hour send cap is what actually protects the email quota.
const IP_LIMIT = 3;
const IP_WINDOW_MS = 10 * 60 * 1000;
const GLOBAL_LIMIT = 30;
const GLOBAL_WINDOW_MS = 60 * 60 * 1000;
const MAX_TRACKED_IPS = 1000;

const ipHits = new Map<string, number[]>();
let globalHits: number[] = [];

export function allowSubmission(ip: string, now: number = Date.now()): boolean {
  globalHits = globalHits.filter((t) => now - t < GLOBAL_WINDOW_MS);
  if (globalHits.length >= GLOBAL_LIMIT) return false;

  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < IP_WINDOW_MS);
  if (hits.length >= IP_LIMIT) return false;

  if (ipHits.size >= MAX_TRACKED_IPS && !ipHits.has(ip)) {
    for (const [key, times] of ipHits) {
      if (times.every((t) => now - t >= IP_WINDOW_MS)) ipHits.delete(key);
    }
  }

  hits.push(now);
  ipHits.set(ip, hits);
  globalHits.push(now);
  return true;
}

export function resetRateLimits(): void {
  ipHits.clear();
  globalHits = [];
}
