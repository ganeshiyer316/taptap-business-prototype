export interface User {
  id: string;
  type: 'personal' | 'business';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  verified: boolean;
  kycStatus: KYCStatus;
  createdAt: string;
}

export type KYCStatus =
  | 'not_started'
  | 'pending'
  | 'in_review'
  | 'complete'
  | 'failed';

export type KYBStatus =
  | 'not_started'
  | 'pending'
  | 'in_review'
  | 'complete'
  | 'failed'
  | 'additional_info_required';

export interface Business {
  id: string;
  name: string;
  tradingName?: string;
  registrationNumber: string;
  registrationType: BusinessType;
  industry: string;
  description: string;
  expectedVolume: VolumeRange;
  status: KYBStatus;
  limits: {
    monthlyLimit: number;
    used: number;
    currency: string;
  };
  verificationDate?: string;
}

export type BusinessType =
  | 'sole_trader'
  | 'limited_company'
  | 'partnership'
  | 'llp'
  | 'other';

export type VolumeRange =
  | 'under_1k'
  | '1k_5k'
  | '5k_10k'
  | '10k_50k'
  | 'over_50k';

export interface Supplier {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  type: 'supplier' | 'contractor' | 'vendor';
  paymentMethod: string;
  phone?: string;
  bankDetails?: {
    accountNumber: string;
    bankName: string;
  };
  lastPaid?: string;
  totalPaid?: number;
}

export interface Payment {
  id: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  convertedAmount: number;
  convertedCurrency: string;
  exchangeRate: number;
  fee: number;
  reference?: string;
  supplier: Supplier;
  createdAt: string;
  completedAt?: string;
  steps: PaymentStep[];
}

export type PaymentStatus =
  | 'initiated'
  | 'funds_received'
  | 'processing'
  | 'converting'
  | 'sending'
  | 'delivered'
  | 'bounced'
  | 'cancelled'
  | 'refunded';

export interface PaymentStep {
  id: string;
  status: 'complete' | 'current' | 'pending' | 'error';
  title: string;
  description: string;
  timestamp?: string;
  details?: string[];
}

export interface VerificationCheck {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'checking' | 'complete' | 'failed';
  completedAt?: string;
}

export interface Corridor {
  code: string;
  name: string;
  flag: string;
  currency: string;
  methods: string[];
}

export interface Transfer {
  recipient: string;
  amount: number;
  currency: string;
  date: string;
  country: string;
}

export interface PersonalKYC {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  nationality: string;
  residentialAddress: {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
  };
  idDocument: {
    type: 'passport' | 'driving_licence' | 'national_id';
    number?: string;
    expiryDate?: string;
  };
}

export interface BusinessKYB {
  businessName: string;
  tradingName?: string;
  registrationNumber: string;
  registrationCountry: string;
  registrationDate?: string;
  registeredAddress: {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
  };
  tradingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
  };
  businessType: BusinessType;
  industryCategory: string;
  businessDescription: string;
  websiteUrl?: string;
  expectedMonthlyVolume: VolumeRange;
  expectedTransactionSize: string;
  mainPurpose:
    | 'supplier_payments'
    | 'contractor_payments'
    | 'payroll'
    | 'other';
}
