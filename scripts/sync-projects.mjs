#!/usr/bin/env node
/**
 * Create or update content/projects/<slug>.json from a local playground folder.
 *
 *   pnpm sync:projects --source ~/Code/playground
 *
 * For each subfolder, reads only:
 *   - README.md
 *   - package.json (name, description, homepage)
 *   - git remote (origin)
 *
 * Never reads or copies .env*, *.session, database files, node_modules, or .next.
 * Skips the "profile" folder (this portfolio site).
 *
 * Hand-edited fields are preserved. A field counts as hand-edited when it
 * already has a value this script did not write (tracked under "sync").
 * An image value that is already set is never overwritten.
 *
 * New projects default to published: false. Company-named and
 * interview/practice folders are forced to stay unpublished.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PLACEHOLDER_IMAGE = "/projects/placeholder.svg";

const SKIP_DIRS = new Set(["profile", "node_modules", ".next", ".git"]);

/** Folders that must stay unpublished even if a file already exists. */
const KEEP_UNPUBLISHED = new Set([
  "wizdaa",
  "wizdaa2",
  "g2i",
  "epam",
  "telus",
  "telus-plan",
  "telus-practice",
  "disney",
  "aws-practice",
  "tanstack",
  "ztm",
  "ztm-node",
  "taller",
  "dev-workflow",
  "claude-code",
  "opencode",
]);

const UNSAFE_NAME =
  /(^\.env(\.|$))|(\.session$)|(\.(db|sqlite|sqlite3)$)|(^node_modules$)|(^\.next$)/i;

function usage() {
  console.error("Usage: pnpm sync:projects --source <playground-dir>");
  process.exit(1);
}

function parseSource() {
  const args = process.argv.slice(2);
  let source;
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === "--source") source = args[i + 1];
    else if (args[i].startsWith("--source=")) source = args[i].slice("--source=".length);
  }
  if (!source) usage();
  return path.resolve(source);
}

function isUnsafeName(name) {
  return UNSAFE_NAME.test(name) || name.startsWith(".env");
}

function assertSafePath(filePath) {
  const base = path.basename(filePath);
  if (isUnsafeName(base)) {
    throw new Error(`Refusing to read ${filePath}`);
  }
}

function pathIsUnsafe(filePath) {
  const parts = filePath.split(path.sep);
  return parts.some(
    (part) =>
      part === "node_modules" || part === ".next" || isUnsafeName(part),
  );
}

function readTextIfSafe(filePath) {
  assertSafePath(filePath);
  if (!fs.existsSync(filePath)) return "";
  const real = fs.realpathSync(filePath);
  if (pathIsUnsafe(real)) {
    throw new Error(`Refusing to read ${filePath}`);
  }
  const stat = fs.statSync(real);
  if (!stat.isFile()) return "";
  return fs.readFileSync(real, "utf8");
}

function readPackage(dir) {
  const filePath = path.join(dir, "package.json");
  const text = readTextIfSafe(filePath);
  if (!text) return {};
  try {
    const pkg = JSON.parse(text);
    return {
      name: typeof pkg.name === "string" ? pkg.name : "",
      description: typeof pkg.description === "string" ? pkg.description : "",
      homepage: typeof pkg.homepage === "string" ? pkg.homepage : "",
    };
  } catch {
    console.warn(`Skipping unreadable package.json in ${path.basename(dir)}`);
    return {};
  }
}

function parseReadme(text) {
  if (!text) return { title: "", paragraphs: [] };
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let title = "";
  const paragraphs = [];
  let buffer = [];
  let inFence = false;

  const flush = () => {
    const paragraph = buffer.join(" ").replace(/\s+/g, " ").trim();
    buffer = [];
    if (paragraph) paragraphs.push(paragraph);
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      flush();
      continue;
    }
    if (inFence) continue;

    const heading = line.match(/^#\s+(.+)/);
    if (heading && !title) {
      flush();
      title = heading[1].replace(/[#*`]/g, "").trim();
      continue;
    }
    if (!line.trim() || /^#{1,6}\s/.test(line)) {
      flush();
      continue;
    }
    buffer.push(line.trim());
  }
  flush();
  return { title, paragraphs };
}

function prettify(name) {
  if (!name) return "";
  const cleaned = name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function toHttps(remote) {
  if (!remote) return "";
  const trimmed = remote.trim();
  const ssh = trimmed.match(/^git@([^:]+):(.+)$/);
  if (ssh) {
    return `https://${ssh[1]}/${ssh[2].replace(/\.git$/, "")}`;
  }
  // Drop userinfo so a credential embedded in a remote URL is never written.
  const withoutCreds = trimmed.replace(
    /^([a-z][a-z0-9+.-]*:\/\/)[^/@\s]+@/i,
    "$1",
  );
  const https = withoutCreds.match(/^(https?:\/\/[^/\s]+)\/(.+)$/);
  if (https) {
    return `${https[1]}/${https[2].replace(/\.git$/, "")}`;
  }
  return "";
}

function gitRemote(dir) {
  try {
    // `git config --get` returns the stored URL. `remote get-url` can rewrite
    // it through insteadOf and include credentials.
    const url = execFileSync(
      "git",
      ["-C", dir, "config", "--get", "remote.origin.url"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    return toHttps(url);
  } catch {
    return "";
  }
}

function clip(text, max) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function listProjectFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.join(dir, file));
}

function findExisting(projectsDir, folder, repoUrl) {
  const files = listProjectFiles(projectsDir);
  for (const filePath of files) {
    const data = readJson(filePath);
    if (data.sourceFolder === folder) return { filePath, data };
  }
  const byName = path.join(projectsDir, `${folder}.json`);
  if (fs.existsSync(byName)) return { filePath: byName, data: readJson(byName) };

  if (repoUrl) {
    for (const filePath of files) {
      const data = readJson(filePath);
      const repo = data.links?.repo;
      if (typeof repo === "string" && repo && repo === repoUrl) {
        return { filePath, data };
      }
    }
  }
  return null;
}

function nextOrder(projectsDir) {
  let max = 100;
  for (const filePath of listProjectFiles(projectsDir)) {
    const data = readJson(filePath);
    if (typeof data.order === "number" && data.order >= max) max = data.order + 1;
  }
  return max;
}

let orderCursor = null;

function takeOrder(projectsDir) {
  if (orderCursor == null) orderCursor = nextOrder(projectsDir);
  const value = orderCursor;
  orderCursor += 1;
  return value;
}

/**
 * A non-empty value with no matching sync snapshot was written by hand.
 * Empty values can be filled. Values equal to the last synced snapshot
 * are still owned by this script and may be refreshed.
 */
function isHandEdited(snapshot, current) {
  const value = current ?? "";
  if (value === "") return false;
  if (snapshot == null || snapshot === "") return true;
  return snapshot !== value;
}

function assignManaged(project, key, derived) {
  const snapshotRoot = project.sync && typeof project.sync === "object" ? project.sync : {};
  const current = project[key] ?? "";
  if (!derived) return;
  if (isHandEdited(snapshotRoot[key], current)) return;
  project[key] = derived;
  project.sync = snapshotRoot;
  project.sync[key] = derived;
}

function assignLink(project, key, derived) {
  if (!project.links || typeof project.links !== "object") {
    project.links = { live: "", repo: "" };
  }
  const current = project.links[key] ?? "";
  if (!derived) return;
  const snapshot = project.sync?.links?.[key];
  if (isHandEdited(snapshot, current)) return;
  if (!project.sync || typeof project.sync !== "object") project.sync = {};
  if (!project.sync.links || typeof project.sync.links !== "object") {
    project.sync.links = {};
  }
  project.links[key] = derived;
  project.sync.links[key] = derived;
}

function placeholderAlt(title) {
  return `Placeholder image for ${title}. Replace with a file in public/projects/.`;
}

function applyImage(project, title) {
  if (typeof project.image === "string" && project.image.trim()) {
    return;
  }
  project.image = PLACEHOLDER_IMAGE;
  if (!project.imageAlt) project.imageAlt = placeholderAlt(title);
  if (typeof project.imagePlaceholder !== "boolean") project.imagePlaceholder = true;
}

function syncFolder(folder, sourceDir, projectsDir) {
  const dir = path.join(sourceDir, folder);
  const readme = parseReadme(readTextIfSafe(path.join(dir, "README.md")));
  const pkg = readPackage(dir);
  const repo = gitRemote(dir);
  const live = pkg.homepage || "";
  const title = readme.title || prettify(pkg.name) || prettify(folder);
  const summary = pkg.description || readme.paragraphs[0] || "";
  const description = clip(readme.paragraphs.slice(0, 3).join("\n\n"), 800);

  const existing = findExisting(projectsDir, folder, repo);
  const before = existing ? JSON.stringify(existing.data) : null;
  const project = existing
    ? structuredClone(existing.data)
    : {
        title: "",
        summary: "",
        description: "",
        role: "",
        stack: [],
        category: "",
        links: { live: "", repo: "" },
        image: "",
        imageAlt: "",
        imagePlaceholder: true,
        featured: false,
        order: takeOrder(projectsDir),
        published: false,
        sourceFolder: folder,
      };
  const filePath = existing
    ? existing.filePath
    : path.join(projectsDir, `${folder}.json`);

  assignManaged(project, "title", title);
  if (!project.title) project.title = prettify(folder) || folder;
  assignManaged(project, "summary", summary);
  if (typeof project.summary !== "string") project.summary = "";
  assignManaged(project, "description", description);
  if (typeof project.description !== "string") project.description = "";

  if (typeof project.role !== "string") project.role = "";
  if (!Array.isArray(project.stack)) project.stack = [];
  if (typeof project.category !== "string") project.category = "";
  if (typeof project.featured !== "boolean") project.featured = false;
  if (typeof project.order !== "number") project.order = takeOrder(projectsDir);

  assignLink(project, "live", live);
  assignLink(project, "repo", repo);
  if (typeof project.links.live !== "string") project.links.live = "";
  if (typeof project.links.repo !== "string") project.links.repo = "";

  applyImage(project, project.title);

  if (KEEP_UNPUBLISHED.has(folder)) {
    project.published = false;
  } else if (typeof project.published !== "boolean") {
    project.published = false;
  }

  project.sourceFolder = folder;

  const after = JSON.stringify(project);
  if (before !== after) {
    fs.writeFileSync(filePath, `${JSON.stringify(project, null, 2)}\n`);
  }

  const action = existing ? (before === after ? "unchanged" : "updated") : "created";
  const publishedNote = project.published ? "published" : "unpublished";
  console.log(`${action} ${path.basename(filePath)} (${publishedNote}) from ${folder}`);
}

function main() {
  const sourceDir = parseSource();
  if (isUnsafeName(path.basename(sourceDir))) {
    console.error("Refusing to read env files, session files, or databases.");
    process.exit(1);
  }
  if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
    console.error(`Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const projectsDir = path.join(process.cwd(), "content", "projects");
  if (!fs.existsSync(projectsDir)) {
    console.error(`Missing ${projectsDir}. Run this from the repository root.`);
    process.exit(1);
  }

  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith(".")) continue;
    if (SKIP_DIRS.has(entry.name) || isUnsafeName(entry.name)) {
      console.log(`skipped ${entry.name}`);
      continue;
    }
    try {
      syncFolder(entry.name, sourceDir, projectsDir);
    } catch (error) {
      console.error(
        `skipped ${entry.name}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}

main();
