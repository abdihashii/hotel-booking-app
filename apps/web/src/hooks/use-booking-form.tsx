import { useState } from "react";

export function useBookingForm() {
  const [guests, setGuests] = useState(1);

  const handleGuestsChange = (value: number) => {
    setGuests(value);
  };

  return {
    // State
    guests,

    // Handlers
    handleGuestsChange,
  };
}