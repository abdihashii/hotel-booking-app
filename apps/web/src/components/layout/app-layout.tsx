import type { ReactNode } from 'react';

import { Header } from './header';

export function AppLayout({ children }: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-auto bg-background px-4 py-6">
        {children}
      </main>
    </div>
  );
}
