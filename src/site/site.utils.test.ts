import { describe, expect, it } from "vitest";
import {
  buildDays,
  formatDuration,
  groupSlots,
  maskPhone,
  pickReviews,
  relativeDate,
  validateBooking,
} from "./site.utils";

describe("black.utils", () => {
  it("formata telefone enquanto digita", () => {
    expect(maskPhone("1")).toBe("(1");
    expect(maskPhone("11987")).toBe("(11) 987");
    expect(maskPhone("1132221111")).toBe("(11) 3222-1111");
    expect(maskPhone("11987654321999")).toBe("(11) 98765-4321");
  });

  it("formata duração", () => {
    expect(formatDuration(30)).toBe("30 min");
    expect(formatDuration(60)).toBe("1h");
    expect(formatDuration(80)).toBe("1h20");
    expect(formatDuration(null)).toBe("");
  });

  it("monta os próximos dias a partir de hoje", () => {
    const days = buildDays("2026-11-12", 3);
    expect(days.map((day) => day.key)).toEqual([
      "2026-11-12",
      "2026-11-13",
      "2026-11-14",
    ]);
    expect(days[0].label).toBe("Hoje");
    expect(days[1].label).toBe("Amanhã");
  });

  it("agrupa horários por período no fuso de São Paulo", () => {
    const groups = groupSlots([
      { id: "a", startsAt: "2026-11-12T12:00:00.000Z" },
      { id: "b", startsAt: "2026-11-12T17:00:00.000Z" },
      { id: "c", startsAt: "2026-11-12T22:00:00.000Z" },
    ]);
    expect(groups.map((group) => [group.label, group.slots.length])).toEqual([
      ["Manhã", 1],
      ["Tarde", 1],
      ["Noite", 1],
    ]);
  });

  it("descreve datas relativas", () => {
    const now = new Date("2026-11-12T12:00:00Z");
    expect(relativeDate("2026-11-12T08:00:00Z", now)).toBe("hoje");
    expect(relativeDate("2026-11-11T08:00:00Z", now)).toBe("ontem");
    expect(relativeDate("2026-11-02T12:00:00Z", now)).toBe("há 10 dias");
    expect(relativeDate("2026-09-01T12:00:00Z", now)).toBe("há 2 meses");
  });

  it("valida os dados do agendamento", () => {
    expect(validateBooking({ name: "A", phone: "11987654321", email: "a@b.co" })).toBe("Informe seu nome.");
    expect(validateBooking({ name: "Ana", phone: "1198", email: "a@b.co" })).toBe("Use 10 ou 11 dígitos no telefone.");
    expect(validateBooking({ name: "Ana", phone: "(11) 98765-4321", email: "x" })).toBe("Informe um e-mail válido.");
    expect(validateBooking({ name: "Ana", phone: "(11) 98765-4321", email: "a@b.co" })).toBeNull();
  });

  it("seleciona avaliações sem repetir comentário e com nome do profissional", () => {
    const base = {
      professionalId: "p1",
      active: true,
      createdAt: "2026-11-01T00:00:00Z",
    };
    const cards = pickReviews(
      [
        { ...base, id: "1", rating: 4, comment: "Bom" },
        { ...base, id: "2", rating: 5, comment: "Ótimo" },
        { ...base, id: "3", rating: 5, comment: "ótimo " },
        { ...base, id: "4", rating: 5, comment: "" },
        { ...base, id: "5", rating: 5, comment: "Inativo", active: false },
      ],
      new Map([["p1", "Lucas"]]),
    );
    expect(cards.map((card) => [card.id, card.professional])).toEqual([
      ["2", "Lucas"],
      ["1", "Lucas"],
    ]);
  });
});
