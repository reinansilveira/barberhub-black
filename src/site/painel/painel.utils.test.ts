import { describe, expect, it } from "vitest";
import { groupClients, revenueByDay, statusLabel } from "./painel.utils";

describe("painel.utils", () => {
  it("rotula status", () => {
    expect(statusLabel("CANCELLED")).toBe("Cancelado");
    expect(statusLabel("COMPLETED")).toBe("Concluído");
    expect(statusLabel("SCHEDULED")).toBe("Agendado");
  });

  it("gera uma barra por dia", () => {
    const days = revenueByDay(
      [{ paidAt: new Date().toISOString(), amount: 50 }],
      7,
    );
    expect(days).toHaveLength(7);
    expect(days.at(-1)?.total).toBe(50);
  });

  it("agrupa clientes ignorando cancelados", () => {
    const base = {
      scheduledAt: "2026-01-01T10:00:00Z",
      professionalName: "",
      serviceName: "",
      duration: 30,
    };
    const clients = groupClients([
      { ...base, id: "1", status: "COMPLETED", clientName: "Ana", price: 70 },
      { ...base, id: "2", status: "COMPLETED", clientName: "Ana", price: 30 },
      { ...base, id: "3", status: "CANCELLED", clientName: "Bia", price: 99 },
    ]);
    expect(clients).toEqual([
      { name: "Ana", visits: 2, spent: 100, last: "2026-01-01T10:00:00Z" },
    ]);
  });
});
