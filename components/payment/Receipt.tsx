'use client';

import { Download, Share2 } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ReceiptProps {
  transactionId: string;
  date: string;
  from: {
    name: string;
    companyNumber: string;
    address: string;
  };
  to: {
    name: string;
    paymentMethod: string;
    phone?: string;
    country: string;
  };
  amount: {
    sent: number;
    sentCurrency: string;
    received: number;
    receivedCurrency: string;
    rate: number;
    fee: number;
  };
  reference?: string;
  completedAt: string;
}

export default function Receipt({
  transactionId,
  date,
  from,
  to,
  amount,
  reference,
  completedAt,
}: ReceiptProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-tts-green text-white p-4 text-center">
        <p className="font-bold text-lg">TAP TAP SEND BUSINESS</p>
        <p className="text-sm opacity-90">Payment Receipt</p>
      </div>

      {/* Transaction Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Transaction ID</span>
            <span className="font-mono text-gray-700">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span className="text-gray-700">{date}</span>
          </div>
        </div>
      </div>

      {/* From */}
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs text-gray-400 uppercase font-semibold mb-2">From</p>
        <p className="font-semibold text-gray-900">{from.name}</p>
        <p className="text-sm text-gray-500">Company No: {from.companyNumber}</p>
        <p className="text-sm text-gray-500">{from.address}</p>
      </div>

      {/* To */}
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs text-gray-400 uppercase font-semibold mb-2">To</p>
        <p className="font-semibold text-gray-900">{to.name}</p>
        <p className="text-sm text-gray-500">{to.paymentMethod}</p>
        {to.phone && <p className="text-sm text-gray-500">{to.phone}</p>}
        <p className="text-sm text-gray-500">{to.country}</p>
      </div>

      {/* Amount Details */}
      <div className="p-4 border-b border-gray-100 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Amount Sent</span>
          <span className="font-semibold">
            {amount.sentCurrency} {amount.sent.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Exchange Rate</span>
          <span className="text-gray-700">
            1 {amount.sentCurrency} = {amount.rate.toFixed(2)} {amount.receivedCurrency}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Amount Received</span>
          <span className="font-bold text-tts-green">
            {amount.receivedCurrency} {amount.received.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Fee</span>
          <span className={amount.fee === 0 ? 'text-tts-green font-medium' : 'text-gray-700'}>
            {amount.fee === 0 ? 'Free' : `${amount.sentCurrency} ${amount.fee.toFixed(2)}`}
          </span>
        </div>
        {reference && (
          <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
            <span className="text-gray-500">Payment Reference</span>
            <span className="font-medium text-gray-700">{reference}</span>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Status</span>
          <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            COMPLETED
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Delivered: {completedAt}</p>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 text-center">
        <p className="text-xs text-gray-500">
          Tap Tap Send Ltd is authorised by the FCA (FRN: 900869) as an Electronic Money Institution.
        </p>
      </div>

      {/* Actions */}
      <div className="p-4 flex gap-3">
        <Button variant="outline" fullWidth className="flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
        <Button variant="outline" fullWidth className="flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </div>
  );
}
