import { SearchIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

export function BookingPill() {
  return (
    <div
      className="flex gap-10 justify-start items-center px-9 py-3 rounded-full bg-background border border-border w-fit"
    >
      <div className="flex flex-col items-start justify-start hover:cursor-pointer group">
        <p
          className="text-xs text-muted-foreground group-hover:text-primary transition-all duration-200"
        >
          Check In
        </p>
        <p className="text-sm font-medium">Add Date</p>
      </div>
      <Separator orientation="vertical" className="bg-border h-6!" />
      <div className="flex flex-col items-start justify-start hover:cursor-pointer group">
        <p
          className="text-xs text-muted-foreground group-hover:text-primary transition-all duration-200"
        >
          Check Out
        </p>
        <p className="text-sm font-medium">Add Date</p>
      </div>
      <Separator orientation="vertical" className="bg-border h-6!" />
      <div className="flex flex-col items-start justify-start hover:cursor-pointer group">
        <p
          className="text-xs text-muted-foreground group-hover:text-primary transition-all duration-200"
        >
          Guests
        </p>
        <p className="text-sm font-medium">Add Guests</p>
      </div>
      <SearchIcon
        className="w-5 h-5 hover:cursor-pointer text-muted-foreground hover:text-primary transition-all duration-200"
      />
    </div>
  );
}
