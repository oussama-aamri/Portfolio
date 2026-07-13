import React from 'react';
import { Briefcase } from 'lucide-react';

interface ClientLogo {
  name: string;
  icon: React.ReactNode;
}

const CLIENT_LOGOS: ClientLogo[] = [
  {
    name: 'Stripe',
    icon: (
      <svg className="h-6 w-auto opacity-45 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 80 33" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M78.6 15.6c0-6-4.2-10-10.7-10-6.7 0-10.6 4.3-10.6 10.3 0 7 5.1 9.8 11.2 9.8 3.1 0 5.6-.6 7.4-1.7v-4.5c-1.8 1-4.2 1.6-6.8 1.6-3.8 0-6.1-1.3-6.4-4h15.7c.1-.4.2-1 .2-1.5zm-11.8-3.7c0-2.4 1.7-3.8 4.2-3.8 2.3 0 3.9 1.4 3.9 3.8H66.8zm-16.7-1.1c.1-3.6-2.2-5.2-5.7-5.2-3 0-5.8 1.1-7.2 2.1l2.1 3.5c1-.8 2.7-1.4 4.5-1.4 1.9 0 2.8.7 2.8 1.8 0 1.2-1.3 1.6-3.7 2.5-3.3 1.2-6.5 2.7-6.5 6.7 0 4.1 3.4 6.2 7.2 6.2 2.8 0 4.9-1 6-2.4l.2 2.1h4.6V10.8zm-5.4 9.1c0 2.2-1.8 3.4-3.9 3.4-1.8 0-3.1-.9-3.1-2.4 0-1.8 1.7-2.5 4.3-3.4 1.8-.7 2.7-1.2 2.7-2.1v4.5zm-9.3-14.3v4.4h3.6V15h-3.6v9.3h-5.4V15h-2.1v-4.4h2.1V7.5c0-3.6 2.3-5.7 6.4-5.7 1.4 0 2.7.2 3.5.5v4.2c-.7-.3-1.6-.4-2.5-.4-1.7 0-2.5.8-2.5 2.5zm-15 4.4v14.3H15V10c0-2.4-1.5-3.7-3.9-3.7-2.3 0-4 1.4-4 3.7v14.3H1.7V5.8h5.3v2.1c1.3-1.5 3.5-2.5 6.2-2.5 5.5.1 7.2 3.6 7.2 8.4zm23.6-2.2c0-1.5.8-2.3 2.1-2.3 1.4 0 2.2.8 2.2 2.3v14.3h5.4V10.2c0-4.8-1.7-8.4-7.2-8.4-2.8 0-4.9 1-6.2 2.5V.2h-5.4v24.1h5.4v-8.6z" />
      </svg>
    )
  },
  {
    name: 'Vercel',
    icon: (
      <svg className="h-5 w-auto opacity-45 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 116 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M57.5 0L115 100H0L57.5 0Z" />
      </svg>
    )
  },
  {
    name: 'Figma',
    icon: (
      <svg className="h-6 w-auto opacity-45 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 32 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 48C3.58 48 0 44.42 0 40c0-3.42 2.14-6.33 5.16-7.48C2.14 31.37 0 28.46 0 25c0-3.42 2.14-6.33 5.16-7.48C2.14 16.37 0 13.46 0 10c0-5.52 4.48-10 10-10h12c5.52 0 10 4.48 10 10v30c0 5.52-4.48 10-10 10H8zm0-38c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm16 0c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zM8 20c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm16 0c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5v-10h10zM8 35c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z" />
      </svg>
    )
  },
  {
    name: 'Linear',
    icon: (
      <svg className="h-5.5 w-auto opacity-45 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zm-3-13.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10.25 11a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM12 15a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
      </svg>
    )
  },
  {
    name: 'Shopify',
    icon: (
      <svg className="h-6.5 w-auto opacity-45 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 8.25l-7.5-3.375-7.5 3.375V15.75l7.5 3.375 7.5-3.375V8.25zM12 2.25L3.75 6v12L12 21.75 20.25 18V6L12 2.25zM12 16.5l-4.5-2.025v-3.75L12 12.75l4.5-2.025v3.75L12 16.5zm-5.25-6.75l5.25-2.363 5.25 2.363L12 12.112 6.75 9.75z" />
      </svg>
    )
  },
  {
    name: 'Slack',
    icon: (
      <svg className="h-6 w-auto opacity-45 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.043zm2.52-6.342a2.528 2.528 0 0 1-2.52-2.52 2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.52 2.522v2.52h-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.52-2.522V10.084a2.528 2.528 0 0 1 2.52-2.52h5.043zm6.342-2.52a2.528 2.528 0 0 1 2.522-2.523 2.528 2.528 0 0 1 2.52 2.523v2.52h-2.52v-2.52zm-1.261 0a2.528 2.528 0 0 1-2.52 2.52H6.301a2.528 2.528 0 0 1-2.52-2.52V3.783a2.528 2.528 0 0 1 2.52-2.52H11.343a2.528 2.528 0 0 1 2.52 2.52v5.043zm-2.52 6.342a2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.52-2.522v-2.52h2.52zm0-1.261a2.528 2.528 0 0 1-2.52-2.52V6.301a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.52h-5.043z" />
      </svg>
    )
  },
  {
    name: 'GitHub',
    icon: (
      <svg className="h-6 w-auto opacity-45 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    )
  },
  {
    name: 'Airbnb',
    icon: (
      <svg className="h-6 w-auto opacity-45 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24a2.915 2.915 0 0 1-2.234-1.037c-.3-.357-3.053-3.69-5.184-6.425C1.867 13.167.33 10.74.33 8.358A8.366 8.366 0 0 1 8.688 0a8.214 8.214 0 0 1 5.864 2.418c.036.035.07.072.104.11a8.318 8.318 0 0 1 3.568 5.83c0 2.383-1.538 4.808-4.254 8.18-2.13 2.735-4.884 6.068-5.184 6.425A2.916 2.916 0 0 1 12 24zM8.688 2.09A6.273 6.273 0 0 0 2.42 8.358c0 1.776 1.296 3.87 3.738 6.945l5.12 6.574a.823.823 0 0 0 1.296-.008L17.72 15.3c2.44-3.076 3.737-5.17 3.737-6.946a6.276 6.276 0 0 0-6.268-6.267 6.136 6.136 0 0 0-4.38 1.808c-.027.027-.052.055-.078.083a.823.823 0 0 1-1.22 0A6.241 6.241 0 0 0 8.688 2.09zm3.312 8.785a2.513 2.513 0 1 1 2.513-2.512A2.516 2.516 0 0 1 12 10.875zm0-3.376a.863.863 0 1 0 .863.864A.864.864 0 0 0 12 7.499z" />
      </svg>
    )
  }
];

export default function ClientLogoSlider() {
  return (
    <section className="w-full py-6 relative overflow-hidden select-none">
      {/* Section Header */}
      <div className="mx-auto max-w-6xl px-6 mb-10">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-[#0f0f12] text-brand">
              <Briefcase className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold text-brand uppercase tracking-widest">01 // CLIENTS & PARTNERS</span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mt-0.5">Trusted By & Collaborated With</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Outer wrapper with left and right gradient masks */}
      <div className="relative w-full flex items-center overflow-hidden py-4
        before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 md:before:w-80 before:bg-gradient-to-r before:from-background before:to-transparent before:pointer-events-none
        after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 md:after:w-80 after:bg-gradient-to-l after:from-background after:to-transparent after:pointer-events-none"
      >
        {/* Animated slide track */}
        <div className="animate-ticker hover:[animation-play-state:paused] flex gap-16 md:gap-28 items-center px-8">
          
          {/* First set of logos */}
          {CLIENT_LOGOS.map((logo, idx) => (
            <div 
              key={`logo-first-${idx}`} 
              className="flex items-center justify-center transition-all duration-300 hover:scale-105 hover:text-brand text-muted-foreground/60 w-24 md:w-32"
              title={logo.name}
            >
              {logo.icon}
            </div>
          ))}

          {/* Second identical set of logos for seamless looping */}
          {CLIENT_LOGOS.map((logo, idx) => (
            <div 
              key={`logo-second-${idx}`} 
              className="flex items-center justify-center transition-all duration-300 hover:scale-105 hover:text-brand text-muted-foreground/60 w-24 md:w-32"
              title={logo.name}
            >
              {logo.icon}
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
