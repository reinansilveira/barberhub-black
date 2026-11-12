const unsplash = (id: string, width = 1000) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${width}&auto=format&fit=crop`;

const pexels = (id: string, width = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/4177952/4177952-hd_1920_1080_30fps.mp4";

export const IMAGES = {
  hero: unsplash("1585747860715-2ba37e788b70", 1800),
  chair: unsplash("1512690459411-b9245aed614b", 1800),
  finale: pexels("3993296", 2000),
};

export const NAV = [
  { label: "Serviços", href: "#servicos" },
  { label: "A casa", href: "#casa" },
  { label: "Time", href: "#time" },
  { label: "Clube", href: "#clube" },
] as const;

export const SERVICES = [
  {
    name: "Corte Signature",
    price: "R$ 75",
    time: "45 min",
    image: pexels("7781848", 900),
    text: "Visagismo, tesoura e acabamento na navalha.",
  },
  {
    name: "Barba Ritual",
    price: "R$ 55",
    time: "35 min",
    image: pexels("9387375", 900),
    text: "Toalha quente, navalha e hidratação.",
  },
  {
    name: "Corte + Barba",
    price: "R$ 120",
    time: "1h20",
    image: pexels("3998402", 900),
    text: "A experiência completa, com bebida da casa.",
  },
  {
    name: "Pigmentação",
    price: "R$ 90",
    time: "50 min",
    image: unsplash("1599351431202-1e0f0137899a", 900),
    text: "Contorno definido e falhas cobertas.",
  },
  {
    name: "Day Spa",
    price: "R$ 160",
    time: "1h30",
    image: unsplash("1596728325488-58c87691e9af", 900),
    text: "Limpeza de pele, massagem e hidratação.",
  },
] as const;

export const GALLERY = [
  { image: pexels("20785318", 1400), label: "Salão" },
  { image: pexels("7518717", 1200), label: "Ferramentas" },
  { image: pexels("1895701", 1200), label: "Espera" },
  { image: pexels("11213193", 1200), label: "Navalhas" },
  { image: pexels("7518689", 1400), label: "Cadeiras" },
  { image: pexels("3992850", 1200), label: "Espelhos" },
] as const;

export const STATS = [
  { value: 28000, suffix: "+", label: "cortes" },
  { value: 4.9, suffix: "", label: "nota média", decimals: 1 },
  { value: 98, suffix: "%", label: "voltam" },
] as const;

export const PLANS = [
  {
    name: "Essencial",
    price: "89",
    perks: ["2 cortes por mês", "10% em produtos"],
  },
  {
    name: "Black",
    price: "159",
    featured: true,
    perks: [
      "Corte e barba ilimitados",
      "Encaixe no mesmo dia",
      "Bebida da casa",
    ],
  },
  { name: "Day Spa", price: "249", perks: ["Tudo do Black", "1 spa por mês"] },
] as const;

export const UNITS = [
  { name: "Centro", street: "Av. Paulista, 1000", phone: "(11) 3000-1000" },
  { name: "Jardins", street: "Alameda Santos, 240", phone: "(11) 3000-2000" },
  {
    name: "Pinheiros",
    street: "Rua dos Pinheiros, 880",
    phone: "(11) 3000-3000",
  },
] as const;
