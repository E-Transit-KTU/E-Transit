import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import VehiclePage from "./pages/VehiclePage"
import TicketsPage from "./pages/TicketsPage";


export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/routes" element={<div className="p-6">Routes Page</div>} />
                    <Route path="/tickets" element={<TicketsPage />} />
                    <Route path="/vehicles" element={<VehiclePage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
