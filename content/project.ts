export interface ProjectLinks {
  live: string;
  repo: string;
}

/**
 * One record per file in content/projects/. The carousel renders files
 * with published: true, sorted by order.
 *
 * image should stay "/projects/placeholder.svg" until a real file is added
 * under public/projects/. Set imagePlaceholder to false when you do.
 * scripts/sync-projects.mjs will not overwrite an image value that is set.
 */
export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  stack: string[];
  category: string;
  links: ProjectLinks;
  image: string;
  imageAlt: string;
  imagePlaceholder: boolean;
  featured: boolean;
  order: number;
  published: boolean;
  sourceFolder?: string;
}
