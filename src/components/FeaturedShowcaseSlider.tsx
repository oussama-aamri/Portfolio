'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { ProjectWithMedia } from '@/types/database.types';

interface FeaturedShowcaseSliderProps {
  featuredProjects: ProjectWithMedia[];
}

export default function FeaturedShowcaseSlider({ featuredProjects }: FeaturedShowcaseSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollLimits = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 2);
      // Allow minor subpixel precision issues
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollLimits);
      // Initial check
      checkScrollLimits();
      
      // Also observe size changes
      const observer = new ResizeObserver(checkScrollLimits);
      observer.observe(el);
      
      return () => {
        el.removeEventListener('scroll', checkScrollLimits);
        observer.disconnect();
      };
    }
  }, [featuredProjects]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      // Scroll by 1 card width + gap (roughly 304px - 344px)
      const scrollAmount = direction === 'left' ? -344 : 344;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full group/slider">
      {/* Navigation Left Button */}
      {canScrollLeft && (
        <button
          onClick={() => handleScroll('left')}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-border bg-[#0f0f12]/90 text-foreground opacity-0 group-hover/slider:opacity-100 transition-all duration-300 backdrop-blur-md hover:bg-neutral-900 hover:border-brand/40 shadow-xl shadow-black/40 hover:-translate-x-0.5 active:translate-x-0 active:scale-95 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5 text-brand-light" />
        </button>
      )}

      {/* Navigation Right Button */}
      {canScrollRight && (
        <button
          onClick={() => handleScroll('right')}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-border bg-[#0f0f12]/90 text-foreground opacity-0 group-hover/slider:opacity-100 transition-all duration-300 backdrop-blur-md hover:bg-neutral-900 hover:border-brand/40 shadow-xl shadow-black/40 hover:translate-x-0.5 active:translate-x-0 active:scale-95 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 text-brand-light" />
        </button>
      )}

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-6 px-1"
      >
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start"
          >
            <ProjectCard project={project} variant="portrait" />
          </div>
        ))}
      </div>
    </div>
  );
}
