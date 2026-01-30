'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ProgressBar from '@/components/ui/ProgressBar';
import { BUSINESS_TYPES, VOLUME_RANGES } from '@/lib/mock-data';

export default function BusinessDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '',
    registrationNumber: '',
    businessType: '',
    address: '',
    city: '',
    postcode: '',
    description: '',
    website: '',
    expectedVolume: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push('/demo/new-business/verification');
  };

  const isFormValid =
    formData.businessName &&
    formData.registrationNumber &&
    formData.businessType &&
    formData.address &&
    formData.city &&
    formData.postcode &&
    formData.expectedVolume;

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="Business Details" />

        <div className="px-5 pb-8">
          <ProgressBar current={3} total={4} className="mb-6" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏢</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Tell us about your business</h2>
              <p className="text-sm text-gray-500">We'll verify this with Companies House</p>
            </div>

            <div className="space-y-5">
              <Input
                label="Registered Business Name"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Enter business name"
              />

              <Input
                label="Company Registration Number"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                placeholder="e.g., 12345678"
                hint="8-digit number from Companies House"
              />

              <Select
                label="Business Type"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                options={BUSINESS_TYPES}
                placeholder="Select type"
              />

              <Input
                label="Registered Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street address"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                />
                <Input
                  label="Postcode"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  placeholder="Postcode"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What does your business do?
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description..."
                  rows={2}
                  className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-tts-green placeholder:text-gray-400 resize-none"
                />
              </div>

              <Input
                label="Website (Optional)"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="www.yourbusiness.com"
              />

              <Select
                label="Expected Monthly Volume"
                value={formData.expectedVolume}
                onChange={(e) => setFormData({ ...formData, expectedVolume: e.target.value })}
                options={VOLUME_RANGES}
                placeholder="Select range"
              />
            </div>
          </motion.div>

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
              Submit for Verification
            </Button>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
