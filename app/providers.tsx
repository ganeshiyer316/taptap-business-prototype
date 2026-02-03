'use client';

import { SupplierProvider } from '@/lib/supplier-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return <SupplierProvider>{children}</SupplierProvider>;
}
