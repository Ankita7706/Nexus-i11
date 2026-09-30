import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { EVENT_DETAILS, CHALLENGE_TRACKS } from '../config/tokens';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [squadName, setSquadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [track, setTrack] = useState<string>(CHALLENGE_TRACKS[0].id);
  const [brief, setBrief] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !leadEmail.includes('@')) {
      setError('Please provide a valid engineering lead email address.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSquadName('');
    setLeadEmail('');
    setRepoUrl('');
    setBrief('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-xl bg-[#0d0e12] border border-white/20 p-6 sm:p-8 shadow-2xl">
        {/* Viewfinder Corner Accents */}
        <div className="absolute top-2 left-2 font-mono text-white/30 text-xs pointer-events-none">⌜</div>
        <div className="absolute top-2 right-2 font-mono text-white/30 text-xs pointer-events-none">⌝</div>
        <div className="absolute bottom-2 left-2 font-mono text-white/30 text-xs pointer-events-none">⌞</div>
        <div className="absolute bottom-2 right-2 font-mono text-white/30 text-xs pointer-events-none">⌟</div>

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/gta6/hfglogo.png"
              alt="Hack For Good Logo"
              className="h-10 sm:h-11 w-auto object-contain shrink-0"
            />
            <div>
              <div className="font-mono text-xs text-[#f59e0b] tracking-widest uppercase">
                {EVENT_DETAILS.name} // {EVENT_DETAILS.location}
              </div>
              <h3 id="app-modal-title" className="text-xl font-bold text-white font-display uppercase tracking-tight mt-0.5">
                SQUAD REGISTRATION
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 border border-[#f59e0b] bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-display uppercase tracking-wider">
              REGISTRATION RECEIVED
            </h4>
            <p className="text-xs font-mono text-neutral-300 max-w-md mx-auto leading-relaxed">
              Squad <span className="text-white font-bold">{squadName || 'Registered'}</span> has been confirmed for {EVENT_DETAILS.name} in Bhubaneswar. Confirmation packet has been dispatched to your email.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#ffd3dd] via-[#fee2e2] to-[#ffedd5] text-[#0f1016] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-105 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
            >
              CLOSE CONFIRMATION
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-mono text-xs">
            <div>
              <label htmlFor="modal-squad" className="block text-neutral-400 text-[11px] uppercase tracking-wider mb-1.5">
                Squad Name / Collective
              </label>
              <input
                id="modal-squad"
                type="text"
                required
                placeholder="e.g. Apex Systems Team"
                value={squadName}
                onChange={(e) => setSquadName(e.target.value)}
                className="w-full bg-[#121318] border border-white/10 px-3.5 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#f59e0b] focus-visible:ring-1 focus-visible:ring-[#f59e0b] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modal-email" className="block text-neutral-400 text-[11px] uppercase tracking-wider mb-1.5">
                  Lead Engineer Email
                </label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  placeholder="lead@domain.org"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="w-full bg-[#121318] border border-white/10 px-3.5 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#f59e0b] focus-visible:ring-1 focus-visible:ring-[#f59e0b] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="modal-track" className="block text-neutral-400 text-[11px] uppercase tracking-wider mb-1.5">
                  Target Track
                </label>
                <select
                  id="modal-track"
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
            </div>

            <div>
              <label htmlFor="modal-repo" className="block text-neutral-400 text-[11px] uppercase tracking-wider mb-1.5">
                Primary GitHub / Source Portfolio
              </label>
              <input
                id="modal-repo"
                type="url"
                placeholder="https://github.com/org-or-lead"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full bg-[#121318] border border-white/10 px-3.5 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#f59e0b] focus-visible:ring-1 focus-visible:ring-[#f59e0b] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="modal-brief" className="block text-neutral-400 text-[11px] uppercase tracking-wider mb-1.5">
                Technical Thesis (1–2 Sentences)
              </label>
              <textarea
                id="modal-brief"
                rows={2}
                placeholder="Describe your core architecture and what verified outcome you intend to ship in 48 hours..."
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="w-full bg-[#121318] border border-white/10 px-3.5 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#f59e0b] focus-visible:ring-1 focus-visible:ring-[#f59e0b] transition-colors resize-none"
              />
            </div>

            {error && <div className="text-red-400 text-[11px]" role="alert">{error}</div>}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-neutral-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gradient-to-r from-[#ffd3dd] via-[#fee2e2] to-[#ffedd5] text-[#0f1016] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:outline-none rounded-sm"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING...</span>
                ) : (
                  <>
                    <span>REGISTER NOW</span>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;
