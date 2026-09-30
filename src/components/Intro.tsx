import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { ImageLayer } from './ImageLayer';
import { ArrowRight, Terminal } from 'lucide-react';

interface IntroProps {
  onOpenApplyModal?: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onOpenApplyModal }) => {
  return (
    <section id="manifesto" className="relative w-full py-20 md:py-32 px-6 md:px-12 bg-[#07080a] border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Stamp */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-3 font-mono text-xs text-[#f59e0b] tracking-[0.25em] uppercase mb-3">
            <span>ACT 01</span>
            <span className="text-white/20">/</span>
            <span>THE MANIFESTO</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display uppercase max-w-4xl leading-[1.05] mb-12">
            WE REJECT HACKATHON THEATER. VERIFIED RUNTIMES ONLY.
          </h2>
        </ScrollReveal>

        {/* Asymmetric Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Manifesto Copy & Adjacent Quantified Proof */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <ScrollReveal direction="up" delay={0.1}>
              <p className="text-lg md:text-xl text-neutral-200 font-normal leading-relaxed text-balance">
                Most hackathons conclude with an unexecutable pitch deck and a throwaway demo. Hack for Good is engineered as an expeditionary sprint for senior engineers, researchers, and systems architects.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-4 text-sm md:text-base text-neutral-400 leading-relaxed font-sans border-l-2 border-[#f59e0b]/50 pl-6 my-2">
                <p>
                  Every participant is provisioned with sovereign infrastructure, dedicated field advisors, and audited baseline datasets. We judge exclusively on source code commits, running containers, and measurable impact telemetry.
                </p>
                <p>
                  Projects that clear our technical verification gates receive immediate seed deployment capital on Sunday evening, bypassing institutional fundraising inertia.
                </p>
              </div>
            </ScrollReveal>

            {/* Adjacent Quantitative Proof Metrics (Strict Tabular Unboxed Discipline) */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-white font-mono tabular-nums">
                    $1.2M
                  </div>
                  <div className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                    Direct Grant Pool
                  </div>
                </div>

                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-white font-mono tabular-nums">
                    32
                  </div>
                  <div className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                    Invited Squads
                  </div>
                </div>

                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-white font-mono tabular-nums">
                    100%
                  </div>
                  <div className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                    Open Source
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Directive Link */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="pt-2">
                <button
                  onClick={onOpenApplyModal}
                  className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#f59e0b] hover:text-white transition-colors group cursor-pointer"
                >
                  <span>SUBMIT CANDIDACY TO SELECTION BOARD</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Layered Viewfinder Plate with Reference Background Texture */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="fade" delay={0.2}>
              <ImageLayer
                aspectRatio="4:3"
                imageUrl="/assets/background.webp"
                frameId="FRAME-01 // MANIFESTO"
                label="AIR-GAPPED ENVIRONMENT BENCHMARK"
                subLabel="SYSTEM DEPLOYMENT TARGET"
                coordinates="20°17'46&quot;N · 85°49'28&quot;E"
                depth="deep"
                variant="viewfinder"
                midgroundContent={
                  <div className="w-full h-full p-6 flex flex-col justify-between text-neutral-200">
                    <div className="flex justify-between items-start font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#f59e0b]" />
                        <span className="text-white font-bold tracking-wider">VERIFIED RUNTIME MATRIX</span>
                      </div>
                      <span className="text-neutral-400">BUILD 4.8</span>
                    </div>

                    <div className="space-y-3 font-mono text-xs border border-white/10 p-4 bg-black/60 backdrop-blur-sm">
                      <div className="flex justify-between border-b border-white/10 pb-1.5">
                        <span className="text-neutral-400">BENCHMARK 01</span>
                        <span className="text-white font-semibold">DETERMINISTIC LATENCY &lt; 30MS</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-1.5">
                        <span className="text-neutral-400">BENCHMARK 02</span>
                        <span className="text-white font-semibold">AIR-GAPPED COMPUTE RESILIENCE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">BENCHMARK 03</span>
                        <span className="text-[#f59e0b] font-semibold">ZERO PROPRIETARY EXTERNAL APIS</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400">
                      <span>SECURE ENCLAVE ACTIVE</span>
                      <span>FIELD VERIFICATION READY</span>
                    </div>
                  </div>
                }
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
