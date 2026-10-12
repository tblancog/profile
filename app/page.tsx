import { HomePage } from "@/components/HomePage";
import { getPublishedProjects } from "@/lib/projects";

export default function Page() {
  const projects = getPublishedProjects();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || undefined;
  return <HomePage projects={projects} turnstileSiteKey={turnstileSiteKey} />;
}
