// src/pages/LoginPage.tsx
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { signInPassenger, signInWorker } = useAuth();
  const [activeTab, setActiveTab] = useState<"PASSENGER" | "WORKER">("PASSENGER");
  const [workerRole, setWorkerRole] = useState<"admin" | "inspector" | "driver">("driver");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "PASSENGER") {
      signInPassenger();
      navigate("/passenger", { replace: true });
    } else {
      signInWorker(workerRole);
      // redirect automatically depending on role
      switch (workerRole) {
        case "admin":
          navigate("/admin", { replace: true });
          break;
        case "inspector":
          navigate("/inspector", { replace: true });
          break;
        case "driver":
          navigate("/driver", { replace: true });
          break;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow p-6 space-y-4">
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("PASSENGER")}
            className={`flex-1 py-2 rounded-md ${
              activeTab === "PASSENGER" ? "bg-blue-600 text-white" : "bg-slate-200"
            }`}
          >
            Passenger
          </button>
          <button
            onClick={() => setActiveTab("WORKER")}
            className={`flex-1 py-2 rounded-md ${
              activeTab === "WORKER" ? "bg-blue-600 text-white" : "bg-slate-200"
            }`}
          >
            Worker
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {activeTab === "WORKER" && (
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Worker role
              </label>
              <select
                className="mt-1 w-full border rounded-md px-3 py-2"
                value={workerRole}
                onChange={(e) => setWorkerRole(e.target.value as any)}
              >
                <option value="driver">Driver</option>
                <option value="inspector">Inspector</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
