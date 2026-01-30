'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Globe, Check } from 'lucide-react';
import Link from 'next/link';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Button from '@/components/ui/Button';

export default function NewBusinessLandingPage() {
  return (
    <PhoneFrame>
      <div className="min-h-full bg-gradient-to-b from-tts-green to-tts-green-dark">
        {/* Hero */}
        <div className="px-6 pt-12 pb-8 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <span className="text-4xl">💼</span>
            </div>
            <h1 className="text-3xl font-bold mb-3">Tap Tap Send Business</h1>
            <p className="text-green-100 text-lg">
              Pay suppliers worldwide, in seconds
            </p>
          </motion.div>
        </div>

        {/* Features Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="px-6 pb-6"
        >
          <div className="flex justify-center gap-6 text-white">
            {[
              { icon: Globe, label: '50+ Countries' },
              { icon: Clock, label: 'Instant' },
              { icon: Shield, label: 'FCA Regulated' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <item.icon className="w-6 h-6 mb-1 text-green-200" />
                <span className="text-xs text-green-100">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <div className="bg-white rounded-t-3xl px-6 py-8 min-h-[450px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Create your business account
            </h2>
            <p className="text-gray-500 mb-6">
              Join thousands of businesses sending payments to suppliers worldwide
            </p>

            {/* Steps Preview */}
            <div className="space-y-4 mb-8">
              {[
                { step: 1, title: 'Personal Details', desc: 'Tell us about yourself' },
                { step: 2, title: 'ID Verification', desc: 'Quick document check' },
                { step: 3, title: 'Business Details', desc: 'Add your company info' },
                { step: 4, title: 'Verification', desc: 'We verify everything' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-tts-green-light text-tts-green rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="bg-gray-50 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-tts-green" />
                <span className="text-sm font-semibold text-gray-700">Your data is secure</span>
              </div>
              <p className="text-xs text-gray-500">
                We're authorised by the FCA (FRN: 900869) and use bank-level encryption to protect your information.
              </p>
            </div>

            {/* CTA */}
            <Link href="/demo/new-business/personal">
              <Button fullWidth size="lg">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-center text-xs text-gray-400 mt-3">
              Already have an account?{' '}
              <Link href="/demo/existing-user" className="text-tts-green font-medium">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
