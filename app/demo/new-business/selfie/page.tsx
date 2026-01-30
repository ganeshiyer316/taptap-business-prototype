'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Check, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';

export default function SelfiePage() {
  const router = useRouter();
  const [stage, setStage] = useState<'intro' | 'capture' | 'done'>('intro');
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    setIsCapturing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsCapturing(false);
    setStage('done');
  };

  const handleContinue = () => {
    router.push('/demo/new-business/business-details');
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="Selfie Verification" />

        <div className="px-5 pb-8">
          <ProgressBar current={2} total={4} className="mb-6" />

          {stage === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-purple-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Take a selfie
              </h2>
              <p className="text-gray-500 mb-8">
                We'll match your selfie to your ID photo to verify it's really you
              </p>

              <div className="bg-gray-50 rounded-xl p-5 mb-8 text-left">
                <p className="font-semibold text-gray-900 mb-3">Tips for a good selfie:</p>
                <div className="space-y-2">
                  {[
                    'Face the camera directly',
                    'Good lighting, no shadows',
                    'Remove glasses if possible',
                    'Keep a neutral expression',
                  ].map((tip, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-600">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button fullWidth size="lg" onClick={() => setStage('capture')}>
                <Camera className="w-5 h-5 mr-2" />
                Open Camera
              </Button>
            </motion.div>
          )}

          {stage === 'capture' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Position your face in the circle
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Hold still while we capture
              </p>

              {/* Camera Simulation */}
              <div className="relative bg-gray-900 rounded-2xl aspect-square mb-6 overflow-hidden">
                {/* Face outline */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-48 h-64 border-4 rounded-full ${
                    isCapturing ? 'border-green-400 animate-pulse' : 'border-white/50'
                  }`} />
                </div>

                {isCapturing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-white text-center">
                      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-sm">Verifying liveness...</p>
                    </div>
                  </motion.div>
                )}

                {!isCapturing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/70 text-center">
                      <User className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    </div>
                  </div>
                )}
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={handleCapture}
                loading={isCapturing}
              >
                {isCapturing ? 'Capturing...' : 'Take Selfie'}
              </Button>
            </motion.div>
          )}

          {stage === 'done' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-12 h-12 text-green-600" />
              </motion.div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Selfie verified!
              </h2>
              <p className="text-gray-500 mb-8">
                Your identity has been confirmed. Let's add your business details.
              </p>

              <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-green-800">Identity confirmed</p>
                    <p className="text-sm text-green-600">Selfie matches ID document</p>
                  </div>
                </div>
              </div>

              <Button fullWidth size="lg" onClick={handleContinue}>
                Continue to Business Details
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
