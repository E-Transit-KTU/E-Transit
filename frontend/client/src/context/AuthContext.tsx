import { createContext, useContext, useState, ReactNode } from "react";

type Role = "passenger" | "inspector" | "admin" | "driver";

interface User {
  name: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  signInAsPassenger: () => void;
  signInAsInspector: () => void;
  signInAsAdmin: () => void;
  signInAsDriver: () => void;
  signInAsWorker: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // demo logins — later replaced by real authentication
  const signInAsPassenger = () => setUser({ name: "Passenger Demo", role: "passenger" });
  const signInAsInspector = () => setUser({ name: "Inspector Demo", role: "inspector" });
  const signInAsAdmin = () => setUser({ name: "Admin Demo", role: "admin" });
  const signInAsDriver = () => setUser({ name: "Driver Demo", role: "driver" });

  const signInAsWorker = () =>
  setUser({ name: "Worker Demo", role: "driver" });

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInAsPassenger,
        signInAsInspector,
        signInAsAdmin,
        signInAsDriver,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

