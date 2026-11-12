const env = (value: string | undefined, fallback: string) => value?.trim() || fallback;

export const BUSINESS = {
  name: "BarberHub",
  instagram: env(process.env.NEXT_PUBLIC_BUSINESS_INSTAGRAM, "barberhub"),
  whatsappDigits: env(process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP, "5511999999999").replace(/\D/g, ""),
};

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${BUSINESS.whatsappDigits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
