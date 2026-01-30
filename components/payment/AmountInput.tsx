'use client';

import { useState, useEffect } from 'react';

interface AmountInputProps {
  currency: string;
  currencySymbol?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  maxAmount?: number;
}

export default function AmountInput({
  currency,
  currencySymbol = '£',
  value,
  onChange,
  placeholder = '0.00',
  label,
  maxAmount,
}: AmountInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Allow only numbers and decimal point
    const sanitized = input.replace(/[^0-9.]/g, '');
    // Only allow one decimal point
    const parts = sanitized.split('.');
    if (parts.length > 2) return;
    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) return;
    onChange(sanitized);
  };

  const numericValue = parseFloat(value) || 0;
  const isOverLimit = maxAmount !== undefined && numericValue > maxAmount;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
      )}
      <div
        className={`
          flex items-center bg-white border-2 rounded-xl px-4 py-3 transition-all
          ${isFocused ? 'border-tts-green' : 'border-gray-200'}
          ${isOverLimit ? 'border-red-500' : ''}
        `}
      >
        <span className="text-2xl font-bold text-gray-400 mr-2">{currencySymbol}</span>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 text-3xl font-bold text-gray-900 outline-none bg-transparent"
        />
        <span className="text-lg font-semibold text-gray-500 ml-2">{currency}</span>
      </div>
      {isOverLimit && maxAmount && (
        <p className="text-sm text-red-500">
          Maximum amount is {currencySymbol}{maxAmount.toLocaleString()}
        </p>
      )}
    </div>
  );
}
