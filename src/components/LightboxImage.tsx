'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

interface LightboxImageProps {
  src: string;
  alt: string;
}

export default function LightboxImage({ src, alt }: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = () => setIsOpen(true);
  const closeLightbox = () => setIsOpen(false);

  return (
    <>
      {/* Thumbnail Trigger */}
      <div 
        onClick={openLightbox}
        className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-border bg-muted aspect-[4/3] w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-102"
          unoptimized
        />
        {/* Zoom Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-lg bg-background/90 px-4 py-2 text-xs font-semibold text-foreground shadow-md">
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Click to zoom</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4 animate-in fade-in duration-200 cursor-zoom-out"
        >
          {/* Close button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground hover:bg-muted"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Expanded Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] max-w-[90vw] w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full max-h-[80vh] aspect-[4/3]">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain rounded-lg"
                unoptimized
              />
            </div>
            {/* Alt Caption label */}
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-center text-xs font-medium text-muted-foreground w-full px-4">
              {alt}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
