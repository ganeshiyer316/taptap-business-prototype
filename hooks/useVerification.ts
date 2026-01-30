'use client';

import { useState, useEffect, useCallback } from 'react';
import { VerificationCheck } from '@/lib/types';
import { ANIMATION_DELAYS } from '@/lib/constants';

export function useVerification(
  initialChecks: VerificationCheck[],
  autoProgress = true,
  onComplete?: () => void
) {
  const [checks, setChecks] = useState<VerificationCheck[]>(initialChecks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const startVerification = useCallback(() => {
    // Set first non-complete check to 'checking'
    const firstPendingIndex = checks.findIndex(c => c.status === 'pending');
    if (firstPendingIndex >= 0) {
      setCurrentIndex(firstPendingIndex);
      setChecks(prev =>
        prev.map((check, i) =>
          i === firstPendingIndex ? { ...check, status: 'checking' as const } : check
        )
      );
    }
  }, [checks]);

  useEffect(() => {
    if (!autoProgress || isComplete) return;

    // Start verification if not started
    const hasChecking = checks.some(c => c.status === 'checking');
    const allComplete = checks.every(c => c.status === 'complete');

    if (allComplete) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    if (!hasChecking && checks.some(c => c.status === 'pending')) {
      startVerification();
      return;
    }

    // Progress current check
    const timer = setTimeout(() => {
      setChecks(prev => {
        const newChecks = [...prev];
        const checkingIndex = newChecks.findIndex(c => c.status === 'checking');

        if (checkingIndex >= 0) {
          // Complete current check
          newChecks[checkingIndex] = {
            ...newChecks[checkingIndex],
            status: 'complete',
            completedAt: new Date().toISOString(),
          };

          // Start next check if available
          const nextPendingIndex = newChecks.findIndex(c => c.status === 'pending');
          if (nextPendingIndex >= 0) {
            newChecks[nextPendingIndex] = {
              ...newChecks[nextPendingIndex],
              status: 'checking',
            };
            setCurrentIndex(nextPendingIndex);
          }
        }

        return newChecks;
      });
    }, ANIMATION_DELAYS.verificationStep);

    return () => clearTimeout(timer);
  }, [checks, autoProgress, isComplete, onComplete, startVerification]);

  const reset = () => {
    setChecks(initialChecks);
    setCurrentIndex(0);
    setIsComplete(false);
  };

  return {
    checks,
    currentIndex,
    isComplete,
    startVerification,
    reset,
  };
}
