import { HomePage } from "@/components/HomePage";
import { getPublishedProjects } from "@/lib/projects";

export default function Page() {
  const projects = getPublishedProjects();
  return <HomePage projects={projects} />;
}
