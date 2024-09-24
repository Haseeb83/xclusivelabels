import React, { ReactNode } from "react";

export const TimezoneContext = React.createContext<{
  timezone: string;
  setTimezone: React.Dispatch<React.SetStateAction<string>>;
}>({ setTimezone: () => {}, timezone: "" });

export const TimezoneProvider = ({ children }: { children: ReactNode }) => {
  const [timezone, setTimezone] = React.useState("est");

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
};
