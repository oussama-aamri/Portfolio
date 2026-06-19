export type ProjectCategory = 'logo' | 'flyer' | 'instagram' | 'website' | 'video';
export type MediaType = 'image' | 'video';

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: ProjectCategory;
          description: string | null;
          tools: string[];
          live_url: string | null;
          featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          category: ProjectCategory;
          description?: string | null;
          tools?: string[];
          live_url?: string | null;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          category?: ProjectCategory;
          description?: string | null;
          tools?: string[];
          live_url?: string | null;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      project_media: {
        Row: {
          id: string;
          project_id: string;
          media_type: MediaType;
          storage_path: string;
          position: number;
        };
        Insert: {
          id?: string;
          project_id: string;
          media_type: MediaType;
          storage_path: string;
          position?: number;
        };
        Update: {
          id?: string;
          project_id?: string;
          media_type?: MediaType;
          storage_path?: string;
          position?: number;
        };
      };
    };
  };
}

export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectMedia = Database['public']['Tables']['project_media']['Row'];

export interface ProjectWithMedia extends Project {
  project_media: ProjectMedia[];
}
