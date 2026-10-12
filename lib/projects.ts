import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { Project } from "@/content/project";

const projectFileSchema = z.object({
  title: z.string().min(1),
  summary: z.string().optional().default(""),
  description: z.string().optional().default(""),
  role: z.string().optional().default(""),
  stack: z.array(z.string()).optional().default([]),
  category: z.string().optional().default(""),
  links: z
    .object({
      live: z.string().optional().default(""),
      repo: z.string().optional().default(""),
    })
    .optional()
    .default({ live: "", repo: "" }),
  image: z.string().min(1),
  imageAlt: z.string().optional().default(""),
  imagePlaceholder: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
  order: z.number(),
  published: z.boolean(),
  sourceFolder: z.string().optional(),
});

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/**
 * Read every JSON file in content/projects at build time (and on each
 * request in dev). Published entries are returned sorted by `order`.
 * This is a filesystem glob, not a hardcoded project list.
 */
export function getPublishedProjects(): Project[] {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".json"))
    .sort();

  const projects: Project[] = [];

  for (const file of files) {
    const fullPath = path.join(PROJECTS_DIR, file);
    let raw: unknown;
    try {
      raw = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    } catch (error) {
      throw new Error(`Could not parse ${file}: ${String(error)}`);
    }

    const parsed = projectFileSchema.safeParse(raw);
    if (!parsed.success) {
      throw new Error(
        `Invalid project file ${file}: ${parsed.error.issues
          .map((issue) => `${issue.path.join(".")} ${issue.message}`)
          .join("; ")}`,
      );
    }

    if (!parsed.data.published) continue;

    const data = parsed.data;
    projects.push({
      slug: file.replace(/\.json$/, ""),
      title: data.title,
      summary: data.summary,
      description: data.description,
      role: data.role,
      stack: data.stack,
      category: data.category,
      links: {
        live: data.links.live,
        repo: data.links.repo,
      },
      image: data.image,
      imageAlt: data.imageAlt,
      imagePlaceholder: data.imagePlaceholder,
      featured: data.featured,
      order: data.order,
      published: data.published,
      sourceFolder: data.sourceFolder,
    });
  }

  projects.sort(
    (a, b) => a.order - b.order || a.title.localeCompare(b.title),
  );

  return projects;
}
