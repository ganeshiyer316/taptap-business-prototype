'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Download, Share2, MessageCircle, ArrowRight, X, Smartphone, Vibrate, Copy, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Button from '@/components/ui/Button';
import { MOCK_SUPPLIERS, MOCK_FX_RATES, MOCK_CORRIDORS, MOCK_BUSINESS } from '@/lib/mock-data';

function PaymentSuccessPageContent() {
  const searchParams = useSearchParams();
  const supplierId = searchParams.get('supplierId') || 'sup_001';
  const amount = parseFloat(searchParams.get('amount') || '257.50');
  const reference = searchParams.get('reference') || 'INV-2024-001';

  const [showSmsToast, setShowSmsToast] = useState(false);
  const [copied, setCopied] = useState(false);

  const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId) || MOCK_SUPPLIERS[0];
  const corridor = MOCK_CORRIDORS.find((c) => c.code === supplier.countryCode);
  const fxKey = `GBP-${corridor?.currency || 'GHS'}`;
  const rate = MOCK_FX_RATES[fxKey] || 19.42;
  const convertedAmount = amount * rate;

  const [transactionId] = useState(`TTS-BUS-${Date.now().toString().slice(-10)}`);
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Show SMS toast notification after delay
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowSmsToast(true);
    }, 1500);

    const hideTimer = setTimeout(() => {
      setShowSmsToast(false);
    }, 4500); // Show for 3 seconds

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleCopyTransactionId = async () => {
    try {
      await navigator.clipboard.writeText(transactionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <PhoneFrame>
      {/* SMS Toast Notification */}
      <AnimatePresence>
        {showSmsToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[340px]"
          >
            <div className="bg-blue-600 text-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {supplier.name} has been notified via SMS
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Vibrate className="w-3 h-3 text-white/70" />
                  <span className="text-xs text-white/70">Recipient received notification</span>
                </div>
              </div>
              <button
                onClick={() => setShowSmsToast(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-full bg-gradient-to-b from-tts-green to-tts-green-dark">
        {/* Success Header */}
        <div className="px-5 pt-8 pb-6 text-white text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            >
              <Check className="w-10 h-10 text-tts-green" strokeWidth={3} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold mb-2">Payment Sent!</h1>
            <p className="text-green-100">
              {supplier.name} received the payment
            </p>
          </motion.div>
        </div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-t-3xl px-5 py-6 min-h-[500px]"
        >
          {/* Amount Display */}
          <div className="text-center mb-6 pb-6 border-b border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Amount received</p>
            <p className="text-4xl font-bold text-gray-900">
              {corridor?.currency} {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              (£{amount.toFixed(2)} at {rate.toFixed(2)})
            </p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">To</span>
              <span className="font-medium text-gray-900">{supplier.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Via</span>
              <span className="text-gray-700">{supplier.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Reference</span>
              <span className="text-gray-700">{reference || 'None'}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Transaction ID</span>
              <button
                onClick={handleCopyTransactionId}
                className="flex items-center gap-1.5 font-mono text-gray-700 text-xs hover:text-tts-green transition-colors"
              >
                {transactionId}
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="text-gray-700">{formattedDate}, {formattedTime}</span>
            </div>
          </div>

          {/* Notification Sent */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-blue-800">Notification sent</p>
                <p className="text-sm text-blue-600 mt-1">
                  {supplier.name} received an SMS confirming {corridor?.currency} {convertedAmount.toFixed(0)} from {MOCK_BUSINESS.name}
                </p>
                {reference && (
                  <p className="text-xs text-blue-500 mt-1">Reference: {reference}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Receipt
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Back to Dashboard */}
          <Link href="/demo/dashboard">
            <Button fullWidth size="lg">
              Back to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          {/* Repeat Payment to Same Supplier */}
          <Link href={`/demo/payment/amount?supplierId=${supplierId}`}>
            <button className="w-full mt-3 py-3 text-tts-green font-medium text-center flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Pay {supplier.name} again
            </button>
          </Link>

          {/* Make Another Payment */}
          <Link href="/demo/payment/select-supplier">
            <button className="w-full py-2 text-gray-500 text-sm text-center">
              Pay different supplier
            </button>
          </Link>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-tts-green" />}>
      <PaymentSuccessPageContent />
    </Suspense>
  );
}
