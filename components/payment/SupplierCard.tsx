'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Supplier } from '@/lib/types';

interface SupplierCardProps {
  supplier: Supplier;
  onClick?: () => void;
  selected?: boolean;
  showArrow?: boolean;
}

export default function SupplierCard({
  supplier,
  onClick,
  selected = false,
  showArrow = true,
}: SupplierCardProps) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`
        flex items-center p-4 rounded-xl cursor-pointer transition-all
        ${selected
          ? 'bg-tts-green-light border-2 border-tts-green'
          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
        }
      `}
    >
      {/* Flag/Avatar */}
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl mr-3 shadow-sm">
        {supplier.countryFlag}
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{supplier.name}</p>
        <p className="text-sm text-gray-500">
          {supplier.type.charAt(0).toUpperCase() + supplier.type.slice(1)} • {supplier.country}
        </p>
        <p className="text-xs text-gray-400">{supplier.paymentMethod}</p>
      </div>

      {/* Last Paid */}
      {supplier.lastPaid && (
        <div className="text-right mr-2">
          <p className="text-xs text-gray-400">Last paid</p>
          <p className="text-sm text-gray-600">{supplier.lastPaid}</p>
        </div>
      )}

      {/* Arrow */}
      {showArrow && (
        <ChevronRight className="w-5 h-5 text-gray-400" />
      )}
    </motion.div>
  );
}
