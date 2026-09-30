import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { ArrowRight, Terminal } from 'lucide-react';

interface Benchmark {
  label: string;
  value: string;
}

interface Quote {
  text: string;
  author?: string;
}

interface StoryTextProps {
  eyebrow: string;
  heading: string;
  supportingCopy: string;
  narrativeParagraphs?: string[];
  benchmarks?: Benchmark[];
  quote?: Quote;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const StoryText: React.FC<StoryTextProps> = ({
  eyebrow,
  heading,
  supportingCopy,
  narrativeParagraphs = [],
  benchmarks = [],
  quote,
  ctaText,
  onCtaClick,
  className = '',
}) => {
  return (
    <div className={`space-y-6 md:space-y-8 select-none ${className}`}>
      {/* Eyebrow */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="flex items-center gap-2.5 font-mono text-xs text-[#f59e0b] tracking-[0.25em] uppercase">
          <Terminal className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>{eyebrow}</span>
        </div>
      </ScrollReveal>

      {/* Oversized Cinematic Heading */}
      <ScrollReveal direction="up" delay={0.15}>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-display uppercase tracking-tight leading-[0.98] text-balance">
          {heading}
        </h2>
      </ScrollReveal>

      {/* Supporting Copy */}
      <ScrollReveal direction="up" delay={0.2}>
        <p className="text-lg sm:text-xl md:text-2xl text-neutral-200 font-normal leading-snug tracking-tight text-balance border-l-2 border-[#f59e0b] pl-5 my-4">
          {supportingCopy}
        </p>
      </ScrollReveal>

      {/* Additional Cinematic Narrative Paragraphs */}
      {narrativeParagraphs.length > 0 && (
        <ScrollReveal direction="up" delay={0.25}>
          <div className="space-y-4 text-sm md:text-base text-neutral-400 font-sans leading-relaxed">
            {narrativeParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Cinematic Quote */}
      {quote && (
        <ScrollReveal direction="up" delay={0.3}>
          <div className="p-4 md:p-5 bg-white/[0.02] border border-white/10 font-mono text-xs text-neutral-300">
            <span className="text-[#f59e0b] text-base leading-none">“</span>
            <p className="italic text-neutral-200 text-sm mt-1">{quote.text}</p>
            {quote.author && (
              <span className="block mt-2 text-[10px] text-neutral-400 uppercase tracking-wider">
                — {quote.author}
              </span>
            )}
          </div>
        </ScrollReveal>
      )}

      {/* Quantitative Benchmarks / Impact Metrics */}
      {benchmarks.length > 0 && (
        <ScrollReveal direction="up" delay={0.35}>
          <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono">
            {benchmarks.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[10px] text-neutral-400 uppercase tracking-widest">{item.label}</div>
                <div className="text-lg md:text-xl font-bold text-white tabular-nums">{item.value}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Primary Action */}
      {ctaText && (
        <ScrollReveal direction="up" delay={0.4}>
          <div className="pt-2">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-3 px-6 py-3.5 border border-white/20 bg-white/[0.03] hover:bg-white text-white hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
};

export default StoryText;
