'use client';

import { useState } from 'react';
import { Mail, Github, Instagram, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com';
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com';
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@alexmorgan.dev';

  const socialLinks = [
    { name: 'GitHub', href: githubUrl, icon: Github, label: 'github.com/alexmorgan' },
    { name: 'Instagram', href: instagramUrl, icon: Instagram, label: '@alexmorgan.design' },
    { name: 'LinkedIn', href: linkedinUrl, icon: Linkedin, label: 'linkedin.com/in/alexmorgan' },
  ];

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      // Form service endpoint fallback (Formspree, Web3Forms, or custom Edge Function)
      const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
      
      if (formEndpoint) {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setStatus('error');
        }
      } else {
        // Fallback simulation if no form service endpoint is set
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12 md:py-20 flex flex-col gap-12">
      <div>
        <span className="text-xs font-bold text-brand uppercase tracking-widest">06 // Connect</span>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground mt-2 mb-4">
          Let&apos;s build something exceptional
        </h1>
        <p className="font-body text-base text-muted-foreground max-w-xl">
          Have a role, project partnership, or asset request in mind? Drop me a line below and let&apos;s start discussing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pt-4">
        {/* Left Column: Socials & Email info */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Direct Contact</h3>
            <a 
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-3 text-base font-semibold text-foreground hover:text-brand transition-colors duration-200"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Mail className="h-4 w-4" />
              </div>
              <span>{contactEmail}</span>
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Social Profiles</h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background hover:border-muted-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-body">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Form Block */}
        <div className="md:col-span-7 rounded-2xl border border-border bg-muted/20 p-6 md:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-300">
              <CheckCircle2 className="h-16 w-16 text-brand mb-4" />
              <h3 className="font-heading text-lg font-bold mb-2">Message Sent!</h3>
              <p className="font-body text-sm text-muted-foreground max-w-sm mb-6">
                Thank you for reaching out. Your message has been sent successfully. I will get back to you shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="rounded-xl border border-border bg-background px-6 py-2.5 text-xs font-semibold hover:bg-muted transition-colors duration-200"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {status === 'error' && (
                <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500 animate-in slide-in-from-top-2 duration-200">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>An error occurred. Please try again or email hello@alexmorgan.dev.</span>
                </div>
              )}

              {/* Name field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/20 ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-brand'
                  }`}
                />
                {errors.name && <span className="text-[11px] font-medium text-red-500 mt-0.5">{errors.name}</span>}
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@company.com"
                  className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/20 ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-brand'
                  }`}
                />
                {errors.email && <span className="text-[11px] font-medium text-red-500 mt-0.5">{errors.email}</span>}
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  rows={5}
                  className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/20 ${
                    errors.message ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-brand'
                  }`}
                />
                {errors.message && <span className="text-[11px] font-medium text-red-500 mt-0.5">{errors.message}</span>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/15 hover:bg-brand-dark hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 mt-2"
              >
                <span>{status === 'submitting' ? 'Sending Message...' : 'Send Message'}</span>
                <Send className={`h-4 w-4 ${status === 'submitting' ? 'animate-pulse' : ''}`} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
