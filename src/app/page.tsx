import Link from 'next/link';
import { ArrowRight, Sparkles, FolderKanban } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import { ProjectWithMedia } from '@/types/database.types';

// Premium placeholder projects to show before DB import is run
const FALLBACK_FEATURED_PROJECTS: ProjectWithMedia[] = [
  {
    id: 'placeholder-1',
    title: 'Aetheria Cloud Identity',
    slug: 'aetheria-cloud-identity',
    category: 'logo',
    description: 'A comprehensive branding package and custom typography logo for Aetheria Cloud Workspace.',
    tools: ['Adobe Illustrator', 'Vector Design', 'Figma'],
    live_url: null,
    featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    project_media: [
      {
        id: 'pm-1',
        project_id: 'placeholder-1',
        media_type: 'image',
        storage_path: 'logo/placeholder_1.png', // Will fallback to standard placeholder visual if bucket is empty
        position: 0,
      }
    ]
  },
  {
    id: 'placeholder-2',
    title: 'Veloce FinTech UI System',
    slug: 'veloce-fintech-ui-system',
    category: 'website',
    description: 'A modular design token system and high-performance React dashboard layout.',
    tools: ['Next.js', 'Tailwind CSS', 'Figma', 'TypeScript'],
    live_url: 'https://example.com',
    featured: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    project_media: [
      {
        id: 'pm-2',
        project_id: 'placeholder-2',
        media_type: 'image',
        storage_path: 'website/placeholder_2.png',
        position: 0,
      }
    ]
  },
  {
    id: 'placeholder-3',
    title: 'Lumina Particle Symphony',
    slug: 'lumina-particle-symphony',
    category: 'video',
    description: 'An audio-reactive fluid dynamics video installation powered by custom vertex shaders.',
    tools: ['WebGL', 'GLSL Shaders', 'After Effects'],
    live_url: null,
    featured: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    project_media: [
      {
        id: 'pm-3',
        project_id: 'placeholder-3',
        media_type: 'video',
        storage_path: 'video/placeholder_3.mp4',
        position: 0,
      }
    ]
  }
];

export const revalidate = 0; // Dynamic server rendering to fetch fresh projects

export default async function Home() {
  const supabaseProjects = await getFeaturedProjects();
  
  // Use DB projects if available, otherwise show beautiful default templates
  const hasDbProjects = supabaseProjects.length > 0;
  const featuredProjects = hasDbProjects ? supabaseProjects : FALLBACK_FEATURED_PROJECTS;

  return (
    <div className="flex flex-col gap-20 py-12 md:py-24">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-4xl px-6 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-semibold text-brand tracking-wide mb-6 animate-pulse">
          <Sparkles className="h-3.5 w-3.5" />
          Available for design & development contracts
        </div>
        
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
          Crafting digital <br />
          <span className="text-brand">masterpieces</span> <br />
          with code & design
        </h1>
        
        <p className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
          I am Alex Morgan, a creative engineer specializing in building high-fidelity interactive interfaces, custom branding, and responsive web products with extreme visual detail.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-200 hover:bg-brand-dark hover:-translate-y-0.5 active:translate-y-0"
          >
            View My Work
            <ArrowRight className="h-4 w-4" />
          </Link>
          
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Let&apos;s Connect
          </Link>
        </div>
      </section>

      {/* 2. Featured Work Section */}
      <section className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-end justify-between border-b border-border pb-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <FolderKanban className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-brand uppercase tracking-widest">01 // Selected Works</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">Featured Work</h2>
            </div>
          </div>
          
          <Link 
            href="/work"
            className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-dark transition-colors duration-200"
          >
            Explore all projects
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Informative banner if viewing placeholder items */}
        {!hasDbProjects && (
          <div className="mb-8 rounded-xl border border-dashed border-border bg-muted/20 p-4 text-center text-sm text-muted-foreground">
            Showing design templates. Once you add your Supabase credentials in `.env.local` and run your GitHub import script, your live portfolio projects will display here.
          </div>
        )}

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Mobile explore link */}
        <div className="mt-10 text-center sm:hidden">
          <Link 
            href="/work"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background w-full py-3.5 text-sm font-semibold text-brand"
          >
            Explore all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
