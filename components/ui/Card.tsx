'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  hover?: boolean;
}

export default function Card({
  children,
  className = '',
  onClick,
  selected = false,
  hover = true,
}: CardProps) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`
        bg-white rounded-2xl p-5 shadow-sm transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''}
        ${selected ? 'ring-2 ring-tts-green bg-tts-green-light' : ''}
        ${hover && onClick ? 'hover:shadow-md' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
