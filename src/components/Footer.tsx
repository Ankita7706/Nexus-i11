import React from 'react';
import { ArrowUp, MapPin } from 'lucide-react';
import { EVENT_DETAILS } from '../config/tokens';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050608] border-t border-white/10 text-neutral-400 font-mono text-xs select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Top Tier: Wordmark & Navigation Mirror */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img
              src="/gta6/hfglogo.png"
              alt="Hack For Good Logo"
              className="h-12 sm:h-14 w-auto object-contain shrink-0 drop-shadow-[0_2px_12px_rgba(196,40,40,0.3)]"
              loading="lazy"
            />
            <div>
              <a
                href="#"
                className="text-xl md:text-2xl font-bold tracking-tight text-white font-display uppercase hover:text-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
              >
                {EVENT_DETAILS.name}
              </a>
              <p className="mt-1 text-neutral-400 font-sans text-sm max-w-sm">
                {EVENT_DETAILS.tagline}. Building open, verified solutions for real-world humanitarian challenges.
              </p>
            </div>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 md:gap-8 uppercase tracking-widest text-[11px]">
            <a href="#manifesto" className="hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none">
              Manifesto
            </a>
            <a href="#challenge" className="hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none">
              The Challenge
            </a>
            <a href="#builders" className="hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none">
              The Builders
            </a>
            <a href="#protocols" className="hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none">
              Registration
            </a>
          </nav>
        </div>

        {/* Mid Tier: Event Specifications & Accreditation */}
        <div className="py-8 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="text-white font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" aria-hidden="true" /> {EVENT_DETAILS.location}
            </span>
            <span className="text-neutral-600" aria-hidden="true">·</span>
            <span>{EVENT_DETAILS.dates}</span>
            <span className="text-neutral-600" aria-hidden="true">·</span>
            <span className="text-[#f59e0b]">{EVENT_DETAILS.duration}</span>
            <span className="text-neutral-600" aria-hidden="true">·</span>
            <span>{EVENT_DETAILS.cohort}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] text-neutral-300">
              MIT / APACHE 2.0 LICENSED
            </span>
            <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] text-[#f59e0b]">
              VERIFIED PUBLIC GOOD
            </span>
          </div>
        </div>

        {/* Bottom Tier: Legal, Bhubaneswar Coordinates & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div className="flex items-center gap-4">
            <span>© 2026 {EVENT_DETAILS.name}</span>
            <span aria-hidden="true">·</span>
            <span>BHUBANESWAR CHAPTER</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="hidden sm:inline">ALL PROJECTS OPEN SOURCE</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-neutral-500 font-mono">{EVENT_DETAILS.coordinates}</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors uppercase tracking-wider group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform text-[#f59e0b]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
