import { useState, useMemo } from "react";
import SessionContext from "./SessionContext";

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    guid: null,
    expirationTime: null,
    isVerified: false,
  });

  const value = useMemo(() => [session, setSession], [session]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;
