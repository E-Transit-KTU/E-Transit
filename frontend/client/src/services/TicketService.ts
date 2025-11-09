// src/services/ticketService.ts
import { API_CONFIG } from "../api/apiClient";

export interface Ticket {
  id: string;
  naudotojas: string | null;
  pirkimoData: string;
  aktyvavimoData: string | null;
  bazineKaina: number;
  galutineKaina: number;
  nuolaidaId: number | null;
  transportoPriemonesKodas: string | null;
  statusas: number;
}

export interface PurchaseTicketDto {
  naudotojas?: string | null;
  nuolaidaId?: number | null;
}

export interface MarkTicketDto {
  transportoPriemonesKodas: string;
}

export interface ValidateTicketDto {
  transportoPriemonesKodas?: string | null;
}

class TicketService {
  private baseUrl = `${API_CONFIG.baseURL}/tickets`;

  async getAll(): Promise<Ticket[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) {
      throw new Error("Failed to fetch tickets");
    }
    return res.json();
  }

  async purchase(data: PurchaseTicketDto): Promise<Ticket> {
    const res = await fetch(`${this.baseUrl}/purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to purchase ticket");
    }
    return res.json();
  }

  async mark(ticketId: string, data: MarkTicketDto): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${ticketId}/mark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to mark ticket");
    }
  }

  async validate(ticketId: string, data: ValidateTicketDto): Promise<any> {
    const res = await fetch(`${this.baseUrl}/${ticketId}/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // validate endpoint returns JSON like { valid: true/false, ... }
    return res.json();
  }
}

export const ticketService = new TicketService();
