import { MinusIcon, PlusIcon, SearchIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { useDatePicker } from '@/hooks/use-date-picker';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { add } from 'date-fns';
import { useBookingForm } from '@/hooks/use-booking-form';
import { Button } from '@/components/ui/button';

export function BookingPill() {
  const {
    // State
    checkInDate,
    checkOutDate,

    // Handlers
    handleCheckInDateChange,
    handleCheckOutDateChange,
  } = useDatePicker();

  const {
    // State
    guests,

    // Handlers
    handleGuestsChange,
  } = useBookingForm();

  return (
    <div
      className="flex flex-col md:flex-row gap-4 md:gap-14 justify-start items-stretch md:items-center px-4 md:px-10 py-4 rounded-lg md:rounded-full bg-background border border-border w-full md:w-fit max-w-full overflow-x-auto"
    >
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="flex flex-col items-start justify-start hover:cursor-pointer group w-full md:w-auto"
          >
            <p
              className="text-sm text-muted-foreground group-hover:text-primary transition-all duration-200"
            >
              Check In
            </p>
            <p className="font-medium md:w-36 w-full">
              {checkInDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={checkInDate}
            onSelect={handleCheckInDateChange}
            // Disable dates before today
            disabled={{ before: new Date() }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Separator orientation="vertical" className="bg-border h-auto md:h-8 hidden md:block" />
      
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="flex flex-col items-start justify-start hover:cursor-pointer group w-full md:w-auto"
          >
            <p
              className="text-sm text-muted-foreground group-hover:text-primary transition-all duration-200"
            >
              Check Out
            </p>
            <p className="font-medium md:w-36 w-full">
              {checkOutDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={checkOutDate}
            onSelect={handleCheckOutDateChange}
            // Disable dates before tomorrow
            disabled={{ before: add(new Date(), { days: 1 }) }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Separator orientation="vertical" className="bg-border h-auto md:h-8 hidden md:block" />
      
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex flex-col items-start justify-start hover:cursor-pointer group w-full md:w-auto">
            <p
              className="text-muted-foreground group-hover:text-primary transition-all duration-200"
              >
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
              className="hover:cursor-pointer"
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
              className="hover:cursor-pointer"
              onClick={() => handleGuestsChange(guests + 1)}
              disabled={guests === 4}
            >
              <PlusIcon />
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <SearchIcon
        className="w-7 h-7 hover:cursor-pointer text-muted-foreground hover:text-primary transition-all duration-200 self-center md:self-auto mt-4 md:mt-0"
      />
    </div>
  );
}
