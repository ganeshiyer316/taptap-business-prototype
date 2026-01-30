# Tap Tap Send Business - B2B Payments Prototype

Interactive prototype demonstrating a B2B supplier payment product for Tap Tap Send.

**Author:** Ganesh Iyer (Head of Product - Payments, Entain)

## Demo Flows

### 1. Existing User Upgrade
Experience how a current Tap Tap Send consumer user can upgrade to a business account with minimal friction - leveraging their existing KYC verification.

### 2. New Business Signup
Full KYC/KYB onboarding flow for new business users, including:
- Personal details collection
- ID verification (document capture)
- Selfie/liveness check
- Business details and Companies House verification

### 3. Supplier Payment
Complete payment journey with:
- Supplier selection
- Amount entry with live FX rates
- Payment review
- Real-time status tracking (like package tracking)
- Receipt generation

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the prototype.

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

### Option 2: GitHub Integration

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and deploy

## Project Structure

```
app/
├── page.tsx                    # Home - Flow selector
├── demo/
│   ├── existing-user/          # Existing user upgrade flow
│   ├── new-business/           # New business signup flow
│   ├── dashboard/              # Business dashboard
│   └── payment/                # Payment flow
components/
├── ui/                         # Reusable UI components
├── layout/                     # Layout components
├── verification/               # KYC/KYB verification components
└── payment/                    # Payment-specific components
lib/
├── types.ts                    # TypeScript types
├── mock-data.ts                # Demo data
└── constants.ts                # App constants
hooks/
├── useVerification.ts          # Verification animation hook
└── usePaymentStatus.ts         # Payment status animation hook
```

## Key Features Demonstrated

1. **Progressive Trust Model** - Existing users skip personal KYC
2. **Compliance-by-Design** - KYC/KYB/AML flows built into the product
3. **Payment Transparency** - Real-time status tracking like package delivery
4. **Business Receipts** - Professional PDF receipts for accounting

## Brand Colors

- Primary Green: `#00B67A`
- Primary Dark: `#009966`
- Primary Light: `#DCFCE7`

## Author

**Ganesh Iyer**
- Head of Product (Payments), Entain
- 15+ years: ASOS, Signifyd, Harvey Nichols
- Managing £40B+ annual payment volume

---

*Built for CEO demo - Tap Tap Send B2B Payments*
