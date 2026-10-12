/**
 * Work history, newest first.
 *
 * usTwo (May 2026 – Present) is the only current role.
 * Bixlabs (Apr 2025 – Dec 2025) and TechGenies (Aug 2024 – Dec 2025)
 * overlapped because they were concurrent contracts.
 */

export interface ExperienceRole {
  id: string;
  title: string;
  company: string;
  dates: string;
  location: string;
  current: boolean;
  bullets: string[];
  tags: string[];
  monogram: string;
}

export interface EarlierRole {
  label: string;
  detail: string;
}

export const roles: ExperienceRole[] = [
  {
    id: "ustwo",
    title: "Platform Engineer",
    company: "usTwo",
    dates: "May 2026 – Present",
    location: "Remote",
    current: true,
    monogram: "U",
    bullets: [
      "Architected and built the backend for NFL Minigames, a consumer gaming platform shipped in beta to ~5% of the NFL user base, as the primary backend engineer.",
      "Expanded into frontend and DevOps as the team shrank, keeping the full delivery pipeline running.",
      "Took features from Figma to production with agentic tools (Cursor, Claude Code, ChatGPT) for code, tests and UI.",
    ],
    tags: [
      "Node.js",
      "Fastify",
      "PostgreSQL",
      "Next.js",
      "AWS",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Datadog",
      "Playwright",
    ],
  },
  {
    id: "bix-labs",
    title: "Full Stack Engineer",
    company: "Bixlabs",
    dates: "Apr 2025 – Dec 2025",
    location: "Montevideo, Uruguay · Remote",
    current: false,
    monogram: "B",
    bullets: [
      "Built Uoppit!, a merchant deals app for São Paulo, from scratch with Expo and React Native and released it on the App Store and Google Play.",
      "Built the frontend for JSSI/ANTE, an aircraft maintenance scheduler using Bryntum, over an MS SQL Server backend on Azure DevOps.",
      "Created ProjectHub, an internal analytics and project management tool built with NestJS and Vue, including its CI/CD pipeline.",
    ],
    tags: [
      "React Native",
      "Expo",
      "React",
      "TanStack",
      "NestJS",
      "Vue",
      "MS SQL Server",
      "Azure DevOps",
    ],
  },
  {
    id: "techgenies",
    title: "Senior Software Developer",
    company: "TechGenies",
    dates: "Aug 2024 – Dec 2025",
    location: "Dallas, TX, USA · Remote",
    current: false,
    monogram: "T",
    bullets: [
      "Delivered features, bug fixes and performance work on Sharpr, an enterprise research platform.",
      "Migrated the frontend incrementally from AngularJS/CakePHP toward React while keeping backward compatibility.",
      "Integrated AWS Bedrock AI into content analysis and research workflows.",
    ],
    tags: ["React", "AngularJS", "CakePHP", "PostgreSQL", "AWS Bedrock"],
  },
  {
    id: "soul-refiner",
    title: "Software Engineer",
    company: "Soul Refiner",
    dates: "Apr 2024 – Jul 2024",
    location: "Florida, USA · Remote",
    current: false,
    monogram: "S",
    bullets: [
      "Built full-stack features for a discipleship video streaming platform, covering content delivery and user management.",
      "Set up an AI-assisted workflow with ChatGPT for docs, brainstorming and code generation.",
    ],
    tags: [
      "Node.js",
      "Express",
      "Sequelize",
      "React",
      "Next.js",
      "PostgreSQL",
      "AWS",
    ],
  },
  {
    id: "optic-power",
    title: "Full Stack Engineer",
    company: "Code Power",
    dates: "Oct 2022 – Jan 2024",
    location: "Belgrade, Serbia · Remote",
    current: false,
    monogram: "C",
    bullets: [
      "Built Habiterre, an AgTech farmer-tracking platform, from scratch, with Mapbox GL maps, dashboards and unit tests.",
      "Led the final delivery of Fambiz (Build.org), a gamified entrepreneurship simulator, including client demos and release milestones.",
    ],
    tags: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Chakra UI",
      "Mapbox GL",
      "Prisma",
      "GitHub Actions",
    ],
  },
  {
    id: "southern-code",
    title: "Full Stack Engineer",
    company: "Southern Code",
    dates: "Jan 2022 – Oct 2022",
    location: "USA · Remote",
    current: false,
    monogram: "S",
    bullets: [
      "Delivered features, code reviews and sustainment for the Holiday Inn Club Vacations booking platform, working with stakeholders in Austin.",
      "Worked on package discovery, filtering, checkout and search performance (indexing and caching).",
    ],
    tags: ["Next.js", "React", "Node.js", "Docker", "NGINX", "WordPress REST", "AWS"],
  },
  {
    id: "lucky-financial",
    title: "Full Stack Developer",
    company: "Lucky Financial",
    dates: "Mar 2021 – Dec 2021",
    location: "Cairo, Egypt · Remote",
    current: false,
    monogram: "L",
    bullets: [
      "Built the web channel for a FinTech consumer discounts app serving Egypt and Morocco.",
      "Implemented NestJS microservices and a React frontend, including multi-currency payments.",
    ],
    tags: ["React", "Next.js", "NestJS", "MS SQL Server", "Azure"],
  },
  {
    id: "cognizant",
    title: "Development Team Lead",
    company: "Softvision",
    dates: "Mar 2019 – Mar 2021",
    location: "Buenos Aires · Hybrid",
    current: false,
    monogram: "C",
    bullets: [
      "Led the frontend re-architecture of the corporate website (Next.js, Node.js, WordPress integrations on AWS).",
      "Led a team building the Skills Matrix SPA for new-hire onboarding, built from scratch.",
      "Contributed to Game of Pods, an internal gamification platform (Angular, PostgreSQL, GCP).",
    ],
    tags: [
      "Next.js",
      "React",
      "Angular",
      "Node.js",
      "Docker",
      "PostgreSQL",
      "MySQL",
      "AWS",
      "GCP",
    ],
  },
  {
    id: "wimet",
    title: "Lead Developer",
    company: "Wimet",
    dates: "Aug 2018 – Mar 2019",
    location: "Buenos Aires · On-site",
    current: false,
    monogram: "W",
    bullets: [
      "Built and launched a marketplace for meeting, event and film-shoot spaces.",
      "Led a second developer through the feature expansion.",
    ],
    tags: ["Vue", "Laravel", "Node.js", "MySQL", "AWS Elastic Beanstalk"],
  },
];

export const earlierRoles: EarlierRole[] = [
  {
    label: "Logan",
    detail:
      "Backend Developer (2018). Sole developer on a PHP ad server; Redis, AWS EC2.",
  },
  {
    label: "Cablevisión (Fibertel/Flow)",
    detail:
      "Migrated SOAP services to REST with Angular and Vue frontends (2015 – 2017).",
  },
  {
    label: "Softclear",
    detail:
      "Project Lead on Symfony, CakePHP and WordPress projects in Venezuela (2012 – 2015).",
  },
  {
    label: "PDVSA",
    detail: "PHP development for Venezuela's state oil company (2007 – 2009).",
  },
  {
    label: "Telecomsoft",
    detail:
      "PHP and PostgreSQL work, including an aircraft fuel dispatch system (2006 – 2007).",
  },
];

export const earlierRange = "2006 – 2018";
