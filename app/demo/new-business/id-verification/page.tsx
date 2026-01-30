'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Shield, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { ID_DOCUMENT_TYPES } from '@/lib/mock-data';

export default function IDVerificationPage() {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    setIsCapturing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPhotoTaken(true);
    setIsCapturing(false);
  };

  const handleContinue = () => {
    router.push('/demo/new-business/selfie');
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="ID Verification" />

        <div className="px-5 pb-8">
          <ProgressBar current={2} total={4} className="mb-6" />

          {!selectedDoc ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🪪</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Choose your ID document</h2>
                <p className="text-sm text-gray-500">We accept the following documents</p>
              </div>

              <div className="space-y-3">
                {ID_DOCUMENT_TYPES.map((doc) => (
                  <motion.div
                    key={doc.value}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDoc(doc.value)}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all border-2 border-transparent hover:border-tts-green"
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                      {doc.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{doc.label}</p>
                      <p className="text-sm text-gray-500">
                        {doc.value === 'passport' && 'Any valid passport'}
                        {doc.value === 'driving_licence' && 'UK or international'}
                        {doc.value === 'national_id' && 'Government-issued ID'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Your documents are encrypted and securely processed. We delete them after verification.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : !photoTaken ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Scan your {ID_DOCUMENT_TYPES.find(d => d.value === selectedDoc)?.label}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Position your document within the frame
              </p>

              {/* Camera Simulation */}
              <div className="relative bg-gray-900 rounded-2xl aspect-[4/3] mb-6 overflow-hidden">
                <div className="absolute inset-4 border-2 border-white/50 rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {isCapturing ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-white text-center"
                    >
                      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-sm">Capturing...</p>
                    </motion.div>
                  ) : (
                    <div className="text-white/70 text-center">
                      <Camera className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">Camera preview</p>
                    </div>
                  )}
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={handleCapture}
                loading={isCapturing}
              >
                <Camera className="w-5 h-5 mr-2" />
                Take Photo
              </Button>

              <button
                onClick={() => setSelectedDoc(null)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                Choose different document
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Photo captured!
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Your {ID_DOCUMENT_TYPES.find(d => d.value === selectedDoc)?.label.toLowerCase()} has been captured
              </p>

              {/* Preview placeholder */}
              <div className="bg-gray-100 rounded-xl aspect-[4/3] mb-6 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <span className="text-4xl mb-2 block">
                    {ID_DOCUMENT_TYPES.find(d => d.value === selectedDoc)?.icon}
                  </span>
                  <p className="text-sm">Document captured</p>
                </div>
              </div>

              <Button fullWidth size="lg" onClick={handleContinue}>
                Continue to Selfie
              </Button>

              <button
                onClick={() => setPhotoTaken(false)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                Retake photo
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
