import { useMemo } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { ThemeSync } from '@/components/theme-sync';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { queryClient } from '@/lib/query-client';
import { useThemeStore } from '@/stores/theme-store';

function RootComponent() {
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const shortcuts = useMemo(
    () => [{ key: 'm', handler: toggleTheme }],
    [toggleTheme],
  );

  useKeyboardShortcuts(shortcuts);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeSync />
        <Outlet />
        <TanStackRouterDevtools />
      </TooltipProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
