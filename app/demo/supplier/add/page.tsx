'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import ProgressBar from '@/components/ui/ProgressBar';
import { MOCK_CORRIDORS } from '@/lib/mock-data';

export default function AddSupplierCountryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const filteredCorridors = MOCK_CORRIDORS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCountry = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setTimeout(() => {
      router.push(`/demo/supplier/add/details?country=${countryCode}`);
    }, 200);
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="Add Supplier" />

        <div className="px-5 pb-8">
          <ProgressBar current={1} total={3} className="mb-6" />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="w-14 h-14 bg-tts-green-light rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🌍</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Where is your supplier?</h2>
            <p className="text-sm text-gray-500 mt-1">
              Select the country where your supplier receives payments
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search countries..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-tts-green text-base"
              />
            </div>
          </motion.div>

          {/* Country List */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Available Corridors
            </p>
            {filteredCorridors.map((corridor, index) => (
              <motion.div
                key={corridor.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => handleSelectCountry(corridor.code)}
                className={`
                  flex items-center p-4 rounded-xl cursor-pointer transition-all
                  ${selectedCountry === corridor.code
                    ? 'bg-tts-green-light border-2 border-tts-green'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }
                `}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl mr-3 shadow-sm">
                  {corridor.flag}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{corridor.name}</p>
                  <p className="text-sm text-gray-500">
                    {corridor.currency} • {corridor.methods.join(', ')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.div>
            ))}

            {filteredCorridors.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No corridors found</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try searching for a different country
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
