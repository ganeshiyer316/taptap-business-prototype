'use client';

import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Send, Shield, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Button from '@/components/ui/Button';
import { MOCK_CORRIDORS } from '@/lib/mock-data';
import { useSuppliers, createSupplierFromParams } from '@/lib/supplier-context';

function SupplierSuccessContent() {
  const searchParams = useSearchParams();
  const { addSupplier } = useSuppliers();
  const [supplierId, setSupplierId] = useState<string | null>(null);

  const countryCode = searchParams.get('country') || 'GH';
  const supplierName = searchParams.get('name') || 'Supplier';
  const phone = searchParams.get('phone') || '';
  const paymentMethod = searchParams.get('paymentMethod') || '';
  const supplierType = searchParams.get('supplierType') || '';

  const corridor = MOCK_CORRIDORS.find((c) => c.code === countryCode);

  // Add supplier to context on mount (only once)
  useEffect(() => {
    if (!supplierId) {
      const supplierData = createSupplierFromParams(searchParams);
      const newId = addSupplier(supplierData);
      setSupplierId(newId);
    }
  }, [searchParams, addSupplier, supplierId]);

  return (
    <PhoneFrame>
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
              <UserCheck className="w-10 h-10 text-tts-green" strokeWidth={2} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold mb-2">Supplier Added!</h1>
            <p className="text-green-100">
              {supplierName} is ready to receive payments
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
          {/* Supplier Card */}
          <div className="flex items-center bg-gray-50 rounded-xl p-4 mb-6">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl mr-4 shadow-sm">
              {corridor?.flag}
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-lg">{supplierName}</p>
              <p className="text-sm text-gray-500">
                {corridor?.name} • {paymentMethod.replace(/_/g, ' ')}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {supplierType.replace(/_/g, ' ')} • {phone}
              </p>
            </div>
          </div>

          {/* Compliance Badge */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Compliance Verified</p>
                <p className="text-sm text-green-600 mt-1">
                  All AML and sanctions checks passed. This supplier is cleared for payments.
                </p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              What you can do now
            </p>

            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center bg-tts-green-light rounded-xl p-4"
              >
                <div className="w-10 h-10 bg-tts-green rounded-full flex items-center justify-center mr-3">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-tts-green-dark">Make a payment</p>
                  <p className="text-sm text-gray-500">Send money to {supplierName} now</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center bg-gray-50 rounded-xl p-4"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-700">Saved to your suppliers</p>
                  <p className="text-sm text-gray-500">Quick access for future payments</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link href={supplierId ? `/demo/payment/amount?supplierId=${supplierId}` : '/demo/payment/select-supplier'}>
              <Button fullWidth size="lg">
                Pay {supplierName} Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link href="/demo/supplier/add">
              <Button fullWidth variant="outline">
                Add Another Supplier
              </Button>
            </Link>

            <Link href="/demo/dashboard">
              <button className="w-full py-3 text-gray-500 text-sm text-center">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}

export default function SupplierSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-tts-green" />}>
      <SupplierSuccessContent />
    </Suspense>
  );
}
