// src/pages/DriverPage.tsx
import { useAuth } from "../context/AuthContext";
export default function DriverPage() {
  const { user, signOut } = useAuth();
  return (
    <div className="p-4">
      <h1>Driver Dashboard</h1>
      <p>Welcome, {user?.name} ({user?.role})</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}
