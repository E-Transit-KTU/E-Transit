// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type Role = "passenger" | "inspector" | "admin" | "driver";

interface User {
  name: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  signInPassenger: () => void;
  signInWorker: (role: "admin" | "inspector" | "driver") => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Passenger login
  const signInPassenger = () => {
    setUser({ name: "Passenger Demo", role: "passenger" });
  };

  // Worker login (admin/driver/inspector)
  const signInWorker = (role: "admin" | "inspector" | "driver") => {
    setUser({ name: `${role[0].toUpperCase() + role.slice(1)} Demo`, role });
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signInPassenger, signInWorker, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
