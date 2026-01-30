'use client';

import { useState, useEffect, useCallback } from 'react';
import { PaymentStep } from '@/lib/types';
import { STEP_DELAYS } from '@/lib/constants';

export function usePaymentStatus(
  initialSteps: PaymentStep[],
  autoProgress = true,
  onComplete?: () => void
) {
  const [steps, setSteps] = useState<PaymentStep[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const startPayment = useCallback(() => {
    // Set first step to current
    setSteps(prev =>
      prev.map((step, i) =>
        i === 0 ? { ...step, status: 'current' as const, timestamp: 'Just now' } : step
      )
    );
  }, []);

  useEffect(() => {
    if (!autoProgress || isComplete) return;

    // Start payment if first step is pending
    if (steps[0]?.status === 'pending') {
      startPayment();
      return;
    }

    // Check if all complete
    if (steps.every(s => s.status === 'complete')) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    // Progress to next step
    const timer = setTimeout(() => {
      setSteps(prev => {
        const newSteps = [...prev];
        const currentIndex = newSteps.findIndex(s => s.status === 'current');

        if (currentIndex >= 0 && currentIndex < newSteps.length - 1) {
          // Complete current step
          newSteps[currentIndex] = {
            ...newSteps[currentIndex],
            status: 'complete',
            timestamp: 'Just now',
          };
          // Set next step as current
          newSteps[currentIndex + 1] = {
            ...newSteps[currentIndex + 1],
            status: 'current',
            timestamp: 'In progress',
          };
          setCurrentStep(currentIndex + 1);
        } else if (currentIndex === newSteps.length - 1) {
          // Complete final step
          newSteps[currentIndex] = {
            ...newSteps[currentIndex],
            status: 'complete',
            timestamp: 'Just now',
          };
        }

        return newSteps;
      });
    }, STEP_DELAYS[currentStep] || 1500);

    return () => clearTimeout(timer);
  }, [steps, currentStep, autoProgress, isComplete, onComplete, startPayment]);

  const reset = () => {
    setSteps(initialSteps);
    setCurrentStep(0);
    setIsComplete(false);
  };

  return {
    steps,
    currentStep,
    isComplete,
    startPayment,
    reset,
  };
}
