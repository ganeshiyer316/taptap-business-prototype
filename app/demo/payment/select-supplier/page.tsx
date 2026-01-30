'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import SupplierCard from '@/components/payment/SupplierCard';
import { MOCK_SUPPLIERS } from '@/lib/mock-data';

export default function SelectSupplierPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const filteredSuppliers = MOCK_SUPPLIERS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSupplier = (supplierId: string) => {
    setSelectedSupplier(supplierId);
    setTimeout(() => {
      router.push(`/demo/payment/amount?supplierId=${supplierId}`);
    }, 200);
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="Select Supplier" />

        <div className="px-5 pb-8">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search suppliers..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-tts-green text-base"
              />
            </div>
          </motion.div>

          {/* Add New */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-4 p-4 bg-tts-green-light rounded-xl cursor-pointer hover:bg-green-100 transition-all border-2 border-dashed border-tts-green">
              <div className="w-12 h-12 bg-tts-green rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-tts-green-dark">Add New Supplier</p>
                <p className="text-sm text-gray-500">Pay someone new</p>
              </div>
            </div>
          </motion.div>

          {/* Saved Suppliers */}
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Saved Suppliers
            </p>
            <div className="space-y-3">
              {filteredSuppliers.map((supplier, index) => (
                <motion.div
                  key={supplier.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <SupplierCard
                    supplier={supplier}
                    onClick={() => handleSelectSupplier(supplier.id)}
                    selected={selectedSupplier === supplier.id}
                  />
                </motion.div>
              ))}
            </div>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No suppliers found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
