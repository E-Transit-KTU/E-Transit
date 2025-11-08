import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  role: "user" | "worker";
}

interface AuthContextType {
  user: User | null;
  signInAsWorker: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signInAsWorker = () => setUser({ name: "John Doe", role: "worker" });
  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signInAsWorker, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
