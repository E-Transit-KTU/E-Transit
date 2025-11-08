import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user, signInAsWorker, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Transport System</h1>

        <div className="flex flex-col gap-3 mb-6">
          <Link
            to="/routes"
            className="bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            View Routes
          </Link>

          <Link
            to="/tickets"
            className="bg-green-600 text-white py-2 rounded-xl font-medium hover:bg-green-700 transition"
          >
            Buy Tickets
          </Link>

          {user?.role === "worker" && (
            <Link
              to="/vehicles"
              className="bg-gray-800 text-white py-2 rounded-xl font-medium hover:bg-gray-900 transition"
            >
              Manage Vehicles
            </Link>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          {user ? (
            <div className="flex flex-col gap-2 items-center">
              <span>
                Signed in as <strong>{user.name}</strong> ({user.role})
              </span>
              <button
                onClick={signOut}
                className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={signInAsWorker}
              className="bg-indigo-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Sign In as Worker (Demo)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
