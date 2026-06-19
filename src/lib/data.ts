import { supabase } from './supabase';
import { ProjectWithMedia } from '@/types/database.types';

export async function getFeaturedProjects(): Promise<ProjectWithMedia[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*, project_media(*)')
      .eq('featured', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }

    return (data as ProjectWithMedia[]) || [];
  } catch (err) {
    console.error('Database connection error in getFeaturedProjects:', err);
    return [];
  }
}

export async function getAllProjects(): Promise<ProjectWithMedia[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*, project_media(*)')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return (data as ProjectWithMedia[]) || [];
  } catch (err) {
    console.error('Database connection error in getAllProjects:', err);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithMedia | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*, project_media(*)')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching project by slug "${slug}":`, error);
      return null;
    }

    const projectData = data as unknown as ProjectWithMedia;
    // Sort project media by position
    if (projectData && projectData.project_media && Array.isArray(projectData.project_media)) {
      projectData.project_media.sort((a: { position: number }, b: { position: number }) => a.position - b.position);
    }

    return projectData || null;
  } catch (err) {
    console.error(`Database connection error in getProjectBySlug for "${slug}":`, err);
    return null;
  }
}
