import React, { useState } from 'react';
import { SectionTransition } from './SectionTransition';
import { CheckCircle2, Clock, Send } from 'lucide-react';
import { EVENT_DETAILS, CHALLENGE_TRACKS } from '../config/tokens';

interface CTAProps {
  onOpenApplyModal?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenApplyModal }) => {
  const [email, setEmail] = useState('');
  const [squadName, setSquadName] = useState('');
  const [track, setTrack] = useState<string>(CHALLENGE_TRACKS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid builder email.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="protocols" aria-label="Registration" className="relative w-full py-20 md:py-32 bg-[#07080a] border-b border-white/10 select-none">
      <SectionTransition
        actNumber="REGISTRATION"
        title="REGISTER FOR HACK FOR GOOD"
        tagline="Bhubaneswar, India · 36–48 Hours Sprint · Technology • Innovation • Impact"
        coordinates="20.2961° N · 85.8245° E"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Main Widescreen Cinematic Call-To-Action Box */}
        <div className="relative border border-white/15 bg-gradient-to-b from-[#111218] via-[#0b0c10] to-[#07080a] p-6 sm:p-8 md:p-14 lg:p-16 overflow-hidden">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Glowing cinematic accent */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Viewfinder Corner Markings */}
          <div className="absolute top-4 left-4 font-mono text-white/30 text-xs pointer-events-none">⌜</div>
          <div className="absolute top-4 right-4 font-mono text-white/30 text-xs pointer-events-none">⌝</div>
          <div className="absolute bottom-4 left-4 font-mono text-white/30 text-xs pointer-events-none">⌞</div>
          <div className="absolute bottom-4 right-4 font-mono text-white/30 text-xs pointer-events-none">⌟</div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs text-[#f59e0b] tracking-[0.25em] uppercase">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>REGISTRATION OPEN // {EVENT_DETAILS.dates}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display uppercase tracking-tight leading-[1.05]">
                {EVENT_DETAILS.headline}
              </h3>

              <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-xl font-sans">
                {EVENT_DETAILS.supportingText} Join 500+ builders in Bhubaneswar for 36–48 unbroken hours of high-impact engineering.
              </p>

              {/* Strict Tabular Adjacency Metrics */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-white/10 font-mono">
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">Cohort</div>
                  <div className="text-lg md:text-xl font-bold text-white tabular-nums">120 Squads</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">Location</div>
                  <div className="text-lg md:text-xl font-bold text-white">Bhubaneswar</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">Grant Pool</div>
                  <div className="text-lg md:text-xl font-bold text-[#f59e0b] tabular-nums">$1.2M Direct</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form Box (5 Cols) */}
            <div className="lg:col-span-5 bg-black/60 border border-white/10 p-5 sm:p-6 md:p-8">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-wider font-display">
                    REGISTRATION RECEIVED
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                    Squad registration recorded for <span className="text-white font-semibold">{email}</span>. Confirmation packet dispatched to your inbox.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-mono text-[#f59e0b] underline uppercase tracking-wider cursor-pointer focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
                  >
                    Submit Another Squad
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label htmlFor="cta-email" className="block text-neutral-400 text-[11px] uppercase tracking-wider mb-1.5">
                      Lead Builder / Engineer Email
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      required
                      value={email}
                      placeholder="builder@domain.org"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#121318] border border-white/10 px-3.5 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#f59e0b] focus-visible:ring-1 focus-visible:ring-[#f59e0b] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="cta-squad" className="block text-neutral-400 text-[11px] uppercase tracking-wider mb-1.5">
                      Squad / Project Name
                    </label>
                    <input
                      id="cta-squad"
                      type="text"
                      required
                      value={squadName}
                      placeholder="e.g. Apex Mesh Systems"
                      onChange={(e) => setSquadName(e.target.value)}
                      className="w-full bg-[#121318] border border-white/10 px-3.5 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#f59e0b] focus-visible:ring-1 focus-visible:ring-[#f59e0b] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="cta-track" className="block text-neutral-400 text-[11px] uppercase tracking-wider mb-1.5">
                      Primary Challenge Track
                    </label>
                    <select
                      id="cta-track"
                      value={track}
                      onChange={(e) => setTrack(e.target.value)}
                      className="w-full bg-[#121318] border border-white/10 px-3.5 py-2.5 text-white focus:outline-none focus:border-[#f59e0b] focus-visible:ring-1 focus-visible:ring-[#f59e0b] transition-colors"
                    >
                      {CHALLENGE_TRACKS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.number}. {t.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {errorMessage && (
                    <div className="text-red-400 text-[11px] pt-1" role="alert">{errorMessage}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#ffd3dd] via-[#fee2e2] to-[#ffedd5] text-[#0f1016] font-mono font-bold uppercase tracking-wider hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 rounded-sm focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING REGISTRATION...</span>
                    ) : (
                      <>
                        <span>REGISTER NOW</span>
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-2 border-t border-white/5">
                    <span>VERIFIED SUBMISSION</span>
                    <span>NO COMMERCIAL ADS</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Accreditation & Event Specifications Strip */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 font-mono text-xs text-neutral-400">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <span className="text-white font-medium">SPECIFICATIONS:</span>
              <span className="text-neutral-300">{EVENT_DETAILS.location}</span>
              <span className="text-neutral-600" aria-hidden="true">|</span>
              <span className="text-[11px] text-[#f59e0b]">{EVENT_DETAILS.duration}</span>
              <span className="text-neutral-600" aria-hidden="true">|</span>
              <span className="text-[11px] text-neutral-300">500+ BUILDERS</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-[#f59e0b] to-[#ef4444] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#07080a] flex items-center justify-center font-bold text-[10px] text-white">
                  {EVENT_DETAILS.brandMark}
                </div>
              </div>
              <div className="text-[10px] leading-tight text-neutral-400">
                <span className="text-white font-bold block">OPEN SOURCE CRUCIBLE</span>
                <span>{EVENT_DETAILS.tagline}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
