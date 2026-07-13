'use client';

import { useState } from 'react';
import { ProjectWithMedia } from '@/types/database.types';
import ProjectCard from '@/components/ProjectCard';

interface WorkGridProps {
  initialProjects: ProjectWithMedia[];
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All' },
  { id: 'logo', label: 'Logos' },
  { id: 'flyer', label: 'Flyers' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'website', label: 'Websites' },
  { id: 'video', label: 'Videos' },
];

export default function WorkGrid({ initialProjects }: WorkGridProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects = activeTab === 'all'
    ? initialProjects
    : initialProjects.filter(project => project.category === activeTab);

  return (
    <div className="flex flex-col gap-10">
      {/* Filters Strip */}
      <div className="flex items-center justify-start border-b border-border pb-2 overflow-x-auto scrollbar-none gap-2">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2.5 font-mono text-[10px] font-medium tracking-widest whitespace-nowrap transition-colors duration-200 hover:text-foreground uppercase ${
                isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-[-9px] left-0 h-[1.5px] w-full bg-brand shadow-[0_0_8px_var(--brand)] animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>


      {/* Grid Container */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="animate-in fade-in zoom-in-95 duration-300"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-2xl">
          <p className="font-heading text-lg font-bold text-foreground mb-2">No projects found</p>
          <p className="font-body text-sm text-muted-foreground max-w-xs">
            There are no projects added to the &quot;{CATEGORY_TABS.find(t => t.id === activeTab)?.label}&quot; category yet.
          </p>
        </div>
      )}
    </div>
  );
}
