"use client";

import { useDateStrip } from "../hooks/use-date-strip";
import { cn } from "@/lib/class-names";

export function DateStrip({ professional }: { professional?: string }) {
  const strip = useDateStrip(10, professional);

  return (
    <div className="strip">
      <p className="strip__label">Quando você quer vir?</p>
      <div className="strip__days" role="group" aria-label="Escolha o dia">
        {strip.options.map((option) => (
          <button
            key={option.key}
            type="button"
            disabled={option.closed}
            aria-pressed={strip.selected === option.key}
            className={cn(
              "strip__day",
              strip.selected === option.key && "strip__day--active",
            )}
            onClick={() => strip.setSelected(option.key)}
          >
            <small>{option.closed ? "Fechado" : option.label}</small>
            <strong>{option.day}</strong>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn--gold strip__cta"
        onClick={strip.go}
        data-magnetic
      >
        Ver horários
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
