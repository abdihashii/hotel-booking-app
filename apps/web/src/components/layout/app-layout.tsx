import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Header } from './header';

export function AppLayout({ children, transparentHeader = false }: {
  children: ReactNode;
  transparentHeader?: boolean;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header transparent={transparentHeader} />
      <main className={cn(
        'flex-1 overflow-auto',
        transparentHeader ? '-mt-16' : 'bg-background px-4 py-6',
      )}>
        {children}
      </main>
    </div>
  );
}
