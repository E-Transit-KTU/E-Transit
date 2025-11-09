// src/pages/PassengerPage.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TicketsPage from "./TicketsPage";

const PassengerPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            E-Transit – Keleivis
          </h1>
          <p className="text-sm text-slate-500">
            Prisijungta kaip {user?.name} ({user?.role})
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-slate-900 text-white px-4 py-1 rounded-md hover:bg-slate-800"
        >
          Atsijungti
        </button>
      </header>

      {/* Ticket management */}
      <TicketsPage />
    </div>
  );
};

export default PassengerPage;
