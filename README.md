# Tony Blanco — Portfolio

Next.js site for Tony Blanco, a senior full-stack engineer. Visual layout stays in the React components. Copy and projects live in `content/` so they can be edited without rewriting the page.

## Edit site content

| File | What it controls |
| --- | --- |
| `content/site.ts` | Positioning, hero, bio, availability, contact, industries, highlights, time-zone copy, and the meta description |
| `content/experience.ts` | Roles, bullets, and tags. `featuredRoleCount` is how many render as full cards (usTwo first). The rest, plus earlier roles, render as collaboration cards. usTwo is the only role with `current: true` |
| `content/skills.ts` | Skill groups and chips |
| `content/education.ts` | Degrees, certifications, and spoken languages |
| `content/projects/*.json` | One file per project for the carousel |

usTwo (May 2026 – Present) is the only current role, and it is the first experience card. Bixlabs (Apr 2025 – Dec 2025) and TechGenies (Aug 2024 – Dec 2025) overlapped because they were concurrent contracts. LinkedIn wins on titles, company names, and dates.

`pnpm dev` picks up content edits. A production build bakes published projects in at build time.

## Projects carousel

`lib/projects.ts` reads every `content/projects/*.json` file when the page renders. It does not use a hardcoded project array. Entries with `published: true` are shown, sorted by `order`.

Each file has:

- `title`, `summary`, `description`, `role`
- `stack` (array of strings)
- `category`
- `links.live`, `links.repo` (use a full `https://` URL, or leave the string empty)
- `image`, `imageAlt`, `imagePlaceholder`
- `featured`, `order`, `published`
- `sourceFolder` (optional; lets `pnpm sync:projects` update this file from a playground folder with a different name)

To add a project by hand, copy an existing JSON file, give it a new filename, and set `published` and `order`.

Unpublished files stay in the folder and are not rendered. Company-named and interview-exercise folders from the local playground are seeded with `published: false`. The `profile` folder is this site and is not a project.

## Swap a project image

Real screenshots are not in the repo. Every project points at the shared placeholder:

`public/projects/placeholder.svg` (dark `#0A0F14`, gold `#FFD700`). The carousel draws the project title on top of it and shows a “PLACEHOLDER IMAGE” label while `imagePlaceholder` is true.

To use a real image on one project:

1. Add the file under `public/projects/`, for example `public/projects/recetario.png`.
2. In that project’s JSON, set `image` to `/projects/recetario.png`.
3. Set `imageAlt` to a short description of the screenshot.
4. Set `imagePlaceholder` to `false`.

`pnpm sync:projects` never overwrites an `image` value that is already set, including the placeholder path. After you change `image`, later sync runs leave it alone.

## Sync projects from a playground folder

From the repository root:

```bash
pnpm sync:projects --source ~/Code/playground
```

The script scans each subfolder and reads only:

- `README.md` (title and opening paragraphs)
- `package.json` (`name`, `description`, `homepage`)
- the `origin` git remote

It creates or updates one file in `content/projects/`. A playground folder named `prescription2` updates `recetario.json` because that file sets `sourceFolder` to `prescription2`.

It does not overwrite hand-edited fields. A field is hand-edited when it already has text that this script did not write. The script remembers what it last wrote under a `sync` key. Clear a field (set it back to `""`) if you want the next run to fill it from the folder again.

New files default to `published: false`. These folders are forced to stay unpublished: `wizdaa`, `wizdaa2`, `g2i`, `epam`, `telus`, `telus-plan`, `telus-practice`, `disney`, `aws-practice`, `tanstack`, `ztm`, `ztm-node`, `taller`, `dev-workflow`, `claude-code`, `opencode`.

The script never reads or copies `.env*`, `*.session`, database files, `node_modules`, or `.next`. It skips a folder named `profile`.

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm sync:projects --source ~/Code/playground
```
