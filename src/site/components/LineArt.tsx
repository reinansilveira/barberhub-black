import type { ReactNode } from "react";

// Cada traço usa pathLength=1 para que o CSS desenhe a linha conforme a
// variável --draw (0 a 1) que o scroll atualiza.
function Art({
  viewBox,
  className,
  children,
}: {
  viewBox: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      className={`art ${className ?? ""}`}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-draw
    >
      {children}
    </svg>
  );
}

const P = (d: string) => <path d={d} pathLength={1} />;
const C = (cx: number, cy: number, r: number) => (
  <circle cx={cx} cy={cy} r={r} pathLength={1} />
);

export function ChairArt({ className }: { className?: string }) {
  return (
    <Art viewBox="0 0 400 400" className={className}>
      {P("M168 18 H232 Q252 18 252 38 V46 Q252 66 232 66 H168 Q148 66 148 46 V38 Q148 18 168 18 Z")}
      {P("M200 66 V84")}
      {P("M134 84 H266 Q284 84 284 102 V206 H116 V102 Q116 84 134 84 Z")}
      {P("M140 106 V184 M200 106 V184 M260 106 V184")}
      {P("M98 206 H302 Q320 206 320 224 V246 Q320 260 306 260 H94 Q80 260 80 246 V224 Q80 206 98 206 Z")}
      {P("M80 186 H124 M276 186 H320")}
      {P("M84 186 Q66 186 66 204 V232 M316 186 Q334 186 334 204 V232")}
      {P("M186 260 V328 H214 V260")}
      {P("M214 296 H252 Q266 296 266 310 V318")}
      {P("M156 260 L134 300 H266 L244 260")}
      {P("M112 352 Q200 326 288 352 Q200 378 112 352 Z")}
    </Art>
  );
}

export function ScissorsArt({ className }: { className?: string }) {
  return (
    <Art viewBox="0 0 400 400" className={className}>
      {P("M150 300 L330 64 Q340 54 334 72 L176 312")}
      {P("M250 300 L70 64 Q60 54 66 72 L224 312")}
      {C(126, 330, 42)}
      {C(126, 330, 26)}
      {C(274, 330, 42)}
      {C(274, 330, 26)}
      {C(200, 214, 7)}
    </Art>
  );
}

export function RazorArt({ className }: { className?: string }) {
  return (
    <Art viewBox="0 0 400 300" className={className}>
      {P("M30 230 Q30 196 78 190 L300 170 Q334 168 344 190 Q350 214 322 222 L80 246 Q38 252 30 230 Z")}
      {P("M140 184 L162 96 Q170 70 198 70 L346 64 Q362 64 358 80 L326 172")}
      {P("M176 104 L344 92")}
      {C(318, 198, 8)}
      {P("M70 218 L130 212 M70 228 L118 224")}
    </Art>
  );
}

export function PoleArt({ className }: { className?: string }) {
  return (
    <Art viewBox="0 0 200 420" className={className}>
      {C(100, 22, 14)}
      {P("M58 36 H142 Q152 36 152 46 V60 H48 V46 Q48 36 58 36 Z")}
      {P("M100 60 H138 V354 H62 V60 Z")}
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <path key={index} d={`M62 ${104 + index * 50} L138 ${64 + index * 50}`} pathLength={1} />
      ))}
      {P("M48 354 H152 V368 Q152 380 140 380 H60 Q48 380 48 368 Z")}
      {C(100, 396, 10)}
    </Art>
  );
}

export function QuoteArt({ className }: { className?: string }) {
  return (
    <Art viewBox="0 0 200 140" className={className}>
      {P("M80 20 Q30 34 24 96 Q24 124 52 124 Q78 124 78 98 Q78 72 52 72 Q44 72 38 76 Q46 44 84 32 Z")}
      {P("M176 20 Q126 34 120 96 Q120 124 148 124 Q174 124 174 98 Q174 72 148 72 Q140 72 134 76 Q142 44 180 32 Z")}
    </Art>
  );
}
