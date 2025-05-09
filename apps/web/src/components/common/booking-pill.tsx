import { SearchIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

export function BookingPill() {
  return (
    <div
      className="flex gap-14 justify-start items-center px-10 py-4 rounded-full bg-background border border-border w-fit"
    >
      <div
        className="flex flex-col items-start justify-start hover:cursor-pointer group"
      >
        <p
          className="text-sm text-muted-foreground group-hover:text-primary transition-all duration-200"
        >
          Check In
        </p>
        <p className="font-medium">Add Date</p>
      </div>
      <Separator orientation="vertical" className="bg-border h-8!" />
      <div className="flex flex-col items-start justify-start hover:cursor-pointer group">
        <p
          className="text-sm text-muted-foreground group-hover:text-primary transition-all duration-200"
        >
          Check Out
        </p>
        <p className="font-medium">Add Date</p>
      </div>
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
