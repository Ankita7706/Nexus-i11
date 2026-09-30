import React, { forwardRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { heroContent } from '../../config/heroContent';

interface HeroNavigationProps {
  onRegisterClick?: () => void;
  className?: string;
}

/**
 * HeroNavigation component.
 * Minimal, understated cinematic navigation bar sitting at the top of the hero.
 * Real HTML links, responsive mobile overlay, cleanly separated from title elements.
 */
export const HeroNavigation = forwardRef<HTMLElement, HeroNavigationProps>(
  ({ onRegisterClick, className = '' }, ref) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { brand, links, cta } = heroContent.navigation;

    return (
      <header
        ref={ref}
        data-hero="nav"
        role="banner"
        className={`hero-navigation w-full z-40 select-none ${className}`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 sm:py-6 flex items-center justify-between">
          {/* LEFT: Brand / Logo */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="group flex items-center gap-2.5 sm:gap-3 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c42828]"
              aria-label={`${brand.name} Home`}
            >
              {/* Exact Hack For Good Logo Image from gta6 folder */}
              <img
                src={brand.logoUrl || '/gta6/hfglogo.png'}
                alt="Hack For Good Official Logo"
                className="h-10 sm:h-12 md:h-13 w-auto object-contain shrink-0 drop-shadow-[0_2px_12px_rgba(196,40,40,0.35)] transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xs sm:text-sm tracking-[0.2em] text-[#fbf7ee] uppercase">
                  {brand.name}
                </span>
                <span className="font-mono text-[9px] text-neutral-400 tracking-[0.25em] uppercase hidden xs:inline">
                  {brand.tagline}
                </span>
              </div>
            </a>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav
            aria-label="Hero Main Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] tracking-[0.22em] text-[#e0dad0]/80"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors duration-200 uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c42828] hover:after:w-full after:transition-all after:duration-250 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c42828]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* RIGHT: Primary Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onRegisterClick}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-transparent hover:bg-white/[0.06] border border-white/30 hover:border-[#fbf7ee] text-[#fbf7ee] font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c42828]"
            >
              <span>{cta.label}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white border border-white/20 bg-black/40 backdrop-blur-sm cursor-pointer focus-visible:ring-1 focus-visible:ring-[#c42828]"
              aria-expanded={mobileOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-50 bg-[#07080a]/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col justify-between">
            <nav className="flex flex-col gap-4 font-mono text-xs tracking-[0.25em] text-[#ededed]">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 border-b border-white/10 hover:text-[#c42828] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onRegisterClick?.();
              }}
              className="w-full py-3 bg-[#c42828] text-white font-mono text-xs tracking-[0.25em] uppercase text-center mt-6 shadow-lg"
            >
              {cta.label}
            </button>
          </div>
        )}
      </header>
    );
  }
);

HeroNavigation.displayName = 'HeroNavigation';
export default HeroNavigation;
