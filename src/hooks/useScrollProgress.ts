import { useState, useEffect, useCallback, useRef } from 'react';
import { gatewayScroll, ScrollSubscriber } from '../animation/gatewayScroll';

/**
 * useScrollProgress Hook
 *
 * Exposes the normalized scroll progress (0 → 1) synchronized across:
 * - GatewayScene
 * - LetterMesh
 * - GatewayOverlay
 * - ModernWorld
 *
 * Respects prefers-reduced-motion and provides clean subscriber lifecycle management.
 */
export function useScrollProgress() {
  const [progress, setProgressState] = useState<number>(() => gatewayScroll.getProgress());
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => gatewayScroll.getIsReducedMotion());
  const progressRef = useRef<number>(progress);

  useEffect(() => {
    // Keep ref in sync
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const unsubscribe = gatewayScroll.subscribe((newProgress) => {
      progressRef.current = newProgress;
      setProgressState(newProgress);
      setIsReducedMotion(gatewayScroll.getIsReducedMotion());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * Update the global normalized progress (0 → 1)
   */
  const updateProgress = useCallback((val: number, velocity?: number) => {
    gatewayScroll.setProgress(val, velocity);
  }, []);

  /**
   * Direct high-performance callback subscription (bypassing React re-renders if needed)
   */
  const subscribeDirect = useCallback((callback: ScrollSubscriber) => {
    return gatewayScroll.subscribe(callback);
  }, []);

  return {
    progress,
    progressRef,
    isReducedMotion,
    setProgress: updateProgress,
    subscribe: subscribeDirect,
  };
}

export default useScrollProgress;
