'use client';

import { motion } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';

interface VerificationStepProps {
  title: string;
  description: string;
  status: 'pending' | 'checking' | 'complete' | 'failed';
  delay?: number;
}

export default function VerificationStep({
  title,
  description,
  status,
  delay = 0,
}: VerificationStepProps) {
  const statusConfig = {
    pending: {
      bg: 'bg-gray-50',
      iconBg: 'bg-gray-200',
      iconColor: 'text-gray-400',
      textColor: 'text-gray-500',
      badge: null,
    },
    checking: {
      bg: 'bg-yellow-50',
      iconBg: 'bg-yellow-400',
      iconColor: 'text-white',
      textColor: 'text-gray-700',
      badge: 'Checking...',
    },
    complete: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-500',
      iconColor: 'text-white',
      textColor: 'text-green-700',
      badge: 'Passed',
    },
    failed: {
      bg: 'bg-red-50',
      iconBg: 'bg-red-500',
      iconColor: 'text-white',
      textColor: 'text-red-700',
      badge: 'Failed',
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={`flex items-center gap-4 p-4 rounded-xl ${config.bg} transition-all duration-300`}
    >
      {/* Status Icon */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${config.iconBg} transition-all duration-300`}
      >
        {status === 'checking' ? (
          <Loader2 className={`w-5 h-5 ${config.iconColor} animate-spin`} />
        ) : status === 'complete' ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Check className={`w-5 h-5 ${config.iconColor}`} />
          </motion.div>
        ) : status === 'failed' ? (
          <X className={`w-5 h-5 ${config.iconColor}`} />
        ) : (
          <div className="w-3 h-3 rounded-full bg-gray-300" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className={`font-semibold text-sm ${config.textColor}`}>{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      {/* Badge */}
      {config.badge && (
        <span
          className={`
            text-xs font-medium px-2 py-1 rounded-full
            ${status === 'checking' ? 'text-yellow-700 bg-yellow-100' : ''}
            ${status === 'complete' ? 'text-green-700 bg-green-100' : ''}
            ${status === 'failed' ? 'text-red-700 bg-red-100' : ''}
          `}
        >
          {config.badge}
        </span>
      )}
    </motion.div>
  );
}
