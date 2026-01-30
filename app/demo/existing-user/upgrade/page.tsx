'use client';

import { motion } from 'framer-motion';
import { Check, Users, Receipt, BarChart3, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';

const features = [
  {
    icon: Users,
    title: 'Save your suppliers',
    description: 'Add and manage suppliers for quick, repeat payments',
  },
  {
    icon: Receipt,
    title: 'Business receipts',
    description: 'Download professional PDF receipts for accounting',
  },
  {
    icon: BarChart3,
    title: 'Track payments',
    description: 'Real-time status updates, like tracking a package',
  },
  {
    icon: Shield,
    title: 'Compliance built-in',
    description: 'KYB verification keeps you and your business protected',
  },
];

const benefits = [
  'No monthly fees',
  'Same great rates',
  'Upgrade in minutes',
  'Keep your existing account',
];

export default function UpgradePage() {
  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="" showBack onBack={() => window.history.back()} />

        <div className="px-5 pb-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-tts-green-light rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Upgrade to Business
            </h1>
            <p className="text-gray-500">
              Everything you love, plus powerful business features
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-10 h-10 bg-tts-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Benefits Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-green-50 rounded-xl p-5 mb-8"
          >
            <h3 className="font-semibold text-green-800 mb-3">What you get:</h3>
            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-green-800">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Identity Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-blue-800">Identity already verified</p>
                <p className="text-sm text-blue-600 mt-1">
                  We'll use your existing verification. Just add your business details.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/demo/existing-user/kyb">
              <Button fullWidth size="lg" className="mb-3">
                Continue to Business Setup
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-center text-xs text-gray-400">
              Takes about 2 minutes • No documents needed
            </p>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
