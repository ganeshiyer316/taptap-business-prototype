'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { PaymentStep } from '@/lib/types';

interface PaymentTrackerProps {
  steps: PaymentStep[];
  expandable?: boolean;
}

export default function PaymentTracker({ steps, expandable = true }: PaymentTrackerProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleExpand = (stepId: string) => {
    if (expandable) {
      setExpandedStep(expandedStep === stepId ? null : stepId);
    }
  };

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const isExpanded = expandedStep === step.id;
        const hasDetails = step.details && step.details.length > 0;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`
              p-4 rounded-xl transition-all duration-300
              ${step.status === 'complete' ? 'bg-green-50' : ''}
              ${step.status === 'current' ? 'bg-yellow-50' : ''}
              ${step.status === 'pending' ? 'bg-gray-50' : ''}
              ${step.status === 'error' ? 'bg-red-50' : ''}
            `}
          >
            <div
              className={`flex items-start gap-4 ${hasDetails && expandable ? 'cursor-pointer' : ''}`}
              onClick={() => hasDetails && toggleExpand(step.id)}
            >
              {/* Status Icon */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                  ${step.status === 'complete' ? 'bg-green-500' : ''}
                  ${step.status === 'current' ? 'bg-yellow-400' : ''}
                  ${step.status === 'pending' ? 'bg-gray-200' : ''}
                  ${step.status === 'error' ? 'bg-red-500' : ''}
                `}
              >
                {step.status === 'complete' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
                {step.status === 'current' && (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                )}
                {step.status === 'pending' && (
                  <span className="text-gray-400 text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4
                  className={`font-semibold ${
                    step.status === 'complete' ? 'text-green-700' :
                    step.status === 'current' ? 'text-yellow-800' :
                    step.status === 'error' ? 'text-red-700' :
                    'text-gray-500'
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500">{step.description}</p>
                {step.timestamp && (
                  <p className="text-xs text-gray-400 mt-1">{step.timestamp}</p>
                )}
              </div>

              {/* Expand/Collapse */}
              {hasDetails && expandable && (
                <div className="text-gray-400">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              )}

              {/* Status Badge */}
              {!hasDetails && (
                <>
                  {step.status === 'complete' && (
                    <span className="text-xs text-green-600 font-medium">Done</span>
                  )}
                  {step.status === 'current' && (
                    <span className="text-xs text-yellow-600 font-medium">In progress</span>
                  )}
                </>
              )}
            </div>

            {/* Expanded Details */}
            <AnimatePresence>
              {isExpanded && hasDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-14 mt-3 pt-3 border-t border-gray-200 space-y-2">
                    {step.details?.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{detail}</span>
                        <span className="text-xs text-gray-400 ml-auto">
                          {(0.2 + i * 0.1).toFixed(1)}s
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
