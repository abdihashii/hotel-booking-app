import { MinusIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useDatePicker } from '@/hooks/use-date-picker';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useBookingForm } from '@/hooks/use-booking-form';
import { Button } from '@/components/ui/button';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

function formatDate(date: Date | undefined) {
  if (!date) return 'Select date';
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function BookingPill() {
  const {
    dateRange,
    selectionPhase,
    isCalendarOpen,
    openForCheckIn,
    openForCheckOut,
    handleDayClick,
    clearDates,
    handleOpenChange,
  } = useDatePicker();

  const { guests, handleGuestsChange } = useBookingForm();

  const isLg = useMediaQuery('(min-width: 1024px)');

  const handleKeyDown =
    (handler: () => void) => (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-14 justify-start items-stretch md:items-center px-4 md:px-10 py-4 rounded-lg md:rounded-full bg-background border border-border w-full md:w-fit max-w-full overflow-x-auto">
      {/* Shared date range popover */}
      <Popover open={isCalendarOpen} onOpenChange={handleOpenChange}>
        <PopoverAnchor asChild>
          <div className="flex flex-col md:flex-row gap-4 md:gap-14 items-stretch md:items-center">
            {/* Check In trigger */}
            <div
              role="button"
              tabIndex={0}
              className="flex flex-col items-start justify-start hover:cursor-pointer group w-full md:w-auto"
              onClick={openForCheckIn}
              onKeyDown={handleKeyDown(openForCheckIn)}
            >
              <p
                className={cn(
                  'text-sm text-muted-foreground group-hover:text-primary transition-all duration-200',
                  selectionPhase === 'selectingCheckIn' &&
                    'text-primary font-semibold',
                )}
              >
                Check In
              </p>
              <p className="font-medium md:w-36 w-full">
                {formatDate(dateRange.from)}
              </p>
            </div>

            <Separator
              orientation="vertical"
              className="bg-border h-auto md:h-8 hidden md:block"
            />

            {/* Check Out trigger */}
            <div
              role="button"
              tabIndex={0}
              className="flex flex-col items-start justify-start hover:cursor-pointer group w-full md:w-auto"
              onClick={openForCheckOut}
              onKeyDown={handleKeyDown(openForCheckOut)}
            >
              <p
                className={cn(
                  'text-sm text-muted-foreground group-hover:text-primary transition-all duration-200',
                  selectionPhase === 'selectingCheckOut' &&
                    'text-primary font-semibold',
                )}
              >
                Check Out
              </p>
              <p className="font-medium md:w-36 w-full">
                {formatDate(dateRange.to)}
              </p>
            </div>
          </div>
        </PopoverAnchor>

        <PopoverContent className="w-auto p-0" align="start" sideOffset={8}>
          <div className="p-4">
            {/* Header: phase indicator + clear button */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-muted-foreground">
                {selectionPhase === 'selectingCheckIn'
                  ? 'Select check-in date'
                  : selectionPhase === 'selectingCheckOut'
                    ? 'Select check-out date'
                    : 'Select dates'}
              </p>
              <button
                type="button"
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors"
                onClick={clearDates}
              >
                Clear dates
              </button>
            </div>

            {/* Dual-month range calendar */}
            <Calendar
              mode="range"
              selected={dateRange}
              onDayClick={handleDayClick}
              numberOfMonths={isLg ? 2 : 1}
              defaultMonth={dateRange.from ?? new Date()}
              disabled={{ before: new Date() }}
              initialFocus
            />
          </div>
        </PopoverContent>
      </Popover>

      <Separator
        orientation="vertical"
        className="bg-border h-auto md:h-8 hidden md:block"
      />

      {/* Guests popover — unchanged */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex flex-col items-start justify-start hover:cursor-pointer group w-full md:w-auto">
            <p className="text-muted-foreground group-hover:text-primary transition-all duration-200">
              Guests
            </p>
            <p className="font-medium md:w-20 w-full">
              {guests} Guest{guests === 1 ? '' : 's'}
            </p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleGuestsChange(guests - 1)}
              disabled={guests === 1}
            >
              <MinusIcon />
            </Button>
            <p className="w-10 text-center font-medium tabular-nums">
              {guests}
            </p>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleGuestsChange(guests + 1)}
              disabled={guests === 4}
            >
              <PlusIcon />
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <SearchIcon className="w-7 h-7 hover:cursor-pointer text-muted-foreground hover:text-primary transition-all duration-200 self-center md:self-auto mt-4 md:mt-0" />
    </div>
  );
}
