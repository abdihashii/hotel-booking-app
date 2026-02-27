import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/stores/theme-store';

export function Header({ transparent = false }: { transparent?: boolean }) {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <header
      className={cn(
        'flex h-16 items-center justify-between px-4 z-10',
        transparent
          ? 'absolute top-0 left-0 right-0 bg-transparent'
          : 'border-b bg-background',
      )}
    >
      <h1 className="text-2xl font-bold">Hotel Booking App</h1>
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleTheme}
        title="Toggle theme (M)"
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </Button>
    </header>
  );
}
