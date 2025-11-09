// src/pages/TicketsPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ticketService, Ticket } from "../services/TicketService";

const statusLabels: Record<number, string> = {
  1: "Nupirktas",
  2: "Aktyvuotas",
  3: "Pasibaigęs",
  4: "Negaliojantis",
};

const DISCOUNT_OPTIONS = [
  { value: "", label: "Be nuolaidos" },
  { value: "1", label: "Studento nuolaida" },
  { value: "2", label: "Moksleivio nuolaida" },
  { value: "3", label: "Senjoro nuolaida" },
];

const PAYMENT_METHODS = [
  { value: "card", label: "Banko kortelė" },
  { value: "mobile", label: "Mobilus apmokėjimas" },
  { value: "kiosk", label: "Kioskas / POS" },
];

const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // buy
  const [email, setEmail] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  // mark (this can stay, it’s still a passenger action in your system)
  const [markId, setMarkId] = useState("");
  const [markVehicle, setMarkVehicle] = useState("");

  const loadTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ticketService.getAll();
      setTickets(data);
    } catch (err) {
      console.error(err);
      setError("Nepavyko gauti bilietų sąrašo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ticketService.purchase({
        naudotojas: email || null,
        nuolaidaId: selectedDiscount ? Number(selectedDiscount) : null,
        // paymentMethod would go here if backend supports
      });

      setEmail("");
      setSelectedDiscount("");
      await loadTickets();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleMark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!markId) return;
    try {
      await ticketService.mark(markId, {
        transportoPriemonesKodas: markVehicle || "",
      });
      setMarkId("");
      setMarkVehicle("");
      await loadTickets();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* header like VehiclePage */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-left">Bilietai</h1>
        <div className="space-x-2">
          <button
            onClick={loadTickets}
            className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-md text-sm"
          >
            Atnaujinti
          </button>
          <Link
            to="/routes"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Maršrutai
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
        {/* LEFT: tickets list */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Visi bilietai</h2>
            <button
              onClick={loadTickets}
              className="text-sm bg-slate-800 text-white px-3 py-1 rounded-md"
            >
              Atnaujinti
            </button>
          </div>
          {loading ? (
            <p className="p-6 text-sm text-slate-500">Kraunama...</p>
          ) : error ? (
            <p className="p-6 text-sm text-red-500">{error}</p>
          ) : tickets.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">Nėra bilietų.</p>
          ) : (
            <ul className="divide-y">
              {tickets.map((t) => (
                <li key={t.id} className="px-6 py-4 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-sm text-slate-800">{t.id}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        t.statusas === 2
                          ? "bg-green-100 text-green-700"
                          : t.statusas === 1
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {statusLabels[t.statusas] ?? t.statusas}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Naudotojas: {t.naudotojas ?? "—"}
                  </p>
                  <p className="text-xs text-slate-500">
                    Pirkta: {new Date(t.pirkimoData).toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500">
                    Aktyvuota:{" "}
                    {t.aktyvavimoData
                      ? new Date(t.aktyvavimoData).toLocaleString()
                      : "neaktyvuota"}
                  </p>
                  <p className="text-xs text-slate-500">
                    Transporto priemonė: {t.transportoPriemonesKodas ?? "—"}
                  </p>
                  <p className="text-xs text-slate-500">
                    Kaina: €{t.galutineKaina?.toFixed(2)}
                    {t.nuolaidaId ? ` (nuolaida ${t.nuolaidaId})` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT: forms */}
        <div className="space-y-6">
          {/* buy */}
          <div className="bg-white rounded-lg shadow p-4 space-y-3">
            <h3 className="font-semibold">Pirkti bilietą</h3>
            <form onSubmit={handleBuy} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">El. paštas (nebūtina)</label>
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jonas@example.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Nuolaida</label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={selectedDiscount}
                  onChange={(e) => setSelectedDiscount(e.target.value)}
                >
                  {DISCOUNT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Apmokėjimo būdas</label>
                <div className="flex gap-2">
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      key={pm.value}
                      type="button"
                      onClick={() => setPaymentMethod(pm.value)}
                      className={`flex-1 text-sm px-2 py-1 border rounded-md ${
                        paymentMethod === pm.value
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white"
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white text-sm px-3 py-1 rounded-md"
              >
                Pirkti
              </button>
            </form>
          </div>

          {/* mark (pažymėti) */}
          <div className="bg-white rounded-lg shadow p-4 space-y-3">
            <h3 className="font-semibold">Pažymėti bilietą</h3>
            <form onSubmit={handleMark} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Bilieto ID</label>
                <input
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={markId}
                    onChange={(e) => setMarkId(e.target.value)}
                    required
                    placeholder="Įklijuok bilieto ID"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Transporto priemonės kodas</label>
                <input
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={markVehicle}
                    onChange={(e) => setMarkVehicle(e.target.value)}
                    placeholder="BUS-24"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 text-white text-sm px-3 py-1 rounded-md"
              >
                Pažymėti
              </button>
            </form>
          </div>

          {/* we REMOVED the validate/check block here */}
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
