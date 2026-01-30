import { User, Business, Supplier, Corridor, Transfer, VerificationCheck, PaymentStep } from './types';

export const MOCK_USER_EXISTING: User & { recentTransfers: Transfer[]; frequencyScore: number } = {
  id: 'usr_existing_001',
  type: 'personal',
  firstName: 'Amara',
  lastName: 'Johnson',
  email: 'amara.johnson@email.com',
  phone: '+44 7700 900123',
  verified: true,
  kycStatus: 'complete',
  createdAt: '2023-06-15',
  recentTransfers: [
    { recipient: 'Kwame Asante', amount: 250, currency: 'GBP', date: 'Today', country: 'Ghana' },
    { recipient: 'Adaeze Textiles', amount: 180, currency: 'GBP', date: 'Yesterday', country: 'Nigeria' },
    { recipient: 'Kwame Asante', amount: 300, currency: 'GBP', date: '3 days ago', country: 'Ghana' },
    { recipient: 'Kwame Asante', amount: 275, currency: 'GBP', date: 'Last week', country: 'Ghana' },
    { recipient: 'Adaeze Textiles', amount: 420, currency: 'GBP', date: '2 weeks ago', country: 'Nigeria' },
  ],
  frequencyScore: 8,
};

export const MOCK_BUSINESS: Business = {
  id: 'bus_001',
  name: "Amara's African Goods Ltd",
  registrationNumber: '12345678',
  registrationType: 'limited_company',
  industry: 'import_export',
  description: 'We import textiles and crafts from Ghana and sell to UK retailers.',
  expectedVolume: '5k_10k',
  status: 'complete',
  limits: {
    monthlyLimit: 5000,
    used: 2340,
    currency: 'GBP',
  },
  verificationDate: '2026-01-30',
};

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 'sup_001',
    name: 'Kwame Asante',
    country: 'Ghana',
    countryCode: 'GH',
    countryFlag: '🇬🇭',
    type: 'supplier',
    paymentMethod: 'MTN Mobile Money',
    phone: '+233 24 XXX XXXX',
    lastPaid: '2 days ago',
    totalPaid: 12500,
  },
  {
    id: 'sup_002',
    name: 'Adaeze Textiles Ltd',
    country: 'Nigeria',
    countryCode: 'NG',
    countryFlag: '🇳🇬',
    type: 'supplier',
    paymentMethod: 'Bank Transfer',
    lastPaid: '1 week ago',
    totalPaid: 8400,
  },
  {
    id: 'sup_003',
    name: 'Raj Kumar',
    country: 'India',
    countryCode: 'IN',
    countryFlag: '🇮🇳',
    type: 'contractor',
    paymentMethod: 'Bank Transfer',
    lastPaid: '3 days ago',
    totalPaid: 4200,
  },
  {
    id: 'sup_004',
    name: 'Maria Santos',
    country: 'Philippines',
    countryCode: 'PH',
    countryFlag: '🇵🇭',
    type: 'contractor',
    paymentMethod: 'GCash',
    lastPaid: '5 days ago',
    totalPaid: 2100,
  },
];

export const MOCK_FX_RATES: Record<string, number> = {
  'GBP-GHS': 19.42,
  'GBP-NGN': 1850.50,
  'GBP-INR': 106.25,
  'GBP-KES': 162.30,
  'GBP-ZAR': 23.15,
  'GBP-PHP': 71.50,
};

export const MOCK_CORRIDORS: Corridor[] = [
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS', methods: ['Mobile Money', 'Bank Transfer'] },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', methods: ['Bank Transfer'] },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES', methods: ['M-Pesa', 'Bank Transfer'] },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', methods: ['Bank Transfer', 'UPI'] },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', currency: 'PHP', methods: ['GCash', 'Bank Transfer'] },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', methods: ['Bank Transfer'] },
];

export const EXISTING_USER_VERIFICATION_CHECKS: VerificationCheck[] = [
  {
    id: 'check_identity',
    name: 'Identity Verification',
    description: 'Already verified from personal account',
    status: 'complete',
  },
  {
    id: 'check_business',
    name: 'Business Registration',
    description: 'Companies House lookup',
    status: 'pending',
  },
  {
    id: 'check_director',
    name: 'Director Match',
    description: 'Confirming you are a registered director',
    status: 'pending',
  },
  {
    id: 'check_aml',
    name: 'AML Screening',
    description: 'Sanctions, PEP, and adverse media check',
    status: 'pending',
  },
];

export const NEW_USER_VERIFICATION_CHECKS: VerificationCheck[] = [
  {
    id: 'check_document',
    name: 'Document Verification',
    description: 'Checking ID document authenticity',
    status: 'pending',
  },
  {
    id: 'check_address',
    name: 'Address Verification',
    description: 'Confirming residential address',
    status: 'pending',
  },
  {
    id: 'check_biometric',
    name: 'Biometric Match',
    description: 'Matching selfie to ID photo',
    status: 'pending',
  },
  {
    id: 'check_business',
    name: 'Business Registration',
    description: 'Companies House lookup',
    status: 'pending',
  },
  {
    id: 'check_ubo',
    name: 'Beneficial Ownership',
    description: 'Identifying owners with 25%+ stake',
    status: 'pending',
  },
  {
    id: 'check_aml',
    name: 'AML/CFT Screening',
    description: 'Sanctions, PEP, and adverse media check',
    status: 'pending',
  },
];

export const PAYMENT_STEPS: PaymentStep[] = [
  {
    id: 'step_initiated',
    status: 'pending',
    title: 'Payment Initiated',
    description: "You've confirmed the payment",
  },
  {
    id: 'step_received',
    status: 'pending',
    title: 'Funds Received',
    description: "We've received your payment",
  },
  {
    id: 'step_compliance',
    status: 'pending',
    title: 'Compliance Checks',
    description: 'Running security checks',
    details: [
      'Transaction screening',
      'Recipient sanctions check',
      'Source of funds verification',
      'AML risk assessment',
    ],
  },
  {
    id: 'step_converting',
    status: 'pending',
    title: 'Converting Currency',
    description: 'Converting GBP to local currency',
  },
  {
    id: 'step_sending',
    status: 'pending',
    title: 'Sending to Recipient',
    description: 'Initiating transfer to recipient',
  },
  {
    id: 'step_delivered',
    status: 'pending',
    title: 'Delivered',
    description: 'Money delivered successfully',
  },
];

export const BUSINESS_TYPES = [
  { value: 'sole_trader', label: 'Sole Trader' },
  { value: 'limited_company', label: 'Limited Company' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
  { value: 'other', label: 'Other' },
];

export const VOLUME_RANGES = [
  { value: 'under_1k', label: 'Under £1,000' },
  { value: '1k_5k', label: '£1,000 - £5,000' },
  { value: '5k_10k', label: '£5,000 - £10,000' },
  { value: '10k_50k', label: '£10,000 - £50,000' },
  { value: 'over_50k', label: 'Over £50,000' },
];

export const ID_DOCUMENT_TYPES = [
  { value: 'passport', label: 'Passport', icon: '📘' },
  { value: 'driving_licence', label: 'Driving Licence', icon: '🪪' },
  { value: 'national_id', label: 'National ID Card', icon: '🆔' },
];

export const NATIONALITIES = [
  { value: 'GB', label: 'British' },
  { value: 'GH', label: 'Ghanaian' },
  { value: 'NG', label: 'Nigerian' },
  { value: 'KE', label: 'Kenyan' },
  { value: 'IN', label: 'Indian' },
  { value: 'PH', label: 'Filipino' },
  { value: 'ZA', label: 'South African' },
  { value: 'US', label: 'American' },
  { value: 'OTHER', label: 'Other' },
];
