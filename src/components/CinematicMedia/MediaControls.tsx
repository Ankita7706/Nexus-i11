import React, { forwardRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { mediaContent } from '../../data/mediaContent';

interface MediaControlsProps {
  className?: string;
  isPlaying: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  currentTime: number;
  duration: number;
  progressPercent: number;
  isVisible: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onSeek: (percent: number) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * MediaControls component.
 * 
 * Understated, highly transparent film interface strip along the bottom:
 * - FRAME 02
 * - PLAY / PAUSE FILM
 * - Scrubbable time progress bar
 * - 00:00 / 01:24
 * - A BRIGHTER TOMORROW // HACK FOR GOOD
 * - Audio Mute & Fullscreen triggers
 */
export const MediaControls = forwardRef<HTMLDivElement, MediaControlsProps>(
  (
    {
      className = '',
      isPlaying,
      isMuted,
      isFullscreen,
      currentTime,
      duration,
      progressPercent,
      isVisible,
      onTogglePlay,
      onToggleMute,
      onToggleFullscreen,
      onSeek,
    },
    ref
  ) => {
    const { bottomBar } = mediaContent;

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
      onSeek(percent);
    };

    return (
      <footer
        ref={ref}
        data-layer="media-controls-bottom-bar"
        aria-label="Cinematic Film Controls"
        className={`relative z-30 w-full px-6 sm:px-12 md:px-16 pb-6 sm:pb-8 flex flex-col gap-3 select-none transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-20 hover:opacity-100 pointer-events-auto'
        } ${className}`}
      >
        {/* Film Scrub Bar */}
        <div
          onClick={handleProgressClick}
          className="group relative w-full h-1.5 hover:h-2.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition-all duration-200"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
          aria-label="Seek film playback progress"
        >
          {/* Active progress fill */}
          <div
            className="h-full bg-gradient-to-r from-[#c42828] to-[#f59e0b] rounded-full relative"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Playhead thumb */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white shadow-[0_0_8px_rgba(245,158,11,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Control Strip Metadata Row */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-neutral-400 tracking-[0.22em] uppercase">
          {/* Left: Frame ID & Quick Play Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[#c42828] font-bold">{bottomBar.frameId}</span>
            <span className="text-neutral-600">/</span>
            <button
              type="button"
              onClick={onTogglePlay}
              className="flex items-center gap-1.5 text-[#fbf7ee] hover:text-[#f59e0b] transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'PAUSE FILM' : bottomBar.actionLabel}</span>
            </button>
          </div>

          {/* Center: Live Time / Duration Indicator */}
          <div className="hidden sm:flex items-center gap-2 tabular-nums text-neutral-300">
            <span>{formatTime(currentTime)}</span>
            <span className="text-neutral-600">/</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Right: Film Tagline & Utility Actions */}
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-neutral-500 font-sans tracking-widest text-[11px]">
              {bottomBar.tagline}
            </span>

            {/* Mute Button */}
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              className="p-1 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#c42828]" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={onToggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              className="p-1 hover:text-white transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-[#f59e0b]" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </footer>
    );
  }
);

MediaControls.displayName = 'MediaControls';
export default MediaControls;
