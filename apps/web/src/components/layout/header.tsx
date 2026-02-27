import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <span className="flex items-center gap-1.5">
            Toggle theme
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              M
            </kbd>
          </span>
        </TooltipContent>
      </Tooltip>
    </header>
  );
}
