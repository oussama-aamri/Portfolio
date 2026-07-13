import Link from 'next/link';
import { ArrowRight, FolderKanban } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/data';
import { ProjectWithMedia } from '@/types/database.types';
import ClientLogoSlider from '@/components/ClientLogoSlider';
import FeaturedShowcaseSlider from '@/components/FeaturedShowcaseSlider';

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
    <div className="flex flex-col gap-24 py-12 md:py-20 relative overflow-hidden">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-6xl w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Side: Value Prop */}
        <div className="lg:col-span-7 flex flex-col text-left">
          <div className="inline-flex self-start items-center gap-2 rounded-full border border-border bg-[#0f0f12] px-4 py-1.5 text-[10px] font-semibold font-mono text-muted-foreground tracking-wider uppercase mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
            Available for contracts & full-time roles
          </div>
          
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            Delivering digital interfaces from <br />
            <span className="bg-[linear-gradient(98deg,#f59e0b_1.35%,#84cc16_18.48%,#10b981_38.35%,#0ea5e9_58.63%,#8b5cf6_79.7%,#ec4899_100%)] bg-clip-text text-transparent will-change-transform font-black">
              dev to prod
            </span>.
          </h1>
          
          <p className="font-body text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
            I am Alex Morgan, a creative software engineer building high-performance interactive interfaces, custom design systems, and developer-centric web products with extreme visual detail.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-neutral-100 px-8 py-3.5 text-xs font-semibold font-mono text-black shadow-lg shadow-white/5 hover:shadow-brand/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-widest"
            >
              Explore Work
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border bg-[#0f0f12] px-8 py-3.5 text-xs font-semibold font-mono text-foreground hover:bg-[#141418] hover:border-brand/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-widest"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>

        {/* Right Side: Interactive Terminal Window */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto lg:mx-0">
          <div className="w-full rounded-xl border border-border bg-[#0a0a0d] shadow-2xl overflow-hidden flex flex-col font-mono text-xs">
            {/* Terminal Header */}
            <div className="h-10 bg-[#0f0f14] border-b border-border/80 px-4 flex items-center justify-between">
              {/* Window Controls */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              {/* Window Title */}
              <span className="text-muted-foreground/60 text-[10px] select-none">alex@morgan: ~</span>
              {/* Copy placeholder */}
              <div className="w-10" />
            </div>
            
            {/* Terminal Body */}
            <div className="p-5 flex flex-col gap-4 text-[11px] leading-relaxed overflow-x-auto select-text selection:bg-brand/20">
              <div>
                <span className="text-emerald-400">alex@morgan</span>
                <span className="text-white">:</span>
                <span className="text-violet-400">~</span>
                <span className="text-white">$ curl -s https://api.alexmorgan.dev/profile</span>
              </div>
              
              <div className="text-muted-foreground">
                <span className="text-white">{`{`}</span>
                <div className="pl-4">
                  <span className="text-amber-400">&quot;name&quot;</span><span className="text-white">:</span> <span className="text-emerald-300">&quot;Alex Morgan&quot;</span><span className="text-white">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-amber-400">&quot;role&quot;</span><span className="text-white">:</span> <span className="text-emerald-300">&quot;Full-Stack Creative Engineer&quot;</span><span className="text-white">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-amber-400">&quot;status&quot;</span><span className="text-white">:</span> <span className="text-emerald-300">&quot;active_for_contracts&quot;</span><span className="text-white">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-amber-400">&quot;stack&quot;</span><span className="text-white">:</span> <span className="text-white">[</span>
                  <div className="pl-4">
                    <span className="text-emerald-300">&quot;React/Next.js&quot;</span><span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-emerald-300">&quot;TypeScript&quot;</span><span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-emerald-300">&quot;Tailwind CSS&quot;</span><span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-emerald-300">&quot;Supabase/DB&quot;</span>
                  </div>
                  <span className="text-white">]</span><span className="text-white">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-amber-400">&quot;design_focus&quot;</span><span className="text-white">:</span> <span className="text-white">[</span>
                  <div className="pl-4">
                    <span className="text-emerald-300">&quot;UI/UX Systems&quot;</span><span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-emerald-300">&quot;WebGL/GLSL Shaders&quot;</span>
                  </div>
                  <span className="text-white">]</span>
                </div>
                <span className="text-white">{`}`}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-emerald-400">alex@morgan</span>
                <span className="text-white">:</span>
                <span className="text-violet-400">~</span>
                <span className="text-white">$</span>
                <span className="w-1.5 h-3 bg-brand animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Slider */}
      <ClientLogoSlider />

      {/* 2. Featured Work Section */}
      <section className="mx-auto w-full max-w-6xl px-6 z-10">
        <div className="flex items-end justify-between border-b border-border pb-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-[#0f0f12] text-brand">
              <FolderKanban className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold text-brand uppercase tracking-widest">02 // SELECTED WORK</span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mt-0.5">Featured Showcase</h2>
            </div>
          </div>
          
          <Link 
            href="/work"
            className="group hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold text-brand hover:text-brand-light transition-colors duration-200 uppercase tracking-wider"
          >
            Explore all projects
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Informative banner if viewing placeholder items */}
        {!hasDbProjects && (
          <div className="mb-8 rounded-xl border border-dashed border-border bg-[#0f0f12]/50 p-4 text-center font-mono text-[11px] text-muted-foreground">
            <span className="text-brand">[info]</span> Showing design templates. Once you add your GitHub configurations and run sync, live database items will automatically render here.
          </div>
        )}

        {/* Responsive Horizontal Slider of 9:16 Cards */}
        <FeaturedShowcaseSlider featuredProjects={featuredProjects} />

        {/* Mobile explore link */}
        <div className="mt-10 text-center sm:hidden">
          <Link 
            href="/work"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-[#0f0f12] w-full py-3.5 font-mono text-[11px] font-semibold text-brand hover:bg-[#141418] uppercase tracking-wider"
          >
            Explore all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
