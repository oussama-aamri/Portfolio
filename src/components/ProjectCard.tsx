import Link from 'next/link';
import Image from 'next/image';
import { ProjectWithMedia } from '@/types/database.types';
import { getMediaPublicUrl } from '@/lib/supabase';
import { ArrowRight, Film, Globe, Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectWithMedia;
}

export const CATEGORY_LABELS: Record<string, string> = {
  logo: 'Logo Design',
  flyer: 'Flyer / Layout',
  instagram: 'Social Grid',
  website: 'Web Development',
  video: 'Video Production',
};

export default function ProjectCard({ project }: ProjectCardProps) {
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

  return (
    <Link 
      href={`/work/${slug}`}
      className="group block flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_12px_24px_-10px_rgba(255,107,87,0.15)]"
    >
      {/* Thumbnail Wrapper */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {publicUrl ? (
          isVideo ? (
            <div className="flex h-full w-full items-center justify-center bg-black text-white/50">
              <Film className="h-10 w-10 animate-pulse" />
              <span className="sr-only">Video Thumbnail</span>
            </div>
          ) : (
            <div className="relative h-full w-full">
              <Image
                src={publicUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized // Use unoptimized for external Supabase CDN to save vercel bandwidth and prevent image config issues
              />
            </div>
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}

        {/* Hover overlay indicator */}
        <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Detail Block */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category Badge */}
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand tracking-wider uppercase mb-2">
          {renderCategoryIcon()}
          {categoryLabel}
        </span>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-brand transition-colors duration-200 line-clamp-1 mb-1">
          {title}
        </h3>

        {/* Tools / Skills Tags */}
        {tools && tools.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tools.slice(0, 3).map((tool) => (
              <span 
                key={tool} 
                className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tool}
              </span>
            ))}
            {tools.length > 3 && (
              <span className="text-[10px] text-muted-foreground pl-0.5">
                +{tools.length - 3}
              </span>
            )}
          </div>
        )}

        {/* View Project arrow */}
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-foreground/80 group-hover:text-brand transition-colors duration-200 mt-auto pt-2">
          <span>View Project</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
