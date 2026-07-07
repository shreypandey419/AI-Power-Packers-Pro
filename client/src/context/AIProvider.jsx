import { useState } from "react";
import AIContext from "./AIContext";

export default function AIProvider({ children }) {
  const [bookingData, setBookingData] = useState(null);
  const [confirmBooking, setConfirmBooking] = useState(false);

  return (
    <AIContext.Provider
        value={{
          bookingData,
          setBookingData,
          confirmBooking,
          setConfirmBooking,
        }}
      >
      {children}
    </AIContext.Provider>
  );
}