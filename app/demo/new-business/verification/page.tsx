'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import VerificationProgress from '@/components/verification/VerificationProgress';
import ProgressBar from '@/components/ui/ProgressBar';
import { useVerification } from '@/hooks/useVerification';
import { NEW_USER_VERIFICATION_CHECKS } from '@/lib/mock-data';

export default function NewBusinessVerificationPage() {
  const router = useRouter();

  const { checks, isComplete } = useVerification(
    NEW_USER_VERIFICATION_CHECKS,
    true,
    () => {
      setTimeout(() => {
        router.push('/demo/new-business/success');
      }, 1000);
    }
  );

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="Verification" showBack={false} />

        <div className="px-5 pb-8">
          <ProgressBar current={4} total={4} className="mb-6" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VerificationProgress
              checks={checks}
              title="Verifying your application"
              subtitle="We're checking everything..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              We're verifying your identity, business registration, and running compliance checks. This usually takes less than a minute.
            </p>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
