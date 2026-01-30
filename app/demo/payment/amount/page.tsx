'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import AmountInput from '@/components/payment/AmountInput';
import FXDisplay from '@/components/payment/FXDisplay';
import Input from '@/components/ui/Input';
import { MOCK_SUPPLIERS, MOCK_FX_RATES, MOCK_CORRIDORS } from '@/lib/mock-data';

export default function AmountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supplierId = searchParams.get('supplierId') || 'sup_001';

  const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId) || MOCK_SUPPLIERS[0];
  const corridor = MOCK_CORRIDORS.find((c) => c.code === supplier.countryCode);
  const fxKey = `GBP-${corridor?.currency || 'GHS'}`;
  const rate = MOCK_FX_RATES[fxKey] || 19.42;

  const [amount, setAmount] = useState('257.50');
  const [reference, setReference] = useState('');

  const numericAmount = parseFloat(amount) || 0;
  const convertedAmount = numericAmount * rate;

  const handleContinue = () => {
    router.push(
      `/demo/payment/review?supplierId=${supplierId}&amount=${amount}&reference=${encodeURIComponent(reference)}`
    );
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white flex flex-col">
        <Header title="Payment Amount" />

        <div className="flex-1 px-5 pb-8">
          {/* Supplier Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center bg-gray-50 rounded-xl p-4 mb-6"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl mr-3 shadow-sm">
              {supplier.countryFlag}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{supplier.name}</p>
              <p className="text-sm text-gray-500">
                {supplier.paymentMethod} • {supplier.country}
              </p>
            </div>
          </motion.div>

          {/* Amount Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <AmountInput
              currency="GBP"
              currencySymbol="£"
              value={amount}
              onChange={setAmount}
              label="You send"
              maxAmount={5000}
            />
          </motion.div>

          {/* FX Display */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <FXDisplay
              fromCurrency="GBP"
              toCurrency={corridor?.currency || 'GHS'}
              rate={rate}
              amount={numericAmount}
              convertedAmount={convertedAmount}
              fee={0}
            />
          </motion.div>

          {/* Reference */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Input
              label="Payment Reference (Optional)"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g., INV-2024-001"
              hint="This will be shown on the receipt"
            />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-5 pb-8"
        >
          <Button
            fullWidth
            size="lg"
            onClick={handleContinue}
            disabled={numericAmount <= 0}
          >
            Review Payment
          </Button>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
