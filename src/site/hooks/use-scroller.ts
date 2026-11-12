"use client";

import { useRef } from "react";

export function useScroller() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const node = ref.current;
    if (!node) return;
    node.scrollBy({
      left: direction * node.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return { ref, prev: () => scroll(-1), next: () => scroll(1) };
}
