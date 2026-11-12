"use client";

import { useMemo, useState } from "react";
import type { PainelData, PainelView } from "./painel.types";
import { buildPainelStats, groupClients, revenueByDay } from "./painel.utils";

export function usePainel(data: PainelData) {
  const [view, setView] = useState<PainelView>("visao-geral");
  const [query, setQuery] = useState("");

  const stats = useMemo(() => buildPainelStats(data), [data]);
  const revenue = useMemo(() => revenueByDay(data.payments), [data]);
  const clients = useMemo(() => groupClients(data.appointments), [data]);

  const upcoming = useMemo(() => {
    const term = query.trim().toLowerCase();
    return [...data.appointments]
      .sort((a, b) => +new Date(a.scheduledAt) - +new Date(b.scheduledAt))
      .filter(
        (item) =>
          !term ||
          `${item.clientName} ${item.serviceName} ${item.professionalName}`
            .toLowerCase()
            .includes(term),
      );
  }, [data, query]);

  return { view, setView, query, setQuery, stats, revenue, clients, upcoming };
}
