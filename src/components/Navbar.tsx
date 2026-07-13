'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 text-base font-bold tracking-tight">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse" />
          <span className="font-mono text-sm tracking-wide text-foreground font-semibold">alex_morgan.dev</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-mono text-[11px] font-medium tracking-widest uppercase transition-colors hover:text-foreground py-1 ${
                  isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-brand shadow-[0_0_8px_var(--brand)] animate-fade-in" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-border bg-[#0f0f12] font-mono text-[10px] font-medium tracking-widest text-foreground hover:bg-brand/10 hover:border-brand/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-200 uppercase"
          >
            Contact
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-md border border-border bg-[#0e0e12] text-foreground hover:bg-[#141418] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-[#08080a]/95 backdrop-blur-md p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-5 pt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-mono text-lg font-medium tracking-wider border-l-2 pl-4 py-1 transition-colors ${
                    isActive ? 'border-brand text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full inline-flex items-center justify-center py-3 rounded-full border border-border bg-[#0f0f12] font-mono text-xs font-semibold tracking-wider text-foreground hover:bg-[#141418] uppercase"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
