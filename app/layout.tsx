import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Tap Tap Send Business | B2B Supplier Payments',
  description: 'Pay suppliers worldwide, in seconds. B2B payments powered by Tap Tap Send.',
  keywords: 'B2B payments, supplier payments, international payments, business remittance',
  authors: [{ name: 'Ganesh Iyer' }],
  openGraph: {
    title: 'Tap Tap Send Business',
    description: 'Pay suppliers worldwide, in seconds.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
