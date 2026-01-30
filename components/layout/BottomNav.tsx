'use client';

import { Home, Send, Users, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/demo/dashboard', icon: Home, label: 'Home' },
  { href: '/demo/payment', icon: Send, label: 'Pay' },
  { href: '/demo/suppliers', icon: Users, label: 'Suppliers' },
  { href: '/demo/settings', icon: Settings, label: 'Settings' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 pb-6">
      <div className="flex justify-around items-center max-w-[375px] mx-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center gap-1 p-2 rounded-xl transition-colors
                ${isActive ? 'text-tts-green' : 'text-gray-400 hover:text-gray-600'}
              `}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
