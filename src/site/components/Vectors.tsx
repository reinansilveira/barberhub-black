import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ScissorsIcon = (props: Props) => (
  <svg viewBox="0 0 120 120" {...base} {...props}>
    <circle cx="30" cy="92" r="16" />
    <circle cx="90" cy="92" r="16" />
    <path d="M40 80 L92 12 M80 80 L28 12" />
    <circle cx="60" cy="52" r="3" fill="currentColor" />
  </svg>
);

export const RazorIcon = (props: Props) => (
  <svg viewBox="0 0 120 120" {...base} {...props}>
    <path d="M14 70 Q14 42 46 38 L92 34 Q104 34 104 46 L104 58 Q104 70 92 70 Z" />
    <path d="M22 70 L40 96 Q46 104 54 98 L74 70" />
    <path d="M30 52 L90 46" />
    <circle cx="96" cy="52" r="3" fill="currentColor" />
  </svg>
);

export const CombIcon = (props: Props) => (
  <svg viewBox="0 0 120 120" {...base} {...props}>
    <rect x="12" y="28" width="96" height="22" rx="8" />
    {Array.from({ length: 11 }, (_, index) => (
      <path key={index} d={`M${18 + index * 8.4} 50 V${index % 2 ? 84 : 92}`} />
    ))}
  </svg>
);

export const MustacheIcon = (props: Props) => (
  <svg viewBox="0 0 140 80" {...base} {...props}>
    <path d="M70 32 C56 18 32 14 14 26 C28 28 34 40 46 50 C58 60 66 52 70 44 C74 52 82 60 94 50 C106 40 112 28 126 26 C108 14 84 18 70 32 Z" />
  </svg>
);

export const BrushIcon = (props: Props) => (
  <svg viewBox="0 0 120 120" {...base} {...props}>
    <path d="M36 54 C36 26 84 26 84 54 Z" />
    <path d="M30 54 H90 L82 70 H38 Z" />
    <path d="M44 70 L50 104 H70 L76 70" />
    <path d="M60 36 V50 M50 38 V50 M70 38 V50" />
  </svg>
);

export const ClipperIcon = (props: Props) => (
  <svg viewBox="0 0 120 120" {...base} {...props}>
    <path d="M44 16 H76 Q84 16 84 24 V86 Q84 104 60 104 Q36 104 36 86 V24 Q36 16 44 16 Z" />
    <path d="M44 30 H76 M44 44 H76" />
    <circle cx="60" cy="72" r="8" />
    <path d="M40 104 V112 H80 V104" />
  </svg>
);

export const SpaIcon = (props: Props) => (
  <svg viewBox="0 0 120 120" {...base} {...props}>
    <path d="M60 18 C40 40 40 70 60 92 C80 70 80 40 60 18 Z" />
    <path d="M28 46 C16 66 24 88 60 98 M92 46 C104 66 96 88 60 98" />
    <path d="M40 104 H80" />
  </svg>
);

export const ChairIcon = (props: Props) => (
  <svg viewBox="0 0 120 120" {...base} {...props}>
    <path d="M38 14 H82 Q90 14 90 22 V56 H30 V22 Q30 14 38 14 Z" />
    <path d="M24 56 H96 V72 H24 Z" />
    <path d="M60 72 V96 M40 104 H80 M46 96 H74" />
  </svg>
);

export const StarIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" {...props} aria-hidden>
    <path
      fill="currentColor"
      d="M12 2l2.6 6.9 7.4.5-5.7 4.7 1.9 7.2L12 17.4 5.8 21.3l1.9-7.2L2 9.4l7.4-.5z"
    />
  </svg>
);

export function BarberPole({ className }: { className?: string }) {
  return (
    <svg className={`pole ${className ?? ""}`} viewBox="0 0 60 220" aria-hidden>
      <defs>
        <clipPath id="pole-clip">
          <rect x="12" y="26" width="36" height="168" rx="18" />
        </clipPath>
        <pattern
          id="pole-stripes"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-30)"
        >
          <rect width="36" height="12" fill="#c8102e" />
          <rect y="12" width="36" height="12" fill="#f4f0e8" />
          <rect y="24" width="36" height="12" fill="#1c3f94" />
        </pattern>
      </defs>
      <rect x="8" y="4" width="44" height="22" rx="6" fill="#d4a72c" />
      <rect x="8" y="194" width="44" height="22" rx="6" fill="#d4a72c" />
      <g clipPath="url(#pole-clip)">
        <rect
          className="pole__stripes"
          x="0"
          y="-40"
          width="60"
          height="320"
          fill="url(#pole-stripes)"
        />
        <rect x="12" y="26" width="36" height="168" fill="url(#pole-shine)" />
      </g>
      <linearGradient id="pole-shine" x1="0" x2="1">
        <stop offset="0" stopColor="#fff" stopOpacity=".05" />
        <stop offset=".25" stopColor="#fff" stopOpacity=".5" />
        <stop offset=".6" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity=".45" />
      </linearGradient>
    </svg>
  );
}

export function Ornament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 24"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M2 12 H120" />
      <path d="M200 12 H318" />
      <path d="M130 12 Q145 0 160 12 Q175 24 190 12" />
      <circle cx="160" cy="12" r="3.5" fill="currentColor" />
      <path d="M124 6 L134 12 L124 18 M196 6 L186 12 L196 18" />
    </svg>
  );
}

export function SpinBadge({
  text = "AGENDE SEU HORÁRIO • ",
}: {
  text?: string;
}) {
  const label = text.repeat(2);
  return (
    <svg className="spin-badge" viewBox="0 0 200 200" aria-hidden>
      <defs>
        <path
          id="spin-circle"
          d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0"
        />
      </defs>
      <circle cx="100" cy="100" r="96" className="spin-badge__bg" />
      <text className="spin-badge__text">
        <textPath href="#spin-circle" startOffset="0" textLength="460">
          {label}
        </textPath>
      </text>
      <g className="spin-badge__core" transform="translate(70 70)">
        <ScissorsIcon width="60" height="60" x="0" y="0" />
      </g>
    </svg>
  );
}

export function Burst({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden>
      <path
        fill="currentColor"
        d="M100 4l16 28 30-12 4 32 32 4-12 30 28 16-28 16 12 30-32 4-4 32-30-12-16 28-16-28-30 12-4-32-32-4 12-30L4 100l28-16-12-30 32-4 4-32 30 12z"
      />
    </svg>
  );
}

export const SERVICE_ICONS = [
  ScissorsIcon,
  RazorIcon,
  ClipperIcon,
  BrushIcon,
  SpaIcon,
];
