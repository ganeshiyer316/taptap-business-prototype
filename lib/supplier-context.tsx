'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { Supplier } from './types';
import { MOCK_SUPPLIERS, MOCK_CORRIDORS } from './mock-data';

interface SupplierContextType {
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => string;
  getSupplier: (id: string) => Supplier | undefined;
}

const SupplierContext = createContext<SupplierContextType | undefined>(undefined);

export function SupplierProvider({ children }: { children: ReactNode }) {
  const [additionalSuppliers, setAdditionalSuppliers] = useState<Supplier[]>([]);

  // Combine mock suppliers with any newly added ones
  const suppliers = useMemo(
    () => [...MOCK_SUPPLIERS, ...additionalSuppliers],
    [additionalSuppliers]
  );

  const addSupplier = useCallback((supplierData: Omit<Supplier, 'id'>) => {
    const newId = `sup_new_${Date.now()}`;
    const newSupplier: Supplier = {
      ...supplierData,
      id: newId,
    };
    setAdditionalSuppliers((prev) => [...prev, newSupplier]);
    return newId;
  }, []);

  const getSupplier = useCallback(
    (id: string) => {
      return suppliers.find((s) => s.id === id);
    },
    [suppliers]
  );

  return (
    <SupplierContext.Provider value={{ suppliers, addSupplier, getSupplier }}>
      {children}
    </SupplierContext.Provider>
  );
}

export function useSuppliers() {
  const context = useContext(SupplierContext);
  if (context === undefined) {
    throw new Error('useSuppliers must be used within a SupplierProvider');
  }
  return context;
}

// Helper to create a supplier object from URL params
export function createSupplierFromParams(params: URLSearchParams): Omit<Supplier, 'id'> {
  const countryCode = params.get('country') || 'GH';
  const corridor = MOCK_CORRIDORS.find((c) => c.code === countryCode);

  return {
    name: params.get('name') || 'New Supplier',
    country: corridor?.name || 'Ghana',
    countryCode: countryCode,
    countryFlag: corridor?.flag || '🇬🇭',
    type: (params.get('supplierType') as 'supplier' | 'contractor' | 'vendor') || 'supplier',
    paymentMethod: params.get('paymentMethod')?.replace(/_/g, ' ') || 'Mobile Money',
    phone: params.get('phone') || '',
    lastPaid: undefined,
    totalPaid: 0,
  };
}
