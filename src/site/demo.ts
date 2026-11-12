import type { Member, ServiceOption } from "./site.utils";

export type Slot = { id: string; startsAt: string };

export type DemoReview = {
  id: string;
  professionalId: string;
  client?: string;
  service?: string;
  rating: number;
  comment: string | null;
  active: boolean;
  createdAt: string;
};

const pexels = (id: string, width = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
const unsplash = (id: string, width = 600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${width}&auto=format&fit=crop`;

const CATALOG: Record<string, Omit<ServiceOption, "id">> = {
  corte: { name: "Corte Signature", price: 75, duration: 45, image: pexels("7781848", 300) },
  barba: { name: "Barba Ritual", price: 55, duration: 35, image: pexels("9387375", 300) },
  combo: { name: "Corte + Barba", price: 120, duration: 80, image: pexels("3998402", 300) },
  pigmentacao: {
    name: "Pigmentação",
    price: 90,
    duration: 50,
    image: unsplash("1599351431202-1e0f0137899a", 300),
  },
  spa: {
    name: "Day Spa",
    price: 160,
    duration: 90,
    image: unsplash("1596728325488-58c87691e9af", 300),
  },
  infantil: { name: "Corte Infantil", price: 50, duration: 30, image: pexels("7697386", 300) },
};

type DemoPro = Member & { services: (keyof typeof CATALOG)[] };

const PROS: DemoPro[] = [
  {
    id: "rafael-moura",
    name: "Rafael Moura",
    role: "Corte clássico",
    bio: "Fundador da casa. Visagismo, tesoura e acabamento na navalha em cada detalhe.",
    image: pexels("8552627"),
    rating: null,
    reviews: 0,
    years: 12,
    services: ["corte", "combo", "barba"],
  },
  {
    id: "diego-alves",
    name: "Diego Alves",
    role: "Degradê e moderno",
    bio: "Precisão milimétrica nas laterais. Quem gosta de degradê limpo agenda com ele.",
    image: pexels("5188606"),
    rating: null,
    reviews: 0,
    years: 9,
    services: ["corte", "pigmentacao", "combo"],
  },
  {
    id: "thiago-reis",
    name: "Thiago Reis",
    role: "Especialista em noivos",
    bio: "Prepara noivos e padrinhos para o grande dia, do corte aos cuidados com a pele.",
    image: pexels("39218966"),
    rating: null,
    reviews: 0,
    years: 8,
    services: ["combo", "spa", "barba"],
  },
  {
    id: "lucas-prado",
    name: "Lucas Prado",
    role: "Barboterapia",
    bio: "O ritual da toalha quente no seu melhor: barba desenhada, hidratada e alinhada.",
    image: pexels("12946033"),
    rating: null,
    reviews: 0,
    years: 6,
    services: ["barba", "spa", "corte"],
  },
  {
    id: "bruno-costa",
    name: "Bruno Costa",
    role: "Freestyle e desenhos",
    bio: "Riscos, desenhos e cortes criativos para quem quer sair do comum.",
    image: pexels("20302333"),
    rating: null,
    reviews: 0,
    years: 5,
    services: ["corte", "pigmentacao"],
  },
  {
    id: "vinicius-prado",
    name: "Vinícius Prado",
    role: "Corte infantil",
    bio: "Paciência e capricho com a criançada, num ambiente tranquilo para os pequenos.",
    image: pexels("18483778"),
    rating: null,
    reviews: 0,
    years: 4,
    services: ["infantil", "corte"],
  },
];

const COMMENTS: [string, number, string, string, string][] = [
  ["rafael-moura", 5, "Melhor corte que já fiz. Ele entende exatamente o que você quer.", "Hudson G.", "Corte Signature"],
  ["diego-alves", 5, "Degradê perfeito, idêntico à referência que mostrei.", "Matheus R.", "Corte Signature"],
  ["thiago-reis", 5, "Fui de noivo e saí perfeito. Recomendo de olhos fechados.", "André L.", "Corte + Barba"],
  ["lucas-prado", 5, "A toalha quente é outro nível. Melhor barba da cidade.", "Felipe D.", "Barba Ritual"],
  ["rafael-moura", 5, "Pontual, ambiente impecável e aquele acabamento na navalha que faz diferença.", "Bruno C.", "Corte + Barba"],
  ["vinicius-prado", 5, "Meu filho ama cortar com ele. Paciência total.", "Carla M.", "Corte Infantil"],
  ["diego-alves", 5, "Detalhista demais. Já virei cliente fixo.", "Rodrigo A.", "Pigmentação"],
  ["thiago-reis", 5, "O day spa vale cada centavo, saí renovado.", "Gustavo P.", "Day Spa"],
  ["bruno-costa", 5, "Pedi um desenho na lateral e ficou absurdo.", "Kauã S.", "Corte Signature"],
  ["lucas-prado", 4, "Barba desenhada certinho, durou a semana inteira.", "Marcos V.", "Barba Ritual"],
  ["rafael-moura", 4, "Muito bom, só esperei uns minutinhos a mais.", "Leandro T.", "Corte Signature"],
  ["vinicius-prado", 5, "Primeiro corte do meu filho e foi super tranquilo.", "Juliana F.", "Corte Infantil"],
  ["bruno-costa", 4, "Criativo e rápido. Voltarei.", "Igor N.", "Corte Signature"],
  ["diego-alves", 5, "A pigmentação ficou natural, ninguém percebeu.", "Paulo H.", "Pigmentação"],
];

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString();

const REVIEWS: DemoReview[] = [
  ...COMMENTS.map(([professionalId, rating, comment, client, service], index) => ({
    id: `r${index}`,
    professionalId,
    rating,
    comment,
    client,
    service,
    active: true,
    createdAt: daysAgo(2 + index * 3),
  })),
  ...PROS.flatMap((pro, proIndex) =>
    Array.from({ length: 6 + proIndex }, (_, index) => ({
      id: `n${proIndex}-${index}`,
      professionalId: pro.id,
      rating: index % 7 === 6 ? 4 : 5,
      comment: null,
      active: true,
      createdAt: daysAgo(10 + index * 5),
    })),
  ),
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const hash = (text: string) =>
  [...text].reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 7);

function withRating(pro: DemoPro): Member {
  const own = REVIEWS.filter((review) => review.professionalId === pro.id);
  const average = own.reduce((total, review) => total + review.rating, 0) / own.length;
  const { services: _services, ...member } = pro;
  void _services;
  return { ...member, rating: Math.round(average * 10) / 10, reviews: own.length };
}

export function listTeam(): Member[] {
  return PROS.map(withRating);
}

export function findMember(id: string): Member | null {
  const pro = PROS.find((item) => item.id === id);
  return pro ? withRating(pro) : null;
}

export function listReviews(): DemoReview[] {
  return REVIEWS;
}

export function servicesOf(professionalId: string): ServiceOption[] {
  const pro = PROS.find((item) => item.id === professionalId);
  return (pro?.services ?? []).map((key) => ({ id: key, ...CATALOG[key] }));
}

export async function fetchServices(professionalId: string) {
  await wait(350);
  return servicesOf(professionalId);
}

export function slotsFor(professionalId: string, date: string, now = new Date()): Slot[] {
  const day = new Date(`${date}T12:00:00Z`);
  if (day.getUTCDay() === 0) return [];

  const slots: Slot[] = [];
  for (let minutes = 9 * 60; minutes <= 19 * 60 + 30; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const startsAt = new Date(
      `${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00-03:00`,
    );
    if (startsAt <= now) continue;
    if (hash(`${professionalId}${date}${minutes}`) % 100 < 35) continue;
    slots.push({ id: `${professionalId}|${startsAt.toISOString()}`, startsAt: startsAt.toISOString() });
  }
  return slots;
}

export async function fetchSlots(professionalId: string, date: string) {
  await wait(400);
  return slotsFor(professionalId, date);
}

export async function fetchAvailableDates(professionalId: string, dates: string[]) {
  await wait(200);
  return dates.filter((date) => slotsFor(professionalId, date).length > 0);
}

export async function bookDemo() {
  await wait(900);
  return { ok: true };
}
