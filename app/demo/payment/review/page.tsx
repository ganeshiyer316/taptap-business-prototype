'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, Clock } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import { MOCK_FX_RATES, MOCK_CORRIDORS, MOCK_BUSINESS } from '@/lib/mock-data';
import { useSuppliers } from '@/lib/supplier-context';

function ReviewPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { suppliers } = useSuppliers();
  const supplierId = searchParams.get('supplierId') || 'sup_001';
  const amount = parseFloat(searchParams.get('amount') || '257.50');
  const reference = searchParams.get('reference') || '';

  const supplier = suppliers.find((s) => s.id === supplierId) || suppliers[0];
  const corridor = MOCK_CORRIDORS.find((c) => c.code === supplier.countryCode);
  const fxKey = `GBP-${corridor?.currency || 'GHS'}`;
  const rate = MOCK_FX_RATES[fxKey] || 19.42;
  const convertedAmount = amount * rate;

  const [isProcessing, setIsProcessing] = useState(false);
  const [rateLockSeconds, setRateLockSeconds] = useState(60);

  // Countdown timer for rate lock
  useEffect(() => {
    if (rateLockSeconds <= 0) return;

    const timer = setInterval(() => {
      setRateLockSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [rateLockSeconds]);

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push(
      `/demo/payment/processing?supplierId=${supplierId}&amount=${amount}&reference=${encodeURIComponent(reference)}`
    );
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-gray-50 flex flex-col">
        <Header title="Review Payment" />

        <div className="flex-1 px-5 pb-8">
          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm mb-4"
          >
            {/* Recipient */}
            <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-3">
                {supplier.countryFlag}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{supplier.name}</p>
                <p className="text-sm text-gray-500">{supplier.paymentMethod}</p>
              </div>
            </div>

            {/* Amount */}
            <div className="text-center py-4 mb-4 border-b border-gray-100">
              <p className="text-sm text-gray-500 mb-1">They receive</p>
              <p className="text-3xl font-bold text-tts-green">
                {corridor?.currency} {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">You pay</span>
                <span className="font-semibold text-gray-900">£{amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Exchange rate</span>
                <div className="text-right">
                  <span className="text-gray-700">1 GBP = {rate.toFixed(2)} {corridor?.currency}</span>
                  <div className={`flex items-center justify-end gap-1 mt-0.5 ${rateLockSeconds <= 15 ? 'text-orange-500' : 'text-green-600'}`}>
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-medium">
                      {rateLockSeconds > 0 ? `Locked for ${rateLockSeconds}s` : 'Rate expired - refresh'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Fee</span>
                <span className="text-tts-green font-medium">Free</span>
              </div>
              {reference && (
                <div className="flex justify-between text-sm pt-3 border-t border-gray-100">
                  <span className="text-gray-500">Reference</span>
                  <span className="font-medium text-gray-700">{reference}</span>
                </div>
              )}
              <div className="flex justify-between text-sm pt-3 border-t border-gray-100">
                <span className="text-gray-500">Estimated arrival</span>
                <span className="font-medium text-gray-700">Instant</span>
              </div>
            </div>
          </motion.div>

          {/* From Account */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm mb-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-semibold text-gray-900">{MOCK_BUSINESS.name}</p>
              </div>
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                <Check className="w-3 h-3" />
                Verified
              </div>
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-50 border border-blue-100 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                This payment will be processed securely. You'll see real-time status updates as your money moves.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-5 pb-8"
        >
          <Button
            fullWidth
            size="lg"
            onClick={handleConfirm}
            loading={isProcessing}
          >
            Confirm & Pay £{amount.toFixed(2)}
          </Button>
          <p className="text-center text-xs text-gray-400 mt-3">
            By confirming, you agree to our terms of service
          </p>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <ReviewPageContent />
    </Suspense>
  );
}
