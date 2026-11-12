"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { todayInBrazil } from "@/lib/date";
import { buildDays } from "../site.utils";

export const DATE_EVENT = "black:date";

export function useDateStrip(days = 10, professional?: string) {
  const router = useRouter();
  const today = todayInBrazil();
  const options = useMemo(
    () =>
      buildDays(today, days).map((option) => ({
        ...option,
        closed: new Date(`${option.key}T12:00:00Z`).getUTCDay() === 0,
      })),
    [today, days],
  );

  const [selected, setSelected] = useState(
    () => options.find((option) => !option.closed)?.key ?? null,
  );

  const go = () => {
    const section = document.getElementById("agendar");
    if (section) {
      window.dispatchEvent(new CustomEvent(DATE_EVENT, { detail: selected }));
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const params = new URLSearchParams();
    if (selected) params.set("date", selected);
    if (professional) params.set("profissional", professional);
    router.push(`/agendar?${params}`);
  };

  return { options, selected, setSelected, go };
}
