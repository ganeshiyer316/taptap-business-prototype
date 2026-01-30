'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import VerificationProgress from '@/components/verification/VerificationProgress';
import { useVerification } from '@/hooks/useVerification';
import { EXISTING_USER_VERIFICATION_CHECKS } from '@/lib/mock-data';

export default function VerificationPage() {
  const router = useRouter();

  const { checks, isComplete } = useVerification(
    EXISTING_USER_VERIFICATION_CHECKS,
    true,
    () => {
      // Navigate to success after a brief delay
      setTimeout(() => {
        router.push('/demo/existing-user/success');
      }, 1000);
    }
  );

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="Verification" showBack={false} />

        <div className="px-5 pb-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step 2 of 2</span>
              <span>Verification</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-tts-green rounded-full"
                initial={{ width: '50%' }}
                animate={{ width: isComplete ? '100%' : '75%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Verification Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VerificationProgress
              checks={checks}
              title="Verifying your business"
              subtitle="This usually takes a few seconds"
            />
          </motion.div>

          {/* Info Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              We're checking your business registration with Companies House and running compliance checks.
            </p>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
