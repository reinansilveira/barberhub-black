"use client";

import { useEffect, type RefObject } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

const formatCount = (value: number, decimals: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export function useBlackEffects(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cleanups: Array<() => void> = [];

    if (reduced.matches) {
      el.querySelectorAll("video").forEach((video) => video.pause());
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "in";
          reveal.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    el.querySelectorAll("[data-reveal]").forEach((node) =>
      reveal.observe(node),
    );
    cleanups.push(() => reveal.disconnect());

    const counters = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          counters.unobserve(entry.target);
          const node = entry.target as HTMLElement;
          const target = Number(node.dataset.count ?? 0);
          const decimals = Number(node.dataset.decimals ?? 0);
          const suffix = node.dataset.suffix ?? "";
          if (reduced.matches) {
            node.textContent = `${formatCount(target, decimals)}${suffix}`;
            continue;
          }
          const start = performance.now();
          const tick = (now: number) => {
            const progress = clamp((now - start) / 1600, 0, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            node.textContent = `${formatCount(target * eased, decimals)}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 },
    );
    el.querySelectorAll("[data-count]").forEach((node) =>
      counters.observe(node),
    );
    cleanups.push(() => counters.disconnect());

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.setProperty(
          "--scroll",
          String(max > 0 ? window.scrollY / max : 0),
        );
        if (reduced.matches) return;

        const viewport = window.innerHeight;
        for (const node of el.querySelectorAll<HTMLElement>(
          "[data-parallax]",
        )) {
          const speed = Number(node.dataset.parallax ?? 0.1);
          const rect = node.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > viewport + 200) continue;
          const offset = (rect.top + rect.height / 2 - viewport / 2) * speed;
          node.style.transform = `translate3d(0, ${offset}px, 0) scale(1.15)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });

    if (fine.matches && !reduced.matches) {
      const dot = el.querySelector<HTMLElement>("[data-cursor]");
      let tx = -100;
      let ty = -100;
      let cx = tx;
      let cy = ty;
      let frame = 0;

      const loop = () => {
        cx = lerp(cx, tx, 0.2);
        cy = lerp(cy, ty, 0.2);
        if (dot) dot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);

      const onMove = (event: PointerEvent) => {
        tx = event.clientX;
        ty = event.clientY;
        el.classList.add("black--pointer");
        const target = (
          event.target as HTMLElement | null
        )?.closest<HTMLElement>(
          "[data-cursor-label], a, button, summary, input",
        );
        const label = target?.dataset.cursorLabel ?? "";
        el.classList.toggle("black--hovering", Boolean(target) && !label);
        el.classList.toggle("black--labeled", Boolean(label));
        if (dot) dot.dataset.label = label;
      };
      const onLeave = () => el.classList.remove("black--pointer");
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);

      for (const node of el.querySelectorAll<HTMLElement>("[data-magnetic]")) {
        const move = (event: PointerEvent) => {
          const rect = node.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          node.style.transform = `translate3d(${dx * 0.25}px, ${dy * 0.35}px, 0)`;
        };
        const leave = () => {
          node.style.transform = "";
        };
        node.addEventListener("pointermove", move);
        node.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          node.removeEventListener("pointermove", move);
          node.removeEventListener("pointerleave", leave);
        });
      }

      cleanups.push(() => {
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      });
    }

    requestAnimationFrame(() => el.classList.add("black--ready"));

    return () => cleanups.forEach((fn) => fn());
  }, [root]);
}
