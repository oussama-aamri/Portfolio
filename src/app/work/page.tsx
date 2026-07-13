import { getAllProjects } from '@/lib/data';
import WorkGrid from '@/components/WorkGrid';
import { ProjectWithMedia } from '@/types/database.types';

// Mock database projects covering all categories for fallback testing
const FALLBACK_ALL_PROJECTS: ProjectWithMedia[] = [
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
      { id: 'pm-1', project_id: 'placeholder-1', media_type: 'image', storage_path: 'logo/placeholder_1.png', position: 0 }
    ]
  },
  {
    id: 'placeholder-2',
    title: 'Veloce FinTech Brand Book',
    slug: 'veloce-fintech-brand-book',
    category: 'logo',
    description: 'Brand design system and typography manual for a fintech startup.',
    tools: ['Adobe Illustrator', 'InDesign'],
    live_url: null,
    featured: false,
    sort_order: 2,
    created_at: new Date().toISOString(),
    project_media: [
      { id: 'pm-2', project_id: 'placeholder-2', media_type: 'image', storage_path: 'logo/placeholder_2.png', position: 0 }
    ]
  },
  {
    id: 'placeholder-3',
    title: 'Lumina Event Flyer',
    slug: 'lumina-event-flyer',
    category: 'flyer',
    description: 'Minimal typography-focused poster design for Lumina creative event.',
    tools: ['InDesign', 'Illustrator', 'Adobe Fonts'],
    live_url: null,
    featured: false,
    sort_order: 3,
    created_at: new Date().toISOString(),
    project_media: [
      { id: 'pm-3', project_id: 'placeholder-3', media_type: 'image', storage_path: 'flyer/placeholder_3.png', position: 0 }
    ]
  },
  {
    id: 'placeholder-4',
    title: 'Aura Social Campaign Grid',
    slug: 'aura-social-campaign-grid',
    category: 'instagram',
    description: '9-grid visual layout strategy for Aura Media Labs launch campaign.',
    tools: ['Figma', 'Photoshop'],
    live_url: null,
    featured: false,
    sort_order: 4,
    created_at: new Date().toISOString(),
    project_media: [
      { id: 'pm-4', project_id: 'placeholder-4', media_type: 'image', storage_path: 'instagram/placeholder_4.png', position: 0 }
    ]
  },
  {
    id: 'placeholder-5',
    title: 'Helios Smart Commerce Portal',
    slug: 'helios-smart-commerce-portal',
    category: 'website',
    description: 'High-performance head-less headless checkout flow, with multi-tier custom pricing layouts.',
    tools: ['Next.js', 'React Query', 'Stripe API', 'Tailwind CSS'],
    live_url: 'https://example.com',
    featured: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
    project_media: [
      { id: 'pm-5', project_id: 'placeholder-5', media_type: 'image', storage_path: 'website/placeholder_5.png', position: 0 }
    ]
  },
  {
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
];

export const revalidate = 0;

export default async function WorkPage() {
  const dbProjects = await getAllProjects();
  const hasDbProjects = dbProjects.length > 0;
  const projects = hasDbProjects ? dbProjects : FALLBACK_ALL_PROJECTS;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-20 flex flex-col gap-10">
      <div>
        <span className="font-mono text-[9px] font-bold text-brand tracking-widest uppercase">02 // PORTFOLIO HUB</span>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground mt-1 mb-4">
          All Selected Work
        </h1>
        <p className="font-body text-base text-muted-foreground max-w-xl leading-relaxed">
          Browse through my design and engineering projects, filtered by category. Click on any project thumbnail to view its full details and case studies.
        </p>
      </div>

      {!hasDbProjects && (
        <div className="rounded-xl border border-dashed border-border bg-[#0f0f12]/50 p-4 text-center font-mono text-[11px] text-muted-foreground">
          <span className="text-brand">[info]</span> Showing fallback design assets. Once you run your GitHub import script, your actual projects will dynamically replace these.
        </div>
      )}

      {/* Filterable Work Grid */}
      <WorkGrid initialProjects={projects} />
    </div>
  );
}
