'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import PhoneFrame from '@/components/ui/PhoneFrame';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ProgressBar from '@/components/ui/ProgressBar';
import { MOCK_CORRIDORS } from '@/lib/mock-data';

const SUPPLIER_TYPES = [
  { value: 'supplier', label: 'Supplier / Vendor' },
  { value: 'contractor', label: 'Contractor / Freelancer' },
  { value: 'manufacturer', label: 'Manufacturer' },
  { value: 'service_provider', label: 'Service Provider' },
];

const RELATIONSHIP_DURATIONS = [
  { value: 'new', label: 'New relationship (first payment)' },
  { value: 'less_than_1_year', label: 'Less than 1 year' },
  { value: '1_to_3_years', label: '1-3 years' },
  { value: 'over_3_years', label: 'Over 3 years' },
];

const PAYMENT_FREQUENCIES = [
  { value: 'one_time', label: 'One-time payment' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'as_needed', label: 'As needed / Ad-hoc' },
];

function SupplierDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const countryCode = searchParams.get('country') || 'GH';

  const corridor = MOCK_CORRIDORS.find((c) => c.code === countryCode);
  const paymentMethods = corridor?.methods.map((m) => ({ value: m.toLowerCase().replace(/\s+/g, '_'), label: m })) || [];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    paymentMethod: '',
    accountNumber: '',
    supplierType: '',
    relationshipDuration: '',
    paymentFrequency: '',
    businessPurpose: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Pass supplier details to verification page
    const params = new URLSearchParams({
      country: countryCode,
      name: formData.name,
      phone: formData.phone,
      paymentMethod: formData.paymentMethod,
      supplierType: formData.supplierType,
    });

    router.push(`/demo/supplier/add/verify?${params.toString()}`);
  };

  const isFormValid =
    formData.name &&
    formData.phone &&
    formData.paymentMethod &&
    formData.supplierType &&
    formData.relationshipDuration;

  return (
    <PhoneFrame>
      <div className="min-h-full bg-white">
        <Header title="Supplier Details" />

        <div className="px-5 pb-8">
          <ProgressBar current={2} total={3} className="mb-6" />

          {/* Country Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center bg-gray-50 rounded-xl p-3 mb-6"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl mr-3 shadow-sm">
              {corridor?.flag}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{corridor?.name}</p>
              <p className="text-sm text-gray-500">{corridor?.currency}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Basic Info Section */}
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Supplier Information
              </p>

              <div className="space-y-4">
                <Input
                  label="Supplier Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name or business name"
                  hint="As it appears on their official documents"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={countryCode === 'GH' ? '+233 XX XXX XXXX' : '+XX XXX XXXX'}
                  hint="Used for mobile money and notifications"
                />

                <Input
                  label="Email (Optional)"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="supplier@email.com"
                />
              </div>
            </div>

            {/* Payment Details Section */}
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Payment Details
              </p>

              <div className="space-y-4">
                <Select
                  label="Payment Method"
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  options={paymentMethods}
                  placeholder="Select payment method"
                />

                {formData.paymentMethod && formData.paymentMethod.includes('bank') && (
                  <Input
                    label="Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder="Enter account number"
                  />
                )}
              </div>
            </div>

            {/* Compliance Section */}
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Relationship Details
              </p>
              <p className="text-xs text-gray-400 mb-3">
                Required for compliance with anti-money laundering regulations
              </p>

              <div className="space-y-4">
                <Select
                  label="Supplier Type"
                  value={formData.supplierType}
                  onChange={(e) => setFormData({ ...formData, supplierType: e.target.value })}
                  options={SUPPLIER_TYPES}
                  placeholder="Select type"
                />

                <Select
                  label="Relationship Duration"
                  value={formData.relationshipDuration}
                  onChange={(e) => setFormData({ ...formData, relationshipDuration: e.target.value })}
                  options={RELATIONSHIP_DURATIONS}
                  placeholder="How long have you worked together?"
                />

                <Select
                  label="Expected Payment Frequency"
                  value={formData.paymentFrequency}
                  onChange={(e) => setFormData({ ...formData, paymentFrequency: e.target.value })}
                  options={PAYMENT_FREQUENCIES}
                  placeholder="How often will you pay?"
                />

                <Input
                  label="Business Purpose"
                  value={formData.businessPurpose}
                  onChange={(e) => setFormData({ ...formData, businessPurpose: e.target.value })}
                  placeholder="e.g., Raw materials, consulting services"
                  hint="Brief description of what you pay them for"
                />
              </div>
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
              Continue to Verification
            </Button>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function SupplierDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SupplierDetailsContent />
    </Suspense>
  );
}
