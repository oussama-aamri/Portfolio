import Link from 'next/link';
import { getProjectBySlug } from '@/lib/data';
import { getMediaPublicUrl } from '@/lib/supabase';
import LightboxImage from '@/components/LightboxImage';
import BrowserFrame from '@/components/BrowserFrame';
import { CATEGORY_LABELS } from '@/components/ProjectCard';
import { ArrowLeft, ExternalLink, ShieldAlert, Cpu } from 'lucide-react';
import { ProjectWithMedia } from '@/types/database.types';

interface PageProps {
  params: {
    slug: string;
  };
}

// Fallback project details matching the work hub page templates
const FALLBACK_PROJECTS: Record<string, ProjectWithMedia> = {
  'aetheria-cloud-identity': {
    id: 'placeholder-1',
    title: 'Aetheria Cloud Identity',
    slug: 'aetheria-cloud-identity',
    category: 'logo',
    description: 'Aetheria Cloud Workspace requested a visual identity that conveys security, lightweight modern workflows, and cloud-first collaboration. The solution leverages a custom geometric logo mark with subtle transparency layers and a bright electric blue/purple palette, creating a memorable icon across app shortcuts and physical assets.',
    tools: ['Adobe Illustrator', 'Vector Design', 'Figma'],
    live_url: null,
    featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    project_media: [
      { id: 'pm-1', project_id: 'placeholder-1', media_type: 'image', storage_path: 'logo/placeholder_1.png', position: 0 }
    ]
  },
  'veloce-fintech-brand-book': {
    id: 'placeholder-2',
    title: 'Veloce FinTech Brand Book',
    slug: 'veloce-fintech-brand-book',
    category: 'logo',
    description: 'The Veloce Brand System establishes the foundation for corporate design guidelines. It outlines brand color theory, custom type hierarchy, UI spacing tokens, and acceptable logo variations. Designed to ensure consistency across web, social media channels, and client-facing document layouts.',
    tools: ['Adobe Illustrator', 'InDesign'],
    live_url: null,
    featured: false,
    sort_order: 2,
    created_at: new Date().toISOString(),
    project_media: [
      { id: 'pm-2', project_id: 'placeholder-2', media_type: 'image', storage_path: 'logo/placeholder_2.png', position: 0 }
    ]
  },
  'lumina-event-flyer': {
    id: 'placeholder-3',
    title: 'Lumina Event Flyer',
    slug: 'lumina-event-flyer',
    category: 'flyer',
    description: 'A layout exercise focusing on typographic contrast, grids, and minimal content density. Designed for the Lumina Interactive Arts festival in London, using custom sans-serif fonts combined with abstract geometric line art to reflect the intersection of digital technology and physical sound design.',
    tools: ['InDesign', 'Illustrator', 'Adobe Fonts'],
    live_url: null,
    featured: false,
    sort_order: 3,
    created_at: new Date().toISOString(),
    project_media: [
      { id: 'pm-3', project_id: 'placeholder-3', media_type: 'image', storage_path: 'flyer/placeholder_3.png', position: 0 }
    ]
  },
  'aura-social-campaign-grid': {
    id: 'placeholder-4',
    title: 'Aura Social Campaign Grid',
    slug: 'aura-social-campaign-grid',
    category: 'instagram',
    description: 'A cohesive set of social grid layouts built for Instagram campaigns. Focuses on premium gradients, large typography statements, and photo overlays to drive brand awareness and direct engagements during Aura Media Labs relaunch phase.',
    tools: ['Figma', 'Photoshop'],
    live_url: null,
    featured: false,
    sort_order: 4,
    created_at: new Date().toISOString(),
    project_media: [
      { id: 'pm-4', project_id: 'placeholder-4', media_type: 'image', storage_path: 'instagram/placeholder_4.png', position: 0 }
    ]
  },
  'helios-smart-commerce-portal': {
    id: 'placeholder-5',
    title: 'Helios Smart Commerce Portal',
    slug: 'helios-smart-commerce-portal',
    category: 'website',
    description: 'Helios is a high-performance headless e-commerce store built to showcase seamless loading states, stripe integration, static caching, and responsive image configurations. The layout achieves a lighthouse speed score of 98, driving retention and fast checkout checkouts.',
    tools: ['Next.js', 'React Query', 'Stripe API', 'Tailwind CSS'],
    live_url: 'https://example.com',
    featured: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
    project_media: [
      { id: 'pm-5', project_id: 'placeholder-5', media_type: 'image', storage_path: 'website/placeholder_5.png', position: 0 }
    ]
  },
  'lumina-fluid-dynamics-reel': {
    id: 'placeholder-6',
    title: 'Lumina Fluid Dynamics Reel',
    slug: 'lumina-fluid-dynamics-reel',
    category: 'video',
    description: 'A WebGL fluid dynamics mouse-interactive particle shader projection mockup.',
    tools: ['WebGL', 'GLSL Shaders', 'ThreeJS'],
    live_url: null,
    featured: true,
    sort_order: 6,
    created_at: new Date().toISOString(),
    project_media: [
      { id: 'pm-6', project_id: 'placeholder-6', media_type: 'video', storage_path: 'video/placeholder_6.mp4', position: 0 }
    ]
  }
};

// Premium visual assets to render if Supabase Storage is empty for fallback projects
const FALLBACK_VISUAL_URLS: Record<string, string> = {
  logo: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
  flyer: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop',
  instagram: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop',
  website: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
  video: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-34287-large.mp4',
};

export const revalidate = 0;

// Dynamic Metadata generation
export async function generateMetadata({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug) || FALLBACK_PROJECTS[params.slug];
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | Alex Morgan Project`,
    description: project.description || `View details about ${project.title}.`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = params;
  
  // Try to load from database first
  let project = await getProjectBySlug(slug);
  const isDbProject = !!project;

  // Fallback to placeholders if database is empty
  if (!project) {
    project = FALLBACK_PROJECTS[slug] || null;
  }

  if (!project) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center py-24 text-center px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h1 className="font-heading text-2xl font-bold mb-2">Project Not Found</h1>
        <p className="font-body text-sm text-muted-foreground mb-8">
          The project with slug &quot;{slug}&quot; does not exist or has been removed.
        </p>
        <Link 
          href="/work"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-2.5 text-sm font-semibold hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Work
        </Link>
      </div>
    );
  }

  const { title, category, description, tools, live_url, project_media } = project;
  const categoryLabel = CATEGORY_LABELS[category] || category;

  // Resolve media resource URL
  let mediaUrl = '';
  let mediaType: 'image' | 'video' = 'image';

  if (project_media && project_media.length > 0) {
    const primaryMedia = project_media[0];
    mediaType = primaryMedia.media_type;
    
    if (isDbProject) {
      mediaUrl = getMediaPublicUrl(primaryMedia.storage_path);
    } else {
      // For placeholder templates, use standard working CDN files
      mediaUrl = FALLBACK_VISUAL_URLS[category] || '';
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12 md:py-20 flex flex-col gap-12">
      {/* 1. Header Navigation */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <Link 
          href="/work"
          className="group inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>
        <span className="rounded-full bg-brand/10 border border-brand/20 px-3.5 py-1 text-xs font-semibold text-brand uppercase tracking-wider">
          {categoryLabel}
        </span>
      </div>

      {/* 2. Media Render Frame */}
      <section className="w-full">
        {mediaUrl ? (
          category === 'video' || mediaType === 'video' ? (
            <div className="overflow-hidden rounded-xl border border-border bg-black aspect-[9/16] max-w-sm mx-auto w-full flex items-center justify-center shadow-2xl">
              <video
                src={mediaUrl}
                controls
                autoPlay={false}
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ) : category === 'website' ? (
            <BrowserFrame src={mediaUrl} alt={title} url={live_url || undefined} />
          ) : (
            <LightboxImage src={mediaUrl} alt={title} />
          )
        ) : (
          <div className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground bg-muted/20">
            No media asset uploaded for this project yet.
          </div>
        )}
      </section>

      {/* 3. Details & Case Study Content */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
        {/* Left Column: Metadata */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Tools & Skills</h3>
            {tools && tools.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span 
                    key={tool}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-2.5 py-1 text-xs font-semibold text-foreground"
                  >
                    <Cpu className="h-3 w-3 text-brand" />
                    {tool}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">General design software</span>
            )}
          </div>

          {category === 'website' && live_url && (
            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Live URL</h3>
              <a
                href={live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-brand/15 hover:bg-brand-dark transition-all duration-200"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Case Study / Description */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
            {title}
          </h1>
          
          {category === 'website' ? (
            /* Render Structured Case Study for Websites */
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-sm font-bold text-brand uppercase tracking-wider mb-2">
                  Challenge & Objective
                </h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-brand uppercase tracking-wider mb-2">
                  My Strategic Approach
                </h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  The strategy focused on engineering an ultra-responsive user flow with zero layout shift. Standardizing components in custom layouts and integrating direct APIs ensured clean, low-latency, and modular code structures.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-brand uppercase tracking-wider mb-2">
                  Technical Implementation & Stack
                </h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Leveraging a modern server-side architecture allowed for pre-rendering static assets and fast dynamic API lookups. Tailwind CSS custom design tokens guaranteed spacing consistency, and Stripe checks handled secure transactions.
                </p>
              </div>
            </div>
          ) : (
            /* Render General Description for Logos/Flyers/Instagram/Videos */
            <div>
              <h3 className="font-heading text-sm font-bold text-brand uppercase tracking-wider mb-2">
                Project Overview
              </h3>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
