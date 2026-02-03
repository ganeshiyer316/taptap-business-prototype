'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import ProgressBar from '@/components/ui/ProgressBar';
import VerificationProgress from '@/components/verification/VerificationProgress';
import { useVerification } from '@/hooks/useVerification';
import { MOCK_CORRIDORS } from '@/lib/mock-data';
import type { VerificationCheck } from '@/lib/types';

function VerifySupplierContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const countryCode = searchParams.get('country') || 'GH';
  const supplierName = searchParams.get('name') || 'Supplier';
  const phone = searchParams.get('phone') || '';
  const paymentMethod = searchParams.get('paymentMethod') || '';
  const supplierType = searchParams.get('supplierType') || '';

  const corridor = MOCK_CORRIDORS.find((c) => c.code === countryCode);

  // Create verification checks specific to this supplier
  const supplierVerificationChecks: VerificationCheck[] = [
    {
      id: 'check_sanctions',
      name: 'Sanctions Screening',
      description: `Checking ${supplierName} against global sanctions lists`,
      status: 'pending',
    },
    {
      id: 'check_pep',
      name: 'PEP Check',
      description: 'Politically Exposed Persons screening',
      status: 'pending',
    },
    {
      id: 'check_adverse_media',
      name: 'Adverse Media',
      description: 'Scanning for negative news or reports',
      status: 'pending',
    },
    {
      id: 'check_country_risk',
      name: 'Country Risk Assessment',
      description: `Evaluating ${corridor?.name || 'destination'} risk level`,
      status: 'pending',
    },
    {
      id: 'check_payment_method',
      name: 'Payment Method Validation',
      description: `Verifying ${paymentMethod.replace(/_/g, ' ')} details`,
      status: 'pending',
    },
  ];

  const { checks, isComplete } = useVerification(
    supplierVerificationChecks,
    true,
    () => {
      // Navigate to success after a brief delay
      setTimeout(() => {
        const params = new URLSearchParams({
          country: countryCode,
          name: supplierName,
          phone,
          paymentMethod,
          supplierType,
        });
        router.push(`/demo/supplier/add/success?${params.toString()}`);
      }, 1000);
    }
  );

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="Verifying Supplier" showBack={false} />

        <div className="px-5 pb-8">
          <ProgressBar current={3} total={3} className="mb-6" />

          {/* Supplier Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center bg-gray-50 rounded-xl p-4 mb-6"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl mr-3 shadow-sm">
              {corridor?.flag}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{supplierName}</p>
              <p className="text-sm text-gray-500">
                {corridor?.name} • {supplierType.replace(/_/g, ' ')}
              </p>
            </div>
          </motion.div>

          {/* Verification Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VerificationProgress
              checks={checks}
              title="Running compliance checks"
              subtitle="Ensuring your supplier meets AML requirements"
            />
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                <strong>Why we verify suppliers:</strong> As a regulated business, we're required to screen all payment recipients against global sanctions lists and conduct anti-money laundering checks to prevent financial crime.
              </p>
            </div>
          </motion.div>

          {/* Status Message */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-green-600 font-medium">
                All checks passed! Redirecting...
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function VerifySupplierPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VerifySupplierContent />
    </Suspense>
  );
}
