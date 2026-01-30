'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScreenWrapperProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  animate?: boolean;
}

export default function ScreenWrapper({
  children,
  className = '',
  padded = true,
  animate = true,
}: ScreenWrapperProps) {
  const content = (
    <div className={`min-h-full ${padded ? 'p-5' : ''} ${className}`}>
      {children}
    </div>
  );

  if (!animate) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`min-h-full ${padded ? 'p-5' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
