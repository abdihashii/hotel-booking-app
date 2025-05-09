import { add } from 'date-fns';
import { useEffect, useState } from 'react';

export function useDatePicker() {
  const [checkInDate, setCheckInDate] = useState<Date>(
    () => new Date(),
  );
  const [checkOutDate, setCheckOutDate] = useState<Date>(
    () => add(new Date(), { days: 1 }),
  );

  const handleCheckInDateChange = (date: Date | undefined) => {
    if (date) {
      setCheckInDate(date);
    }
  };

  const handleCheckOutDateChange = (date: Date | undefined) => {
    if (date) {
      setCheckOutDate(date);
    }
  };

  // Effect to ensure checkOutDate is always one day after checkInDate if 
  // checkInDate is set to a new date later than checkOutDate
  useEffect(() => {
    if (checkOutDate < checkInDate) {
      setCheckOutDate(add(checkInDate, { days: 1 }));
    }
  }, [checkInDate, checkOutDate]);

  return {
    // State
    checkInDate,
    checkOutDate,

    // Handlers
    handleCheckInDateChange,
    handleCheckOutDateChange,
  };
}
