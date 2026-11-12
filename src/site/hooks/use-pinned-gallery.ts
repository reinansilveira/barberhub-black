"use client";

import { useEffect, useRef } from "react";

export function usePinnedGallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = section.current;
    const row = track.current;
    if (!wrap || !row) return;

    const desktop = window.matchMedia("(min-width: 901px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let distance = 0;

    const measure = () => {
      if (!desktop.matches || reduced.matches) {
        wrap.style.height = "";
        row.style.transform = "";
        distance = 0;
        return;
      }
      distance = Math.max(0, row.scrollWidth - window.innerWidth);
      wrap.style.height = `${distance + window.innerHeight}px`;
      update();
    };

    const update = () => {
      if (!distance) return;
      const rect = wrap.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      row.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      wrap.style.setProperty("--progress", String(progress));
    };

    const onScroll = () => requestAnimationFrame(update);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    desktop.addEventListener("change", measure);
    const images = Array.from(row.querySelectorAll("img"));
    images.forEach((image) => image.addEventListener("load", measure));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", measure);
      images.forEach((image) => image.removeEventListener("load", measure));
    };
  }, []);

  return { section, track };
}
