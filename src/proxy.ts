import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Locale routing for everything except API routes, the English-only blog,
  // the RSS feed, Next.js internals and static files.
  matcher: "/((?!api|blog|feed\\.xml|_next|_vercel|.*\\..*).*)",
};
