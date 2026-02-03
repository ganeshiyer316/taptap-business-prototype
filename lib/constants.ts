export const COLORS = {
  primary: '#00B67A',
  primaryDark: '#009966',
  primaryLight: '#DCFCE7',
  success: '#166534',
  successBg: '#F0FDF4',
  warning: '#92400E',
  warningBg: '#FEF3C7',
  error: '#DC2626',
  errorBg: '#FEE2E2',
  gray900: '#111827',
  gray700: '#374151',
  gray500: '#6B7280',
  gray200: '#E5E7EB',
  gray50: '#F9FAFB',
  white: '#FFFFFF',
};

export const ANIMATION_DELAYS = {
  verificationStep: 1500,
  paymentStep: 1500,
  checkComplete: 500,
};

export const STEP_DELAYS = [
  3000,  // Step 1 → 2: 3 seconds
  3500,  // Step 2 → 3: 3.5 seconds
  4000,  // Step 3 → 4: 4 seconds (Compliance - needs time to read details)
  3500,  // Step 4 → 5: 3.5 seconds
  3000,  // Step 5 → 6: 3 seconds (delivery)
];

export const LIMITS = {
  initialMonthly: 5000,
  maxSingleTransaction: 10000,
  eddThreshold: 2000,
};

export const APP_NAME = 'Tap Tap Send Business';
export const APP_TAGLINE = 'Pay suppliers worldwide, in seconds';

export const ROUTES = {
  home: '/',
  existingUser: '/demo/existing-user',
  existingUserUpgrade: '/demo/existing-user/upgrade',
  existingUserKyb: '/demo/existing-user/kyb',
  existingUserVerification: '/demo/existing-user/verification',
  existingUserSuccess: '/demo/existing-user/success',
  newBusiness: '/demo/new-business',
  newBusinessPersonal: '/demo/new-business/personal',
  newBusinessId: '/demo/new-business/id-verification',
  newBusinessSelfie: '/demo/new-business/selfie',
  newBusinessDetails: '/demo/new-business/business-details',
  newBusinessVerification: '/demo/new-business/verification',
  newBusinessSuccess: '/demo/new-business/success',
  dashboard: '/demo/dashboard',
  payment: '/demo/payment',
  paymentSelectSupplier: '/demo/payment/select-supplier',
  paymentAmount: '/demo/payment/amount',
  paymentReview: '/demo/payment/review',
  paymentProcessing: '/demo/payment/processing',
  paymentSuccess: '/demo/payment/success',
};
