import type { PainelAppointment, PainelData } from "./painel.types";

export const dayKey = (value: string | Date) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));

export const isCancelled = (status: string) => /cancel/i.test(status);
export const isCompleted = (status: string) => /complete/i.test(status);

export const timeLabel = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export const dateLabel = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "short",
  }).format(new Date(value));

export const statusLabel = (status: string) => {
  if (isCancelled(status)) return "Cancelado";
  if (isCompleted(status)) return "Concluído";
  if (/confirm/i.test(status)) return "Confirmado";
  return "Agendado";
};

export function revenueByDay(payments: PainelData["payments"], days = 14) {
  const totals = new Map<string, number>();
  for (const payment of payments) {
    if (!payment.paidAt) continue;
    const key = dayKey(payment.paidAt);
    totals.set(key, (totals.get(key) ?? 0) + payment.amount);
  }

  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - index));
    const key = dayKey(date);
    return { key, label: key.slice(8), total: totals.get(key) ?? 0 };
  });
}

export function buildPainelStats(data: PainelData) {
  const today = dayKey(new Date());
  const active = data.appointments.filter((item) => !isCancelled(item.status));
  const todays = active
    .filter((item) => dayKey(item.scheduledAt) === today)
    .sort((a, b) => +new Date(a.scheduledAt) - +new Date(b.scheduledAt));

  return {
    todays,
    todayRevenue: data.payments
      .filter((payment) => payment.paidAt && dayKey(payment.paidAt) === today)
      .reduce((sum, payment) => sum + payment.amount, 0),
    monthRevenue: data.payments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    ),
    completedToday: todays.filter((item) => isCompleted(item.status)).length,
    uniqueClients: new Set(active.map((item) => item.clientName)).size,
  };
}

export function groupClients(appointments: PainelAppointment[]) {
  const map = new Map<
    string,
    { name: string; visits: number; spent: number; last: string }
  >();
  for (const item of appointments) {
    if (isCancelled(item.status)) continue;
    const entry = map.get(item.clientName) ?? {
      name: item.clientName,
      visits: 0,
      spent: 0,
      last: item.scheduledAt,
    };
    entry.visits += 1;
    entry.spent += item.price;
    if (+new Date(item.scheduledAt) > +new Date(entry.last))
      entry.last = item.scheduledAt;
    map.set(item.clientName, entry);
  }
  return Array.from(map.values()).sort((a, b) => b.spent - a.spent);
}
