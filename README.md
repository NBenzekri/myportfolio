# nbenzekri.com

Personal site of Nouriddin Ben Zekri, senior full stack engineer (Java, Spring Boot, Kafka, React) and builder of a few products on the side.

Live at [nbenzekri.com](https://nbenzekri.com).

## Stack

Next.js (App Router) &middot; TypeScript &middot; Tailwind CSS &middot; next-intl (English and French) &middot; Vercel

## Run it

```bash
npm install
npm run dev
```

Content lives in `src/data/` (experiences, projects, blog registry) and `messages/` (UI strings per language). Blog posts are plain TSX pages under `src/app/blog/`.

## Notes

- English is served at `/`, French at `/fr`. The blog is English only.
- The contact form posts to a webhook defined by `CONTACT_WEBHOOK_URL` (see `.env.example`); without it the site falls back to a direct email link.
