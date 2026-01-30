'use client';

import { VerificationCheck } from '@/lib/types';
import VerificationStep from './VerificationStep';

interface VerificationProgressProps {
  checks: VerificationCheck[];
  title?: string;
  subtitle?: string;
}

export default function VerificationProgress({
  checks,
  title = 'Verifying your business',
  subtitle = 'This usually takes a few seconds',
}: VerificationProgressProps) {
  const completedCount = checks.filter((c) => c.status === 'complete').length;
  const totalCount = checks.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-500 mt-1">{subtitle}</p>
        <p className="text-sm text-tts-green font-medium mt-2">
          {completedCount} of {totalCount} complete
        </p>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-tts-green rounded-full transition-all duration-500"
          style={{ width: `${(completedCount / totalCount) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {checks.map((check, index) => (
          <VerificationStep
            key={check.id}
            title={check.name}
            description={check.description}
            status={check.status}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
}
