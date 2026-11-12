export type PainelAppointment = {
  id: string;
  scheduledAt: string;
  status: string;
  clientName: string;
  professionalName: string;
  serviceName: string;
  price: number;
  duration: number;
};

export type PainelService = {
  id: string;
  name: string;
  price: number;
  duration: number | null;
  active: boolean;
};

export type PainelData = {
  userName: string;
  demo: boolean;
  appointments: PainelAppointment[];
  services: PainelService[];
  payments: { paidAt: string | null; amount: number }[];
};

export type PainelView = "visao-geral" | "agenda" | "servicos" | "clientes";
