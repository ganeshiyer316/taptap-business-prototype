'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export default function Header({
  title,
  showBack = true,
  onBack,
  rightAction,
  transparent = false,
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header
      className={`
        sticky top-0 z-10 flex items-center justify-between px-4 py-3
        ${transparent ? 'bg-transparent' : 'bg-white border-b border-gray-100'}
      `}
    >
      <div className="w-10">
        {showBack && (
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>

      {title && (
        <h1 className="text-lg font-semibold text-gray-900 absolute left-1/2 -translate-x-1/2">
          {title}
        </h1>
      )}

      <div className="w-10 flex justify-end">{rightAction}</div>
    </header>
  );
}
