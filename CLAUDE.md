# Profile Site — Dev Notes

## Pending fixes (from audit)

### Must fix

- [x] Add Bixlabs card as first Experience entry (Apr 2025 – Feb 2026)
- [x] Fix TechGenies end date: "Aug 2024 - Present" → "Aug 2024 - Dec 2025"
- [x] Update years of experience: "10+" → "15+" everywhere (hero + About stat card)

### Should update

- [x] Add Bixlabs to "Also collaborated with" strip
- [x] Add Azure DevOps, Prisma, Supabase to Skills section
- [x] Add AWS Bedrock to AI & LLMs skill card
- [x] Add MS SQL Server to Database & ORM card
- [x] Rewrite About section bio — current copy undersells seniority

### Nice to add

- [x] Mention App Store + Google Play ship in Bixlabs card or hero
- [ ] Add industry breadth strip (AgTech, FinTech, Aviation, Media, EdTech)
- [x] Audit Portfolio component — ensure JSSI, Uoppa, Habiterre are showcased
- [x] Update Cognizant card title to "Development Team Lead"

## Stack

Next.js · TypeScript · Tailwind · HeroUI · Lucide icons

## Key files

- `app/page.tsx` — all sections live here (Hero, About, Skills, Experience, Education, Contact)
- `components/Portfolio.tsx` — portfolio cards
- `components/ContactForm.tsx` — contact form
