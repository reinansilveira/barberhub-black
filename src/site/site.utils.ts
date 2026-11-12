import type { DemoReview as PublicReview, Slot } from "./demo";

export type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string | null;
  rating: number | null;
  reviews: number;
  years: number | null;
};

export type ServiceOption = {
  id: string;
  name: string;
  price: number;
  duration: number | null;
  image: string | null;
};

export const formatRating = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

export function formatDuration(minutes: number | null) {
  if (!minutes) return "";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h${String(rest).padStart(2, "0")}` : `${hours}h`;
}

export function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const weekday = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short",
  timeZone: "UTC",
});

export function buildDays(start: string, count: number) {
  const base = new Date(`${start}T12:00:00Z`);
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(base);
    date.setUTCDate(base.getUTCDate() + index);
    const raw =
      index === 0
        ? "Hoje"
        : index === 1
          ? "Amanhã"
          : weekday.format(date).replace(".", "");
    return {
      key: date.toISOString().slice(0, 10),
      day: date.getUTCDate(),
      label: raw.charAt(0).toUpperCase() + raw.slice(1),
    };
  });
}

const hourIn = (startsAt: string) =>
  Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      hour12: false,
    }).format(new Date(startsAt)),
  );

export function groupSlots(slots: Slot[]) {
  const groups = [
    { label: "Manhã", slots: [] as Slot[] },
    { label: "Tarde", slots: [] as Slot[] },
    { label: "Noite", slots: [] as Slot[] },
  ];
  for (const slot of slots) {
    const hour = hourIn(slot.startsAt);
    groups[hour < 12 ? 0 : hour < 18 ? 1 : 2].slots.push(slot);
  }
  return groups.filter((group) => group.slots.length);
}

export function relativeDate(value: string, now = new Date()) {
  const days = Math.floor((+now - +new Date(value)) / 86_400_000);
  if (days <= 0) return "hoje";
  if (days === 1) return "ontem";
  if (days < 30) return `há ${days} dias`;
  const months = Math.floor(days / 30);
  return months === 1 ? "há 1 mês" : `há ${months} meses`;
}

export const longDate = (key: string) => {
  const text = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${key}T12:00:00Z`));
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export type ReviewCard = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  professional: string | null;
};

export function pickReviews(
  reviews: PublicReview[],
  names: Map<string, string> = new Map(),
  limit = 6,
): ReviewCard[] {
  const seen = new Set<string>();
  return [...reviews]
    .filter((review) => review.active && review.comment?.trim())
    .sort(
      (a, b) =>
        b.rating - a.rating || +new Date(b.createdAt) - +new Date(a.createdAt),
    )
    .filter((review) => {
      const key = review.comment!.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit)
    .map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment!.trim(),
      createdAt: review.createdAt,
      professional: names.get(review.professionalId) ?? null,
    }));
}

export function buildReviewSummary(reviews: PublicReview[]) {
  const active = reviews.filter((review) => review.active);
  const count = active.length;
  const average = count
    ? active.reduce((total, review) => total + review.rating, 0) / count
    : 0;

  return {
    average,
    count,
    breakdown: [5, 4, 3, 2, 1].map((stars) => {
      const total = active.filter((review) => review.rating === stars).length;
      return {
        stars,
        count: total,
        percentage: count ? Math.round((total / count) * 100) : 0,
      };
    }),
  };
}

export type BookingInput = { name: string; phone: string; email: string };

export function validateBooking(input: BookingInput): string | null {
  if (input.name.trim().length < 2) return "Informe seu nome.";
  if (!/^\d{10,11}$/.test(input.phone.replace(/\D/g, ""))) return "Use 10 ou 11 dígitos no telefone.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) return "Informe um e-mail válido.";
  return null;
}
