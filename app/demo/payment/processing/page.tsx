'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import PaymentTracker from '@/components/payment/PaymentTracker';
import { usePaymentStatus } from '@/hooks/usePaymentStatus';
import { MOCK_SUPPLIERS, MOCK_FX_RATES, MOCK_CORRIDORS } from '@/lib/mock-data';

const createPaymentSteps = (supplier: typeof MOCK_SUPPLIERS[0], rate: number, currency: string) => [
  {
    id: 'step_initiated',
    status: 'pending' as const,
    title: 'Payment Initiated',
    description: "You've confirmed the payment",
  },
  {
    id: 'step_received',
    status: 'pending' as const,
    title: 'Funds Received',
    description: "We've received your payment",
  },
  {
    id: 'step_compliance',
    status: 'pending' as const,
    title: 'Compliance Checks',
    description: 'Running security checks',
    details: [
      'Transaction screening',
      `Recipient sanctions check - ${supplier.name} cleared`,
      'Source of funds verification',
      'AML risk assessment - Low risk',
    ],
  },
  {
    id: 'step_converting',
    status: 'pending' as const,
    title: 'Converting Currency',
    description: `Converting GBP → ${currency} at ${rate.toFixed(2)}`,
  },
  {
    id: 'step_sending',
    status: 'pending' as const,
    title: 'Sending to Recipient',
    description: `Sending via ${supplier.paymentMethod}`,
  },
  {
    id: 'step_delivered',
    status: 'pending' as const,
    title: 'Delivered',
    description: `${supplier.name} received the payment`,
  },
];

export default function ProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supplierId = searchParams.get('supplierId') || 'sup_001';
  const amount = searchParams.get('amount') || '257.50';
  const reference = searchParams.get('reference') || '';

  const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId) || MOCK_SUPPLIERS[0];
  const corridor = MOCK_CORRIDORS.find((c) => c.code === supplier.countryCode);
  const fxKey = `GBP-${corridor?.currency || 'GHS'}`;
  const rate = MOCK_FX_RATES[fxKey] || 19.42;

  const initialSteps = createPaymentSteps(supplier, rate, corridor?.currency || 'GHS');

  const { steps, isComplete } = usePaymentStatus(initialSteps, true, () => {
    setTimeout(() => {
      router.push(
        `/demo/payment/success?supplierId=${supplierId}&amount=${amount}&reference=${encodeURIComponent(reference)}`
      );
    }, 1500);
  });

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="Processing Payment" showBack={false} />

        <div className="px-5 pb-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                {supplier.countryFlag}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">{supplier.name}</p>
                <p className="text-sm text-gray-500">{supplier.country}</p>
              </div>
            </div>
          </motion.div>

          {/* Payment Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PaymentTracker steps={steps} expandable={true} />
          </motion.div>

          {/* Status Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            {!isComplete ? (
              <p className="text-sm text-gray-500">
                Your payment is being processed. You can tap on each step for more details.
              </p>
            ) : (
              <p className="text-sm text-green-600 font-medium">
                Payment complete! Redirecting...
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
