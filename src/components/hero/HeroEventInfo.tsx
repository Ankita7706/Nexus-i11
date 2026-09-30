import React, { forwardRef } from 'react';
import { heroContent } from '../../config/heroContent';

interface HeroEventInfoProps {
  className?: string;
}

/**
 * HeroEventInfo component.
 * Small independent information block positioned on the upper-right of the hero.
 * Shows event date, month, venue, and city with thin geometric separators.
 * Kept entirely decoupled from the title so it can be edited or replaced independently.
 */
export const HeroEventInfo = forwardRef<HTMLDivElement, HeroEventInfoProps>(
  ({ className = '' }, ref) => {
    const { dates, monthYear, venue, city } = heroContent.eventInfo;

    return (
      <aside
        ref={ref}
        data-hero="event-info"
        aria-label="Event Schedule & Location"
        className={`hero-event-info select-none pointer-events-auto ${className}`}
      >
        <div className="flex flex-col items-end text-right font-mono text-[10px] sm:text-xs tracking-[0.24em] text-[#fbf7ee]">
          {/* Dates & Month/Year Row */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm sm:text-base text-[#fbf7ee] tracking-widest tabular-nums">
              {dates}
            </span>
            <span className="text-[#c42828] font-bold">/</span>
            <span className="text-neutral-300 uppercase tracking-widest">
              {monthYear}
            </span>
          </div>

          {/* Subtle Tribal / Geometric Divider */}
          <div className="w-24 sm:w-28 my-1.5 flex items-center justify-end gap-1.5 opacity-60">
            <div className="h-[1px] flex-1 bg-gradient-to-l from-white/40 to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#c42828] bg-black/60" />
          </div>

          {/* Venue & Location */}
          <div className="space-y-0.5 text-neutral-300/90 text-[9px] sm:text-[10px] uppercase">
            <div className="font-medium tracking-[0.22em] text-[#fbf7ee]/90">
              {venue}
            </div>
            <div className="tracking-[0.26em] text-neutral-400">
              {city}
            </div>
          </div>
        </div>
      </aside>
    );
  }
);

HeroEventInfo.displayName = 'HeroEventInfo';
export default HeroEventInfo;
