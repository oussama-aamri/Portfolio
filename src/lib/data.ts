import { ProjectWithMedia } from '@/types/database.types';
import localProjects from '@/data/projects.json';

// Cast the imported JSON to the appropriate typescript model
const projects = localProjects as ProjectWithMedia[];

export async function getFeaturedProjects(): Promise<ProjectWithMedia[]> {
  try {
    return projects
      .filter(p => p.featured)
      .sort((a, b) => a.sort_order - b.sort_order);
  } catch (err) {
    console.error('Error fetching featured projects:', err);
    return [];
  }
}

export async function getAllProjects(): Promise<ProjectWithMedia[]> {
  try {
    return [...projects].sort((a, b) => {
      // Sort by sort_order ascending
      if (a.sort_order !== b.sort_order) {
        return a.sort_order - b.sort_order;
      }
      // Fallback to created_at date descending
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  } catch (err) {
    console.error('Error fetching all projects:', err);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithMedia | null> {
  try {
    const project = projects.find(p => p.slug === slug);
    if (!project) return null;

    // Create a deep copy to avoid mutations affecting cached module state
    const projectCopy = JSON.parse(JSON.stringify(project)) as ProjectWithMedia;

    if (projectCopy.project_media && Array.isArray(projectCopy.project_media)) {
      projectCopy.project_media.sort((a, b) => a.position - b.position);
    }

    return projectCopy;
  } catch (err) {
    console.error(`Error fetching project by slug "${slug}":`, err);
    return null;
  }
}
