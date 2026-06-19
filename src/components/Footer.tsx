import { Github, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com';
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com';

  const socialLinks = [
    { name: 'GitHub', href: githubUrl, icon: Github },
    { name: 'Instagram', href: instagramUrl, icon: Instagram },
    { name: 'LinkedIn', href: linkedinUrl, icon: Linkedin },
  ];

  return (
    <footer className="w-full border-t border-border bg-muted/30 py-8 transition-colors duration-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="font-body text-sm text-muted-foreground">
          &copy; {currentYear} Alex Morgan. All rights reserved.
        </p>
        
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-all duration-200"
                aria-label={link.name}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
