import React, { useEffect, useState } from "react";
import {
  ticketService,
  Ticket,
} from "../services/TicketService";

const statusLabels: Record<number, string> = {
  1: "Nupirktas",
  2: "Aktyvuotas",
  3: "Pasibaigęs",
  4: "Negaliojantis",
};

const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // buy form
  const [email, setEmail] = useState("");
  const [discountId, setDiscountId] = useState("");

  // mark form
  const [markId, setMarkId] = useState("");
  const [markVehicle, setMarkVehicle] = useState("");

  // validate form
  const [valId, setValId] = useState("");
  const [valVehicle, setValVehicle] = useState("");
  const [valResult, setValResult] = useState<any>(null);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const data = await ticketService.getAll();
      setTickets(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Nepavyko gauti bilietų");
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
        nuolaidaId: discountId ? Number(discountId) : null,
      });
      setEmail("");
      setDiscountId("");
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

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valId) return;
    try {
      const res = await ticketService.validate(valId, {
        transportoPriemonesKodas: valVehicle || null,
      });
      setValResult(res);
    } catch (err: any) {
      setValResult({ valid: false, reason: err.message });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-left">Bilietai</h1>

      <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
        {/* LEFT: ticket list */}
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
                    <span className="font-mono text-sm text-slate-800">
                      {t.id}
                    </span>
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
                <label className="block text-sm mb-1">Nuolaidos ID (nebūtina)</label>
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={discountId}
                  onChange={(e) => setDiscountId(e.target.value)}
                  placeholder="1, 2..."
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white text-sm px-3 py-1 rounded-md"
              >
                Pirkti
              </button>
            </form>
          </div>

          {/* mark */}
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

          {/* validate */}
          <div className="bg-white rounded-lg shadow p-4 space-y-3">
            <h3 className="font-semibold">Patikrinti bilietą</h3>
            <form onSubmit={handleValidate} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Bilieto ID</label>
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={valId}
                  onChange={(e) => setValId(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Transporto priemonės kodas (nebūtina)
                </label>
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={valVehicle}
                  onChange={(e) => setValVehicle(e.target.value)}
                  placeholder="BUS-24"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-md"
              >
                Tikrinti
              </button>
            </form>
            {valResult && (
              <div
                className={`text-sm rounded p-2 ${
                  valResult.valid
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <p>Galiojantis: {String(valResult.valid)}</p>
                {valResult.reason && <p>Priežastis: {valResult.reason}</p>}
                {valResult.expiresAt && (
                  <p>
                    Galioja iki:{" "}
                    {new Date(valResult.expiresAt).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
