import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/theme-provider';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className="flex h-16 items-center justify-between border-b bg-background px-4"
    >
      <h1 className="text-2xl font-bold">Hotel Booking App</h1>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </Button>
    </header>
  );
}
