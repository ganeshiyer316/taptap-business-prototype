'use client';

import { motion } from 'framer-motion';
import { Send, Plus, ChevronRight, TrendingUp, Check, Users } from 'lucide-react';
import Link from 'next/link';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SupplierCard from '@/components/payment/SupplierCard';
import { MOCK_BUSINESS, MOCK_SUPPLIERS } from '@/lib/mock-data';

export default function DashboardPage() {
  const business = MOCK_BUSINESS;
  const suppliers = MOCK_SUPPLIERS;
  const limitUsedPercent = (business.limits.used / business.limits.monthlyLimit) * 100;

  return (
    <PhoneFrame>
      <div className="min-h-full bg-gray-50">
        {/* Header */}
        <div className="bg-tts-green px-5 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm">Business Account</p>
              <h1 className="text-white text-lg font-bold">{business.name}</h1>
            </div>
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
              <Check className="w-4 h-4 text-green-200" />
              <span className="text-sm text-white font-medium">Verified</span>
            </div>
          </div>

          {/* Limit Card */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-100 text-sm">Monthly Limit</span>
              <button className="text-xs text-white underline">Increase limit</button>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${limitUsedPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-white">
              <span className="font-bold">£{business.limits.used.toLocaleString()} used</span>
              <span className="text-green-100">of £{business.limits.monthlyLimit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-5 -mt-3 relative z-10">
          <div className="grid grid-cols-3 gap-3">
            <Link href="/demo/payment/select-supplier">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-tts-green rounded-xl flex items-center justify-center mb-2">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Pay Supplier</span>
              </motion.div>
            </Link>
            <div className="relative">
              <motion.div
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center text-center opacity-50 cursor-not-allowed"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-gray-400" />
                </div>
                <span className="font-semibold text-gray-500 text-sm">Run Payroll</span>
              </motion.div>
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-2">
                <Plus className="w-6 h-6 text-gray-600" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">Add Supplier</span>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Sent this month</p>
                  <p className="text-2xl font-bold text-gray-900">£{business.limits.used.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+15%</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Saved Suppliers */}
        <div className="px-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Saved Suppliers</h2>
            <button className="text-sm text-tts-green font-medium">See all</button>
          </div>

          <div className="space-y-3">
            {suppliers.slice(0, 3).map((supplier, index) => (
              <motion.div
                key={supplier.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={`/demo/payment/amount?supplierId=${supplier.id}`}>
                  <SupplierCard supplier={supplier} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Kwame Asante', amount: 500, currency: 'GHS', date: 'Today', status: 'completed' },
              { name: 'Adaeze Textiles', amount: 180, currency: 'GBP', date: 'Yesterday', status: 'completed' },
              { name: 'Raj Kumar', amount: 250, currency: 'GBP', date: '3 days ago', status: 'completed' },
            ].map((tx, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{tx.name}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {tx.currency === 'GBP' ? '£' : ''}{tx.amount}
                    {tx.currency !== 'GBP' ? ` ${tx.currency}` : ''}
                  </p>
                  <p className="text-xs text-green-600">{tx.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
