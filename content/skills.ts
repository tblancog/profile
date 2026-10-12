export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "PHP", "Python", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Vue", "Angular", "Tailwind CSS", "TanStack"],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Fastify",
      "NestJS",
      "Express",
      "Laravel",
      "REST",
      "GraphQL",
    ],
  },
  {
    title: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    title: "Data",
    items: [
      "PostgreSQL",
      "MySQL",
      "MS SQL Server",
      "Prisma",
      "Sequelize",
      "Redis",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS (S3, SES, Lambda, Bedrock)",
      "Azure DevOps",
      "GCP",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Datadog",
      "Vercel",
    ],
  },
  {
    title: "Testing",
    items: ["Playwright", "Jest", "React Testing Library"],
  },
  {
    title: "AI & agentic",
    items: [
      "Cursor",
      "Claude Code",
      "ChatGPT",
      "Gemini",
      "AWS Bedrock",
      "LLM integration",
    ],
  },
];
