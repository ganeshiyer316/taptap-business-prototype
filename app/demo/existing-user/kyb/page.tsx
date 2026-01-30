'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { BUSINESS_TYPES, VOLUME_RANGES } from '@/lib/mock-data';

export default function KYBPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "Amara's African Goods Ltd",
    registrationNumber: '',
    businessType: '',
    expectedVolume: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push('/demo/existing-user/verification');
  };

  const isFormValid =
    formData.businessName &&
    formData.registrationNumber &&
    formData.businessType &&
    formData.expectedVolume;

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="Business Details" />

        <div className="px-5 pb-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step 1 of 2</span>
              <span>Business Details</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-tts-green rounded-full" />
            </div>
          </div>

          {/* Identity Verified Notice */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Identity verified</p>
                <p className="text-sm text-green-600">From your personal account</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            {/* Business Icon */}
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-gray-400" />
              </div>
            </div>

            <Input
              label="Registered Business Name"
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
              placeholder="Enter your business name"
            />

            <Input
              label="Company Registration Number"
              value={formData.registrationNumber}
              onChange={(e) =>
                setFormData({ ...formData, registrationNumber: e.target.value })
              }
              placeholder="e.g., 12345678"
              hint="Find this on Companies House"
            />

            <Select
              label="Business Type"
              value={formData.businessType}
              onChange={(e) =>
                setFormData({ ...formData, businessType: e.target.value })
              }
              options={BUSINESS_TYPES}
              placeholder="Select business type"
            />

            <Select
              label="Expected Monthly Volume"
              value={formData.expectedVolume}
              onChange={(e) =>
                setFormData({ ...formData, expectedVolume: e.target.value })
              }
              options={VOLUME_RANGES}
              placeholder="Select volume range"
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What does your business do?
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of your business activities..."
                rows={3}
                className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:border-tts-green placeholder:text-gray-400 resize-none"
              />
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Button
              fullWidth
              size="lg"
              onClick={handleSubmit}
              disabled={!isFormValid}
              loading={isLoading}
            >
              Verify Business
            </Button>
            <p className="text-center text-xs text-gray-400 mt-3">
              We'll verify your business with Companies House
            </p>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
