'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Button from '@/components/ui/Button';

export default function NewBusinessSuccessPage() {
  return (
    <PhoneFrame>
      <div className="min-h-full bg-gradient-to-b from-tts-green to-tts-green-dark flex flex-col">
        {/* Success Animation */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 text-white text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
            >
              <Check className="w-14 h-14 text-tts-green" strokeWidth={3} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-green-200 font-medium">Verification Complete</span>
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <h1 className="text-3xl font-bold mb-3">
              Welcome to Business!
            </h1>
            <p className="text-green-100 text-lg">
              Your business account is ready to use
            </p>
          </motion.div>
        </div>

        {/* Bottom Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-t-3xl px-5 py-8"
        >
          {/* Account Card */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 text-white mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💼</span>
                </div>
                <div>
                  <p className="font-bold">Business Account</p>
                  <p className="text-sm text-gray-300">Verified</p>
                </div>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-gray-300">Monthly limit</p>
              <p className="text-2xl font-bold">£5,000</p>
            </div>
          </div>

          {/* Getting Started */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Getting started:</p>
            <div className="space-y-2">
              {[
                'Add your first supplier',
                'Make your first payment',
                'Download receipts for accounting',
                'Track payments in real-time',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-tts-green-light rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-tts-green">{i + 1}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
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
