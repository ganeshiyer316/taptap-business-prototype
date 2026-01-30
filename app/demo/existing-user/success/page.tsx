'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Button from '@/components/ui/Button';

export default function SuccessPage() {
  return (
    <PhoneFrame>
      <div className="min-h-full bg-white flex flex-col">
        {/* Success Animation */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            >
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Business!
            </h1>
            <p className="text-gray-500">
              Your business account is now active
            </p>
          </motion.div>

          {/* Business Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full mt-8 bg-gradient-to-r from-tts-green to-tts-green-dark rounded-2xl p-5 text-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">💼</span>
              </div>
              <div>
                <p className="font-bold">Amara's African Goods Ltd</p>
                <p className="text-sm text-green-100">Verified Business Account</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-100">Account Status</span>
              <span className="flex items-center gap-1 font-semibold">
                <Check className="w-4 h-4" />
                Verified
              </span>
            </div>
          </motion.div>

          {/* Limits Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-800">Your initial limit</p>
                <p className="text-sm text-blue-600 mt-1">
                  You can send up to <span className="font-bold">£5,000/month</span>.
                  Upload additional documents to increase your limit.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features Unlocked */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full mt-6"
          >
            <p className="text-sm font-semibold text-gray-700 mb-3">Now you can:</p>
            <div className="space-y-2">
              {[
                'Save and manage suppliers',
                'Get business receipts',
                'Track payments in real-time',
                'Add invoice references',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="px-5 pb-8"
        >
          <Link href="/demo/dashboard">
            <Button fullWidth size="lg">
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
