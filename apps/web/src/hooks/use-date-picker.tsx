import { add, isBefore, startOfDay } from 'date-fns';
import { useCallback, useState } from 'react';
import type { DateRange } from 'react-day-picker';

type SelectionPhase = 'idle' | 'selectingCheckIn' | 'selectingCheckOut';

function defaultRange(): DateRange {
  return {
    from: startOfDay(add(new Date(), { days: 1 })),
    to: startOfDay(add(new Date(), { days: 2 })),
  };
}

export function useDatePicker() {
  const [dateRange, setDateRange] = useState<DateRange>(defaultRange);
  const [selectionPhase, setSelectionPhase] =
    useState<SelectionPhase>('idle');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const openForCheckIn = useCallback(() => {
    setSelectionPhase('selectingCheckIn');
    setIsCalendarOpen(true);
  }, []);

  const openForCheckOut = useCallback(() => {
    setSelectionPhase('selectingCheckOut');
    setIsCalendarOpen(true);
  }, []);

  const handleDayClick = useCallback(
    (day: Date) => {
      if (selectionPhase === 'selectingCheckIn') {
        if (dateRange.to && !isBefore(day, dateRange.to)) {
          // New check-in is on or after existing check-out — need new checkout
          setDateRange({ from: day, to: undefined });
          setSelectionPhase('selectingCheckOut');
        } else if (dateRange.to) {
          // New check-in is before existing check-out — keep checkout, done
          setDateRange({ from: day, to: dateRange.to });
          setSelectionPhase('idle');
          setIsCalendarOpen(false);
        } else {
          // No existing check-out — advance to pick one
          setDateRange({ from: day, to: undefined });
          setSelectionPhase('selectingCheckOut');
        }
      } else if (selectionPhase === 'selectingCheckOut') {
        if (!dateRange.from) return;
        // Reject check-out on or before check-in (0-night / negative)
        if (!isBefore(dateRange.from, day)) return;
        setDateRange({ from: dateRange.from, to: day });
        setSelectionPhase('idle');
        setIsCalendarOpen(false);
      }
    },
    [selectionPhase, dateRange],
  );

  const clearDates = useCallback(() => {
    setDateRange(defaultRange());
    setSelectionPhase('idle');
    setIsCalendarOpen(false);
  }, []);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsCalendarOpen(open);
      if (!open) {
        if (!dateRange.from || !dateRange.to) {
          setDateRange(defaultRange());
        }
        setSelectionPhase('idle');
      }
    },
    [dateRange],
  );

  return {
    dateRange,
    selectionPhase,
    isCalendarOpen,

    openForCheckIn,
    openForCheckOut,
    handleDayClick,
    clearDates,
    handleOpenChange,
  };
}
