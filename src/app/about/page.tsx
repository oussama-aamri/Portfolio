import Image from 'next/image';
import { Briefcase, Compass, FileCode, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'About Alex Morgan | Creative Designer & Developer',
  description: 'Learn more about Alex Morgan, design systems, creative coding process, and technical stack.',
};

export default function AboutPage() {
  const skills = [
    {
      category: 'Design Systems',
      items: ['Figma Prototyping', 'UI/UX Design', 'Typography Design', 'Brand Identities'],
    },
    {
      category: 'Frontend Engineering',
      items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'WebGL & GLSL Shaders'],
    },
    {
      category: 'Backend & Deploy',
      items: ['Supabase / PostgreSQL', 'REST & GraphQL APIs', 'Vercel Deployment', 'GitHub Workflows'],
    },
  ];

  const phases = [
    {
      num: '01',
      title: 'Discover & Align',
      icon: Compass,
      desc: 'Deep diving into the brand identity, client problems, and user expectations. Aligning on core visual styles and project specifications.',
    },
    {
      num: '02',
      title: 'UI Design & Systems',
      icon: Briefcase,
      desc: 'Creating modular design tokens, vector layouts, and high-fidelity interactive prototypes in Figma for rapid validation.',
    },
    {
      num: '03',
      title: 'High-Fidelity Code',
      icon: FileCode,
      desc: 'Developing fast server-rendered interfaces with Next.js and Tailwind CSS. Implementing state logic and secure backend hooks.',
    },
    {
      num: '04',
      title: 'Refine & Deploy',
      icon: CheckCircle,
      desc: 'Polishing micro-animations, checking SEO metadata structures, testing mobile layouts, and deploying to production via Vercel.',
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12 md:py-20 flex flex-col gap-20">
      {/* Bio Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold text-brand uppercase tracking-widest">03 // The Background</span>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground mt-2">
              The Mind Behind the Work
            </h1>
          </div>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            I bridge the gap between design and technology. I believe a website shouldn&apos;t just function—it should tell a story, engage the senses, and guide the user intuitively.
          </p>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            With over 5 years of industry experience, I partner with startups and brands to engineer interfaces that combine robust code architectures with delightful visual presentation. My process centers around detail, performance, accessibility, and high-fidelity transitions.
          </p>
        </div>
        
        {/* Profile portrait block */}
        <div className="md:col-span-5 relative aspect-[4/5] w-full max-w-sm mx-auto md:mx-0 overflow-hidden rounded-2xl border border-border shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
            alt="Alex Morgan Portrait"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </section>

      {/* Skills toolbox */}
      <section className="flex flex-col gap-10 border-t border-border pt-16">
        <div>
          <span className="text-xs font-bold text-brand uppercase tracking-widest">04 // Capabilities</span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground mt-2">
            My Toolbox
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {skills.map((skillGroup) => (
            <div 
              key={skillGroup.category}
              className="rounded-xl border border-border bg-muted/30 p-6 flex flex-col gap-4"
            >
              <h3 className="font-heading text-base font-bold text-brand">
                {skillGroup.category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {skillGroup.items.map((item) => (
                  <li key={item} className="font-body text-sm text-foreground/80 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process list */}
      <section className="flex flex-col gap-10 border-t border-border pt-16">
        <div>
          <span className="text-xs font-bold text-brand uppercase tracking-widest">05 // How I Work</span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground mt-2">
            The Creative Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <div key={phase.num} className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-heading text-3xl font-extrabold text-muted-foreground/30">
                    {phase.num}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  {phase.title}
                </h3>
                <p className="font-body text-xs leading-relaxed text-muted-foreground">
                  {phase.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
