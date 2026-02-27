import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Header } from './header';

export function AppLayout({ children, transparentHeader = false }: {
  children: ReactNode;
  transparentHeader?: boolean;
}) {
  return (
    <div className={cn('relative', transparentHeader ? 'h-screen' : 'flex h-screen flex-col')}>
      <Header transparent={transparentHeader} />
      <main className={cn(
        'overflow-auto',
        transparentHeader ? 'h-full' : 'flex-1 bg-background px-4 py-6',
      )}>
        {children}
      </main>
    </div>
  );
}
