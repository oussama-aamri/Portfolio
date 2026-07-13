import Link from 'next/link';
import Image from 'next/image';
import { ProjectWithMedia } from '@/types/database.types';
import { getMediaPublicUrl } from '@/lib/supabase';
import { ArrowRight, Film, Globe, Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectWithMedia;
  variant?: 'landscape' | 'portrait';
}

export const CATEGORY_LABELS: Record<string, string> = {
  logo: 'Logo Design',
  flyer: 'Flyer / Layout',
  instagram: 'Social Grid',
  website: 'Web Development',
  video: 'Video Production',
};

export default function ProjectCard({ project, variant = 'landscape' }: ProjectCardProps) {
  const { title, slug, category, tools, project_media } = project;
  
  // Find primary image/video (position 0 or first item)
  const primaryMedia = project_media && project_media.length > 0 
    ? project_media[0] 
    : null;

  const publicUrl = primaryMedia ? getMediaPublicUrl(primaryMedia.storage_path) : null;
  const isVideo = primaryMedia?.media_type === 'video';

  const categoryLabel = CATEGORY_LABELS[category] || category;

  // Icon depending on category
  const renderCategoryIcon = () => {
    switch (category) {
      case 'video':
        return <Film className="h-3.5 w-3.5" />;
      case 'website':
        return <Globe className="h-3.5 w-3.5" />;
      default:
        return <ImageIcon className="h-3.5 w-3.5" />;
    }
  };

  if (variant === 'portrait') {
    return (
      <Link 
        href={`/work/${slug}`}
        className="group block relative w-full aspect-[9/16] overflow-hidden rounded-xl border border-border bg-[#0f0f12] transition-all duration-300 hover:border-brand/40 hover:shadow-[0_12px_30px_-10px_rgba(139,92,246,0.2)]"
      >
        {/* Media background wrapper */}
        <div className="absolute inset-0 h-full w-full bg-[#070709] overflow-hidden">
          {publicUrl ? (
            isVideo ? (
              <video
                src={publicUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <Image
                src={publicUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                unoptimized
              />
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageIcon className="h-8 w-8 opacity-40" />
            </div>
          )}

          {/* Dynamic hover overlay tint */}
          <div className="absolute inset-0 bg-brand/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Smooth black gradient fade at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-0" />
        </div>

        {/* Content details at the bottom */}
        <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col z-10">
          {/* Category Badge */}
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold text-brand tracking-widest uppercase mb-3">
            {renderCategoryIcon()}
            {categoryLabel}
          </span>

          {/* Title */}
          <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-brand transition-colors duration-200 line-clamp-2 mb-2">
            {title}
          </h3>

          {/* Tools / Skills Tags */}
          {tools && tools.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {tools.slice(0, 3).map((tool) => (
                <span 
                  key={tool} 
                  className="rounded border border-border bg-black/40 backdrop-blur-xs px-2 py-0.5 font-mono text-[9px] font-medium text-muted-foreground"
                >
                  {tool}
                </span>
              ))}
              {tools.length > 3 && (
                <span className="font-mono text-[9px] text-muted-foreground/80 pl-0.5 self-center">
                  +{tools.length - 3}
                </span>
              )}
            </div>
          )}

          {/* View Project Action */}
          <div className="mt-5 flex items-center gap-1.5 font-mono text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200 pt-3 border-t border-border/30">
            <span>run_case_study</span>
            <ArrowRight className="h-3 w-3 text-brand transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    );
  }

  // Default Landscape Layout
  return (
    <Link 
      href={`/work/${slug}`}
      className="group block flex flex-col overflow-hidden rounded-xl border border-border bg-[#0f0f12] transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_12px_30px_-10px_rgba(139,92,246,0.15)]"
    >
      {/* Thumbnail Wrapper */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070709] border-b border-border/60">
        {publicUrl ? (
          isVideo ? (
            <div className="relative h-full w-full">
              <video
                src={publicUrl}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          ) : (
            <div className="relative h-full w-full">
              <Image
                src={publicUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                unoptimized
              />
            </div>
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-[#070709]">
            <ImageIcon className="h-8 w-8 opacity-40" />
          </div>
        )}

        {/* Hover overlay indicator */}
        <div className="absolute inset-0 bg-brand/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Detail Block */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category Badge */}
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold text-brand tracking-widest uppercase mb-3">
          {renderCategoryIcon()}
          {categoryLabel}
        </span>

        {/* Title */}
        <h3 className="font-heading text-base font-bold text-foreground group-hover:text-brand transition-colors duration-200 line-clamp-1 mb-2">
          {title}
        </h3>

        {/* Tools / Skills Tags */}
        {tools && tools.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {tools.slice(0, 3).map((tool) => (
              <span 
                key={tool} 
                className="rounded border border-border bg-[#141418] px-2 py-0.5 font-mono text-[9px] font-medium text-muted-foreground"
              >
                {tool}
              </span>
            ))}
            {tools.length > 3 && (
              <span className="font-mono text-[9px] text-muted-foreground/80 pl-0.5">
                +{tools.length - 3}
              </span>
            )}
          </div>
        )}

        {/* View Project prompt */}
        <div className="mt-5 flex items-center gap-1.5 font-mono text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200 mt-auto pt-3 border-t border-border/30">
          <span>run_case_study</span>
          <ArrowRight className="h-3 w-3 text-brand transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
