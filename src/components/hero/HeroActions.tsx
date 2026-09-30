import React, { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { heroContent } from '../../config/heroContent';

interface HeroActionsProps {
  onExploreClick?: () => void;
  onRegisterClick?: () => void;
  className?: string;
}

/**
 * HeroActions component.
 * Real HTML CTA buttons following the cinematic poster aesthetic:
 * - Primary: Crimson red, warm light text, medium rounded corners, subtle hover lift & subtle crimson glow.
 * - Secondary: Transparent, thin warm ivory border, warm ivory text.
 * Strictly avoids SaaS pill buttons or excessive glassmorphism.
 */
export const HeroActions = forwardRef<HTMLDivElement, HeroActionsProps>(
  ({ onExploreClick, onRegisterClick, className = '' }, ref) => {
    const { primary, secondary } = heroContent.actions;

    return (
      <div
        ref={ref}
        data-hero="actions"
        className={`hero-actions flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 select-none ${className}`}
      >
        {/* Primary CTA: Crimson Red with subtle glow & lift */}
        <button
          type="button"
          data-hero="action-btn"
          onClick={onExploreClick}
          className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 bg-[#c42828] hover:bg-[#d93232] text-[#fbf7ee] font-mono text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase rounded-[6px] shadow-[0_4px_20px_rgba(196,40,40,0.35)] hover:shadow-[0_6px_28px_rgba(196,40,40,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbf7ee]"
          style={{
            minHeight: 'var(--hero-button-height)',
          }}
        >
          <span>{primary.label}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        {/* Secondary CTA: Transparent with thin warm ivory border */}
        <button
          type="button"
          data-hero="action-btn"
          onClick={onRegisterClick}
          className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 bg-transparent hover:bg-white/[0.06] border border-[#fbf7ee]/45 hover:border-[#fbf7ee] text-[#fbf7ee] font-mono text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase rounded-[6px] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c42828]"
          style={{
            minHeight: 'var(--hero-button-height)',
          }}
        >
          <span>{secondary.label}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 opacity-70 group-hover:opacity-100" />
        </button>
      </div>
    );
  }
);

HeroActions.displayName = 'HeroActions';
export default HeroActions;
