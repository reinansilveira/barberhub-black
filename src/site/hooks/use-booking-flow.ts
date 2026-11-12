"use client";

import { useEffect, useMemo, useState } from "react";
import { bookDemo, fetchAvailableDates, fetchServices, fetchSlots, type Slot } from "../demo";
import { todayInBrazil } from "@/lib/date";
import {
  buildDays,
  groupSlots,
  maskPhone,
  validateBooking,
  type Member,
  type ServiceOption,
} from "../site.utils";
import { DATE_EVENT } from "./use-date-strip";

const DAYS_AHEAD = 14;

export type BookingStep = 1 | 2 | 3 | 4;

type Loaded<T> = { key: string; items: T };

export function useBookingFlow(
  team: Member[],
  initial: { professionalId?: string; date?: string },
) {
  const today = todayInBrazil();
  const days = useMemo(() => buildDays(today, DAYS_AHEAD), [today]);
  const validInitialDate =
    initial.date && days.some((day) => day.key === initial.date)
      ? initial.date
      : today;
  const validInitialPro = team.some(
    (member) => member.id === initial.professionalId,
  )
    ? (initial.professionalId ?? "")
    : "";

  const [professionalId, setProfessionalId] = useState(validInitialPro);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState(validInitialDate);
  const [slotId, setSlotId] = useState("");
  const [step, setStep] = useState<BookingStep>(validInitialPro ? 2 : 1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [services, setServices] = useState<Loaded<ServiceOption[]>>({
    key: "",
    items: [],
  });
  const [available, setAvailable] = useState<Loaded<Set<string> | null>>({
    key: "",
    items: null,
  });
  const [slots, setSlots] = useState<Loaded<Slot[]>>({ key: "", items: [] });
  const slotsKey = professionalId ? `${professionalId}|${date}` : "";

  useEffect(() => {
    if (!professionalId) return;
    let active = true;
    fetchServices(professionalId).then((items) => {
      if (active) setServices({ key: professionalId, items });
    });

    fetchAvailableDates(
      professionalId,
      days.map((day) => day.key),
    ).then((dates) => {
      if (!active) return;
      setAvailable({ key: professionalId, items: new Set(dates) });
      setDate((current) => (dates.includes(current) ? current : (dates[0] ?? current)));
    });

    return () => {
      active = false;
    };
  }, [professionalId, days]);

  useEffect(() => {
    if (!slotsKey) return;
    let active = true;
    fetchSlots(professionalId, date).then((items) => {
      if (active) setSlots({ key: slotsKey, items });
    });
    return () => {
      active = false;
    };
  }, [professionalId, date, slotsKey]);

  useEffect(() => {
    const onPick = (event: Event) => {
      const key = (event as CustomEvent<string | null>).detail;
      if (!key || !days.some((day) => day.key === key)) return;
      setDate(key);
      setSlotId("");
      setStep((current) => (current === 4 ? 3 : current));
    };
    window.addEventListener(DATE_EVENT, onPick);
    return () => window.removeEventListener(DATE_EVENT, onPick);
  }, [days]);

  const professional = team.find((member) => member.id === professionalId);
  const serviceList = services.key === professionalId ? services.items : [];
  const service = serviceList.find((item) => item.id === serviceId);
  const slotList = slots.key === slotsKey ? slots.items : [];
  const slot = slotList.find((item) => item.id === slotId);
  const availableDays =
    available.key === professionalId ? available.items : null;

  const chooseProfessional = (id: string) => {
    setError("");
    if (id !== professionalId) {
      setProfessionalId(id);
      setServiceId("");
      setSlotId("");
    }
    setStep(2);
  };

  const chooseService = (id: string) => {
    setServiceId(id);
    setStep(3);
  };

  const chooseDate = (key: string) => {
    setDate(key);
    setSlotId("");
  };

  const chooseSlot = (id: string) => {
    setSlotId(id);
    setStep(4);
  };

  const goTo = (target: BookingStep) => {
    if (
      target === 1 ||
      (target === 2 && professionalId) ||
      (target === 3 && serviceId) ||
      (target === 4 && slotId)
    )
      setStep(target);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const invalid = validateBooking({ name, phone, email });
    if (invalid) {
      setError(invalid);
      return;
    }
    setSubmitting(true);
    await bookDemo();
    setSubmitting(false);
    setDone(true);
    document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    step,
    goTo,
    days,
    date,
    availableDays,
    professional,
    services: serviceList,
    loadingServices: Boolean(professionalId) && services.key !== professionalId,
    service,
    slotGroups: groupSlots(slotList),
    loadingSlots: Boolean(slotsKey) && slots.key !== slotsKey,
    slot,
    chooseProfessional,
    chooseService,
    chooseDate,
    chooseSlot,
    name,
    setName,
    phone,
    setPhone: (value: string) => setPhone(maskPhone(value)),
    email,
    setEmail,
    error,
    submitting,
    done,
    submit,
  };
}
