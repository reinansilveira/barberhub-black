"use client";

import { useRef, type ReactNode } from "react";
import { useBlackEffects } from "../hooks/use-black-effects";

export function BlackShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useBlackEffects(ref);

  return (
    <div className="black" ref={ref}>
      <div className="black__progress" aria-hidden="true" />
      <div className="black__cursor" data-cursor aria-hidden="true" />
      <div className="black__grain" aria-hidden="true" />
      {children}
    </div>
  );
}
