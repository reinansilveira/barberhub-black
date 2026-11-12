import type { PainelData } from "./painel.types";

const at = (dayOffset: number, hour: number, minute = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

const CLIENTS = [
  "Carlos Mendes",
  "João Pedro",
  "Marcos Vieira",
  "Felipe Duarte",
  "André Lima",
  "Bruno Costa",
  "Rodrigo Alves",
  "Gustavo Reis",
];
const PROS = ["Rafael Moura", "Diego Alves", "Thiago Reis", "Lucas Prado"];
const SERVICES = [
  { name: "Corte Signature", price: 75, duration: 45 },
  { name: "Barba Ritual", price: 55, duration: 35 },
  { name: "Combo Corte + Barba", price: 120, duration: 80 },
  { name: "Pigmentação", price: 90, duration: 50 },
  { name: "Day Spa Masculino", price: 160, duration: 90 },
];

const todaySlots = [9, 10, 11, 13, 14, 15, 16, 17];

export const DEMO_DATA: PainelData = {
  userName: "Rafael Moura",
  demo: true,
  services: SERVICES.map((service, index) => ({
    id: String(index),
    active: true,
    ...service,
  })),
  appointments: [
    ...todaySlots.map((hour, index) => {
      const service = SERVICES[index % SERVICES.length];
      return {
        id: `t${index}`,
        scheduledAt: at(0, hour, index % 2 ? 30 : 0),
        status:
          hour < new Date().getHours()
            ? "COMPLETED"
            : index % 3
              ? "CONFIRMED"
              : "SCHEDULED",
        clientName: CLIENTS[index % CLIENTS.length],
        professionalName: PROS[index % PROS.length],
        serviceName: service.name,
        price: service.price,
        duration: service.duration,
      };
    }),
    ...Array.from({ length: 16 }, (_, index) => {
      const service = SERVICES[(index * 2) % SERVICES.length];
      return {
        id: `h${index}`,
        scheduledAt: at(index % 2 ? index - 14 : -index, 10 + (index % 7)),
        status: index > 12 ? "SCHEDULED" : "COMPLETED",
        clientName: CLIENTS[(index * 3) % CLIENTS.length],
        professionalName: PROS[index % PROS.length],
        serviceName: service.name,
        price: service.price,
        duration: service.duration,
      };
    }),
  ],
  payments: Array.from({ length: 14 }, (_, index) => ({
    paidAt: at(-index, 18),
    amount: 280 + ((index * 137) % 520),
  })),
};
