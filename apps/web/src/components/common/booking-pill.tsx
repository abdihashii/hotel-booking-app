import { SearchIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { useDatePicker } from '@/hooks/use-date-picker';

import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { add } from 'date-fns';

export function BookingPill() {
  const {
    // State
    checkInDate,
    checkOutDate,

    // Handlers
    handleCheckInDateChange,
    handleCheckOutDateChange,
  } = useDatePicker();

  return (
    <div
      className="flex gap-14 justify-start items-center px-10 py-4 rounded-full bg-background border border-border w-fit"
    >
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="flex flex-col items-start justify-start hover:cursor-pointer group"
          >
            <p
              className="text-sm text-muted-foreground group-hover:text-primary transition-all duration-200"
            >
              Check In
            </p>
            <p className="font-medium">
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

      <Separator orientation="vertical" className="bg-border h-8!" />
      
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="flex flex-col items-start justify-start hover:cursor-pointer group"
          >
            <p
              className="text-sm text-muted-foreground group-hover:text-primary transition-all duration-200"
            >
              Check Out
            </p>
            <p className="font-medium">
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

      <Separator orientation="vertical" className="bg-border h-8!" />
      
      <div className="flex flex-col items-start justify-start hover:cursor-pointer group">
        <p
          className="text-muted-foreground group-hover:text-primary transition-all duration-200"
        >
          Guests
        </p>
        <p className="font-medium">Add Guests</p>
      </div>
      <SearchIcon
        className="w-7 h-7 hover:cursor-pointer text-muted-foreground hover:text-primary transition-all duration-200"
      />
    </div>
  );
}
