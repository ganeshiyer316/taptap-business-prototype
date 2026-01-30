'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Button from '@/components/ui/Button';
import { MOCK_USER_EXISTING } from '@/lib/mock-data';

export default function ExistingUserHomePage() {
  const user = MOCK_USER_EXISTING;

  return (
    <PhoneFrame>
      <div className="min-h-full bg-gray-50">
        {/* Header */}
        <div className="bg-tts-green px-5 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm">Good morning</p>
              <h1 className="text-white text-xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">👋</span>
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-green-100 text-sm">Total sent this month</p>
            <p className="text-white text-3xl font-bold mt-1">£1,425.00</p>
            <p className="text-green-200 text-xs mt-2">+12% from last month</p>
          </div>
        </div>

        {/* Business Upgrade Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-5 -mt-3 relative z-10"
        >
          <Link href="/demo/existing-user/upgrade">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 cursor-pointer hover:border-amber-400 transition-all">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">Using Tap Tap Send for business?</h3>
                    <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Upgrade to save suppliers, get receipts, and track payments
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Transfer Pattern Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-5 mt-4"
        >
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-800 font-medium">
                  We noticed you send to the same recipients often
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  A business account could save you time and money
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Transfers */}
        <div className="px-5 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Transfers</h2>
            <button className="text-sm text-tts-green font-medium">See all</button>
          </div>

          <div className="space-y-3">
            {user.recentTransfers.map((transfer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">
                    {transfer.country === 'Ghana' ? '🇬🇭' : '🇳🇬'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{transfer.recipient}</p>
                  <p className="text-sm text-gray-500">{transfer.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    £{transfer.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">{transfer.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-5 pb-8">
          <Link href="/demo/existing-user/upgrade">
            <Button fullWidth size="lg">
              Upgrade to Business Account
            </Button>
          </Link>
        </div>
      </div>
    </PhoneFrame>
  );
}
