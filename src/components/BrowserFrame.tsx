import Image from 'next/image';

interface BrowserFrameProps {
  src: string;
  alt: string;
  url?: string;
}

export default function BrowserFrame({ src, alt, url }: BrowserFrameProps) {
  const displayUrl = url || 'https://yoursite.com';

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-background shadow-xl">
      {/* Browser Bar */}
      <div className="flex h-10 w-full items-center border-b border-border bg-muted/40 px-4">
        {/* Windows controls dots */}
        <div className="flex items-center gap-1.5 w-1/4">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center justify-center w-1/2">
          <div className="w-full max-w-sm rounded bg-background border border-border px-3 py-1 text-center font-body text-[11px] text-muted-foreground truncate select-all">
            {displayUrl}
          </div>
        </div>
        
        {/* Spacer */}
        <div className="w-1/4" />
      </div>

      {/* Screen Viewport */}
      <div className="relative aspect-[16/10] w-full bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}
