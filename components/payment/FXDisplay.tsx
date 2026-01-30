'use client';

import { RefreshCw } from 'lucide-react';

interface FXDisplayProps {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  amount?: number;
  convertedAmount?: number;
  fee?: number;
  showConversion?: boolean;
}

export default function FXDisplay({
  fromCurrency,
  toCurrency,
  rate,
  amount,
  convertedAmount,
  fee = 0,
  showConversion = true,
}: FXDisplayProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
      {/* Rate Display */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Exchange rate</span>
          <RefreshCw className="w-3 h-3 text-gray-400" />
        </div>
        <span className="text-sm font-semibold text-tts-green">
          1 {fromCurrency} = {rate.toFixed(2)} {toCurrency}
        </span>
      </div>

      {/* Conversion Display */}
      {showConversion && amount !== undefined && convertedAmount !== undefined && (
        <div className="pt-3 border-t border-gray-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">You pay</span>
            <span className="text-lg font-bold text-gray-900">
              {fromCurrency} {amount.toFixed(2)}
            </span>
          </div>
          {fee > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Fee</span>
              <span className="text-sm text-gray-600">
                {fromCurrency} {fee.toFixed(2)}
              </span>
            </div>
          )}
          {fee === 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Fee</span>
              <span className="text-sm text-tts-green font-medium">Free</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-sm text-gray-500">They receive</span>
            <span className="text-xl font-bold text-tts-green">
              {toCurrency} {convertedAmount.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Rate Lock Notice */}
      <p className="text-xs text-gray-400 pt-2">
        Rate locked for 60 seconds
      </p>
    </div>
  );
}
