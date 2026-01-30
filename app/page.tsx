'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2, UserPlus, Zap, Shield, Globe, Clock } from 'lucide-react';
import Link from 'next/link';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <PhoneFrame>
      <div className="min-h-full bg-gradient-to-b from-tts-green to-tts-green-dark">
        {/* Hero Section */}
        <div className="px-6 pt-8 pb-6 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">💸</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Tap Tap Send Business</h1>
            <p className="text-green-100 text-sm">
              Pay suppliers worldwide, in seconds
            </p>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="px-6 py-4"
        >
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Globe, label: '50+ Countries' },
              { icon: Zap, label: 'Instant Delivery' },
              { icon: Shield, label: 'FCA Regulated' },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-xl p-3 text-center text-white"
              >
                <feature.icon className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs font-medium">{feature.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Flow Selection */}
        <div className="bg-white rounded-t-3xl mt-4 px-6 py-8 min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Choose your demo flow
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Select a user journey to explore
            </p>

            {/* Flow Cards */}
            <div className="space-y-4">
              {/* Existing User Flow */}
              <Link href="/demo/existing-user">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-100 rounded-2xl p-4 cursor-pointer hover:border-tts-green transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-tts-green rounded-xl flex items-center justify-center flex-shrink-0">
                      <UserPlus className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">Existing User Upgrade</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Amara already uses Tap Tap Send. See how she upgrades to a business account.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Quick KYB
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          KYC Reused
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              </Link>

              {/* New Business Flow */}
              <Link href="/demo/new-business">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl p-4 cursor-pointer hover:border-blue-400 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">New Business Signup</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        James is new to Tap Tap Send. See the full KYC/KYB onboarding.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Full KYC
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Full KYB
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              </Link>

              {/* Direct to Dashboard */}
              <Link href="/demo/dashboard">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-gray-300 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">Skip to Dashboard</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Jump directly to the business dashboard and payment flow.
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              </Link>
            </div>

            {/* Author Credit */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Prototype by Ganesh Iyer
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Head of Product (Payments), Entain
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
