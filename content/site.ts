/**
 * Site-wide copy. Edit this file to change the headline, bio, contact
 * details, availability, and the US time-zone explanation.
 *
 * Positioning phrase, used in the hero, footer, page title, meta, OG alt,
 * and JSON-LD jobTitle: "Senior Full-Stack Engineer who builds with AI".
 */

export const site = {
  name: "Tony Blanco",
  positioning: "Senior Full-Stack Engineer who builds with AI",
  tagline:
    "React, Next.js, TypeScript and Node.js, with agentic development (Cursor, Claude Code) from design to production.",
  metaTitle:
    "Tony Blanco – Senior Full-Stack Engineer who builds with AI | React, Next.js, Node.js",
  metaDescription:
    "Senior Full-Stack Engineer who builds with AI. 15+ years shipping production web and mobile products with React, Next.js, TypeScript, and Node.js. Remote from Buenos Aires. Open to senior contract and full-time roles.",
  locationLabel: "Buenos Aires, Argentina · Remote",
  availabilityBadge: "Open to senior remote contract and full-time roles",
  availability:
    "Open to senior remote contract work and full-time remote roles.",
  currentRole: "Current role: Platform Engineer at usTwo (NFL Minigames).",
  email: "tblancog@gmail.com",
  linkedin: "https://www.linkedin.com/in/tblancog/",
  github: "https://github.com/tblancog",
  calendly: "https://calendly.com/tblancog/1-hour-meeting",
  avatar: "/assets/avatar.jpg",
  employer: "usTwo",
  url: "https://tonyblanco.dev",
  bio: [
    "Senior full-stack engineer with 15+ years shipping production web and mobile products for US teams, remotely from Buenos Aires. Core stack: React, Next.js, TypeScript, and Node.js. I use AI from design through production and own the full delivery cycle.",
  ],
  industries: [
    "AgTech",
    "FinTech",
    "Aviation",
    "Media & Streaming",
    "Hospitality",
    "EdTech",
    "Telecom",
  ],
  highlights: [
    { value: "15+", label: "Years Experience" },
    { value: "C1", label: "English" },
    { value: "1–2h", label: "Ahead of New York" },
    { value: "Remote", label: "Contract and full-time" },
  ],
  keywords: [
    "Senior Full-Stack Engineer",
    "Senior Full-Stack Engineer who builds with AI",
    "React Developer",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Fastify",
    "React Native",
    "AWS",
    "Kubernetes",
    "GitHub Actions",
    "Playwright",
    "Claude Code",
    "Agentic Development",
    "Remote Developer",
    "Argentina Developer",
    "PostgreSQL",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Fastify",
    "PostgreSQL",
    "React Native",
    "AWS",
    "Kubernetes",
    "Playwright",
    "Claude Code",
    "AWS Bedrock",
  ],
  heroDescription:
    "15+ years shipping production web and mobile products with React, Next.js, and Node.js. AI is part of how I ship.",
  skillsIntro: "A toolkit built across 15+ years of production work.",
  contactIntro:
    "I'm open to senior remote contract work and full-time remote roles. Tell me about the product and how I can help ship it.",
  timezone: {
    eyebrow: "STRATEGIC ADVANTAGE",
    heading: "Real-Time Collaboration for US Clients",
    intro:
      "Based in Buenos Aires (UTC−3): 1 hour ahead of New York during US daylight time, and 2 hours ahead otherwise.",
    cards: [
      {
        title: "Overlapping Hours",
        body: "Buenos Aires is 1 hour ahead of New York during US daylight time and 2 hours ahead otherwise. 2 PM in Buenos Aires is 1 PM in New York while the US is on daylight time, and 12 PM otherwise, so most of a US Eastern workday overlaps.",
      },
      {
        title: "Real-Time Communication",
        body: "US Eastern business hours land in the Buenos Aires workday, so standups, reviews, and decisions happen live instead of overnight.",
      },
      {
        title: "Faster Turnaround",
        body: "Same-day iterations with US teams. The offset stays at one or two hours all year, so feedback does not wait on a large timezone gap.",
      },
    ],
  },
} as const;
