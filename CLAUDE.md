# Profile Site — Dev Notes

## Pending fixes (from audit)

### Must fix

- [x] Add Bixlabs card (Apr 2025 – Dec 2025). ustwo (May 2026 – Present) is the only current role.
- [x] Fix TechGenies end date: "Aug 2024 - Present" → "Aug 2024 - Dec 2025"
- [x] Update years of experience: "10+" → "15+" everywhere (hero + About stat card)

### Should update

- [x] Expand experience from content/experience.ts (do not list Bixlabs twice)
- [x] Add Azure DevOps, Prisma, Fastify, Kubernetes, GitHub Actions, Playwright, Datadog to skills. Do not add Supabase.
- [x] Add AWS Bedrock to the AI skill card
- [x] Add MS SQL Server to the data skill card
- [x] Rewrite About section bio — current copy undersells seniority

### Nice to add

- [x] Mention App Store + Google Play ship in the Bixlabs card
- [x] Add industry breadth strip (AgTech, FinTech, Aviation, Media, EdTech)
- [x] Projects carousel from content/projects (Recetario, JSSI/ANTE, Uoppit!, Habiterre)
- [x] Softvision card title is "Development Team Lead" (LinkedIn company name)

## Stack

Next.js · TypeScript · Tailwind · HeroUI · Lucide icons

## Key files

- `content/` — editable copy, experience, skills, education, and one JSON file per project
- `app/page.tsx` — loads published projects and renders the page
- `components/HomePage.tsx` — section layout
- `components/ProjectCarousel.tsx` — projects carousel
- `components/ContactForm.tsx` — contact form
- `scripts/sync-projects.mjs` — import playground folders into content/projects
