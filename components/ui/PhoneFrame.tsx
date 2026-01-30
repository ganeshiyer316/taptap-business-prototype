'use client';

import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  showStatusBar?: boolean;
  className?: string;
}

export default function PhoneFrame({
  children,
  showStatusBar = true,
  className = '',
}: PhoneFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div
        className={`
          w-[375px] h-[812px] bg-white rounded-[40px] overflow-hidden
          shadow-2xl border-[12px] border-gray-900 relative
          ${className}
        `}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-gray-900 rounded-b-3xl z-20" />

        {showStatusBar && (
          <div className="h-12 bg-tts-green flex items-center justify-between px-6 text-white text-sm font-semibold pt-1">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/>
              </svg>
              <span className="text-xs">100%</span>
            </div>
          </div>
        )}

        <div className={`h-[calc(100%-48px)] overflow-auto ${showStatusBar ? '' : 'h-full'}`}>
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-gray-900 rounded-full" />
      </div>
    </div>
  );
}
