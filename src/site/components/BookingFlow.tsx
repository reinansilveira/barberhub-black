"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { currency, initials } from "@/lib/format";
import { formatSlot } from "@/lib/date";
import { cn } from "@/lib/class-names";
import { whatsappUrl } from "@/lib/business";
import { formatDuration, longDate, type Member } from "../site.utils";
import { useBookingFlow, type BookingStep } from "../hooks/use-booking-flow";
import { Rating } from "./Rating";

function Avatar({ member, size = 56 }: { member: Member; size?: number }) {
  return (
    <span className="avatar" style={{ width: size, height: size }}>
      {member.image ? (
        <Image src={member.image} alt="" fill sizes={`${size}px`} />
      ) : (
        initials(member.name)
      )}
    </span>
  );
}

function Step({
  number,
  title,
  current,
  summary,
  onEdit,
  children,
}: {
  number: BookingStep;
  title: string;
  current: BookingStep;
  summary?: ReactNode;
  onEdit: () => void;
  children: ReactNode;
}) {
  const open = current === number;
  const done = current > number && Boolean(summary);
  return (
    <section className={cn("step", open && "step--open", done && "step--done")}>
      <header className="step__head">
        <span className="step__num">{done ? "✓" : number}</span>
        <h2>{title}</h2>
        {!open && done && (
          <>
            <span className="step__summary">{summary}</span>
            <button type="button" className="step__edit" onClick={onEdit}>
              Alterar
            </button>
          </>
        )}
      </header>
      {open && <div className="step__body">{children}</div>}
    </section>
  );
}

export function BookingFlow({
  team,
  initial,
  variant = "page",
  title,
}: {
  team: Member[];
  initial: { professionalId?: string; date?: string };
  variant?: "page" | "section";
  title?: ReactNode;
}) {
  const flow = useBookingFlow(team, initial);
  const { professional, service, slot } = flow;

  if (flow.done && professional && service && slot) {
    return (
      <div className="done">
        <span className="done__check" aria-hidden="true">
          ✓
        </span>
        <p className="eyebrow">Agendamento confirmado</p>
        <h1 className="title">
          Até {longDate(flow.date).split(",")[0].toLowerCase()},{" "}
          <em>{flow.name.split(" ")[0]}.</em>
        </h1>
        <dl className="done__card">
          <div>
            <dt>Serviço</dt>
            <dd>{service.name}</dd>
          </div>
          <div>
            <dt>Com</dt>
            <dd>{professional.name}</dd>
          </div>
          <div>
            <dt>Quando</dt>
            <dd>
              {longDate(flow.date)} às {formatSlot(slot.startsAt)}
            </dd>
          </div>
          <div>
            <dt>Valor</dt>
            <dd>{currency.format(service.price)}</dd>
          </div>
        </dl>
        <p className="done__note">
          Enviamos a confirmação para {flow.email}. Pagamento na barbearia.
        </p>
        <div className="done__actions">
          <Link href="/" className="btn btn--gold">
            Voltar ao início
          </Link>
          <a
            className="btn btn--line"
            href={whatsappUrl("Olá! Acabei de agendar pelo site.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("booking", variant === "section" && "booking--section")}>
      <div className="booking__steps">
        <header className="booking__intro">
          <p className="eyebrow">Agendamento</p>
          {variant === "page" ? (
            <h1 className="title title--sm">
              Reserve em <em>1 minuto</em>
            </h1>
          ) : (
            <h2 className="title title--sm">
              {title ?? (
                <>
                  Reserve em <em>1 minuto</em>
                </>
              )}
            </h2>
          )}
        </header>

        <Step
          number={1}
          title="Profissional"
          current={flow.step}
          onEdit={() => flow.goTo(1)}
          summary={professional?.name}
        >
          {team.length === 0 ? (
            <p className="booking__empty">
              Não foi possível carregar os profissionais agora. Tente de novo em
              instantes.
            </p>
          ) : (
            <div className="pros">
              {team.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  className={cn(
                    "pro",
                    member.id === professional?.id && "pro--active",
                  )}
                  onClick={() => flow.chooseProfessional(member.id)}
                >
                  <Avatar member={member} size={64} />
                  <span className="pro__name">{member.name}</span>
                  <span className="pro__role">{member.role}</span>
                  {member.rating && (
                    <Rating value={member.rating} count={member.reviews} />
                  )}
                </button>
              ))}
            </div>
          )}
        </Step>

        <Step
          number={2}
          title="Serviço"
          current={flow.step}
          onEdit={() => flow.goTo(2)}
          summary={
            service && `${service.name} · ${currency.format(service.price)}`
          }
        >
          {flow.loadingServices ? (
            <div className="skeleton-list" aria-label="Carregando serviços">
              <i />
              <i />
              <i />
            </div>
          ) : (
            <ul className="options">
              {flow.services.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={cn(
                      "option",
                      item.id === service?.id && "option--active",
                    )}
                    onClick={() => flow.chooseService(item.id)}
                  >
                    {item.image && (
                      <span className="option__thumb">
                        <Image src={item.image} alt="" fill sizes="56px" />
                      </span>
                    )}
                    <span className="option__name">{item.name}</span>
                    <span className="option__meta">
                      {formatDuration(item.duration)}
                    </span>
                    <strong className="option__price">
                      {currency.format(item.price)}
                    </strong>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Step>

        <Step
          number={3}
          title="Dia e horário"
          current={flow.step}
          onEdit={() => flow.goTo(3)}
          summary={
            slot && `${longDate(flow.date)} · ${formatSlot(slot.startsAt)}`
          }
        >
          <div className="days" role="group" aria-label="Escolha o dia">
            {flow.days.map((day) => {
              const unavailable = flow.availableDays
                ? !flow.availableDays.has(day.key)
                : false;
              return (
                <button
                  key={day.key}
                  type="button"
                  disabled={unavailable}
                  aria-pressed={day.key === flow.date}
                  className={cn(
                    "days__day",
                    day.key === flow.date && "days__day--active",
                  )}
                  onClick={() => flow.chooseDate(day.key)}
                >
                  <small>{day.label}</small>
                  <strong>{day.day}</strong>
                  <i aria-hidden="true" />
                </button>
              );
            })}
          </div>

          {flow.loadingSlots ? (
            <div className="skeleton-chips" aria-label="Carregando horários">
              {Array.from({ length: 8 }, (_, index) => (
                <i key={index} />
              ))}
            </div>
          ) : flow.slotGroups.length === 0 ? (
            <p className="booking__empty">
              Sem horários livres neste dia. Escolha outra data acima.
            </p>
          ) : (
            flow.slotGroups.map((group) => (
              <div key={group.label} className="slots">
                <p className="slots__label">{group.label}</p>
                <div className="slots__grid">
                  {group.slots.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={cn(
                        "slots__slot",
                        item.id === slot?.id && "slots__slot--active",
                      )}
                      onClick={() => flow.chooseSlot(item.id)}
                    >
                      {formatSlot(item.startsAt)}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </Step>

        <Step
          number={4}
          title="Seus dados"
          current={flow.step}
          onEdit={() => flow.goTo(4)}
        >
          <form className="fields" onSubmit={flow.submit} noValidate>
            <label className="field">
              <span>Nome</span>
              <input
                autoComplete="name"
                placeholder="Como podemos te chamar?"
                value={flow.name}
                onChange={(event) => flow.setName(event.target.value)}
              />
            </label>
            <label className="field">
              <span>WhatsApp</span>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="(11) 98888-7777"
                value={flow.phone}
                onChange={(event) => flow.setPhone(event.target.value)}
              />
            </label>
            <label className="field field--wide">
              <span>E-mail</span>
              <input
                type="email"
                autoComplete="email"
                placeholder="Para enviar a confirmação"
                value={flow.email}
                onChange={(event) => flow.setEmail(event.target.value)}
              />
            </label>
            {flow.error && (
              <p className="booking__error" role="alert">
                {flow.error}
              </p>
            )}
            <button
              type="submit"
              className="btn btn--gold btn--lg field--wide"
              disabled={flow.submitting}
            >
              {flow.submitting ? "Confirmando..." : "Confirmar agendamento"}
            </button>
            <p className="fields__note field--wide">
              Sem cadastro. Cancelamento grátis até 2h antes.
            </p>
          </form>
        </Step>
        {flow.error && flow.step !== 4 && (
          <p className="booking__error" role="alert">
            {flow.error}
          </p>
        )}
      </div>

      <aside
        className={cn("ticket", !professional && "ticket--empty")}
        aria-label="Resumo do agendamento"
      >
        <p className="ticket__label">Seu horário</p>
        {professional ? (
          <>
            <div className="ticket__pro">
              <Avatar member={professional} size={52} />
              <div>
                <strong>{professional.name}</strong>
                <span>{professional.role}</span>
              </div>
            </div>
            <dl className="ticket__rows">
              <div>
                <dt>Serviço</dt>
                <dd>{service?.name ?? "—"}</dd>
              </div>
              <div>
                <dt>Data</dt>
                <dd>{slot ? longDate(flow.date) : "—"}</dd>
              </div>
              <div>
                <dt>Horário</dt>
                <dd>{slot ? formatSlot(slot.startsAt) : "—"}</dd>
              </div>
            </dl>
            <div className="ticket__total">
              <span>Total</span>
              <strong>{service ? currency.format(service.price) : "—"}</strong>
            </div>
            <p className="ticket__note">Pagamento na barbearia</p>
          </>
        ) : (
          <ul className="ticket__trust">
            <li>Sem cadastro</li>
            <li>Confirmação na hora</li>
            <li>Cancelamento grátis até 2h antes</li>
            <li>Pagamento na barbearia</li>
          </ul>
        )}
      </aside>
    </div>
  );
}
