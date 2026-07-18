'use client';

import { useRef } from 'react';
import Link from 'next/link';
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

export default function ProjectCard({ project, variant }: ProjectCardProps) {
  const { title, slug, category, tools, project_media } = project;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.debug("Video play interrupted:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Reload video to reset state and show poster again
      videoRef.current.load();
    }
  };
  
  // Find video and image media elements
  const videoMedia = project_media && project_media.length > 0 
    ? project_media.find(m => m.media_type === 'video')
    : null;

  const imageMedia = project_media && project_media.length > 0
    ? project_media.find(m => m.media_type === 'image')
    : null;

  const isVideo = !!videoMedia;

  const publicUrl = isVideo 
    ? (videoMedia ? getMediaPublicUrl(videoMedia.storage_path) : null)
    : (imageMedia ? getMediaPublicUrl(imageMedia.storage_path) : null);

  const posterUrl = isVideo && imageMedia 
    ? getMediaPublicUrl(imageMedia.storage_path) 
    : null;

  const categoryLabel = CATEGORY_LABELS[category] || category;

  const renderCategoryIcon = () => {
    switch (category) {
      case 'video':
        return <Film className="h-3 w-3" />;
      case 'website':
        return <Globe className="h-3 w-3" />;
      default:
        return <ImageIcon className="h-3 w-3" />;
    }
  };

  // Determine container and media layout style classes dynamically
  let containerClass = "group block relative w-full overflow-hidden rounded-2xl border border-border bg-[#0f0f12] shadow-sm hover:shadow-2xl transition-all duration-300 hover:border-brand/40";
  let mediaClass = "w-full transition-transform duration-300 group-hover:scale-[1.04]";
  
  if (variant === 'portrait') {
    containerClass += " aspect-[9/16]";
    mediaClass += " absolute inset-0 h-full object-cover";
  } else if (variant === 'landscape') {
    containerClass += " aspect-[16/10]";
    mediaClass += " absolute inset-0 h-full object-cover";
  } else {
    // Masonry / Natural aspect ratio mode
    mediaClass += " h-auto object-contain";
  }

  return (
    <Link 
      href={`/work/${slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={containerClass}
    >
      {/* Media Content */}
      <div className={variant ? "relative h-full w-full" : "w-full bg-[#070709] overflow-hidden"}>
        {publicUrl ? (
          isVideo ? (
            <video
              ref={videoRef}
              src={publicUrl}
              poster={posterUrl || undefined}
              muted
              loop
              playsInline
              className={mediaClass}
            />
          ) : (
            <img
              src={publicUrl}
              alt={title}
              className={mediaClass}
            />
          )
        ) : (
          <div className="flex aspect-[16/10] w-full items-center justify-center text-muted-foreground bg-[#070709] p-10">
            <ImageIcon className="h-8 w-8 opacity-40" />
          </div>
        )}
      </div>

      {/* Modern Behance/Pinterest Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        {/* Category Badge */}
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold text-brand tracking-widest uppercase mb-2">
          {renderCategoryIcon()}
          {categoryLabel}
        </span>

        {/* Project Title */}
        <h3 className="font-heading text-lg font-bold text-white mb-3 leading-tight line-clamp-2">
          {title}
        </h3>

        {/* View Project Action Indicator */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-neutral-300">
          <span>View Project</span>
          <ArrowRight className="h-3 w-3 text-brand transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
