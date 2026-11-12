"use client";

import Link from "next/link";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Scissors,
  Search,
  Users,
} from "lucide-react";
import "./painel.scss";
import { currency, initials } from "@/lib/format";
import { cn } from "@/lib/class-names";
import type { PainelData, PainelView } from "./painel.types";
import { dateLabel, statusLabel, timeLabel } from "./painel.utils";
import { usePainel } from "./use-painel";

const NAV: { id: PainelView; label: string; icon: typeof Users }[] = [
  { id: "visao-geral", label: "Visão geral", icon: LayoutDashboard },
  { id: "agenda", label: "Agenda", icon: CalendarDays },
  { id: "servicos", label: "Serviços", icon: Scissors },
  { id: "clientes", label: "Clientes", icon: Users },
];

export function PainelApp({ data }: { data: PainelData }) {
  const { view, setView, query, setQuery, stats, revenue, clients, upcoming } =
    usePainel(data);
  const max = Math.max(...revenue.map((day) => day.total), 1);
  const title = NAV.find((item) => item.id === view)?.label;

  return (
    <div className="painel">
      <aside className="painel__side">
        <Link href="/" className="painel__logo" data-cursor-label="Site">
          BARBER<b>HUB</b>
        </Link>
        <nav className="painel__nav" aria-label="Painel">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={cn(
                "painel__nav-item",
                view === id && "painel__nav-item--active",
              )}
              aria-current={view === id ? "page" : undefined}
              onClick={() => setView(id)}
            >
              <Icon aria-hidden="true" size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <Link href="/entrar" className="painel__exit">
          <LogOut aria-hidden="true" size={16} /> Sair
        </Link>
      </aside>

      <div className="painel__main">
        <header className="painel__top">
          <div>
            <p className="eyebrow">
              {data.demo ? "Demonstração" : "Painel do profissional"}
            </p>
            <h1>{title}</h1>
          </div>
          <label className="painel__search">
            <Search aria-hidden="true" size={16} />
            <input
              placeholder="Buscar cliente, serviço…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (view === "visao-geral") setView("agenda");
              }}
            />
          </label>
          <div className="painel__user">
            <span>{initials(data.userName)}</span>
            {data.userName}
          </div>
        </header>

        {view === "visao-geral" && (
          <>
            <section className="painel__kpis">
              {[
                {
                  label: "Faturado hoje",
                  value: currency.format(stats.todayRevenue),
                },
                {
                  label: "Atendimentos hoje",
                  value: `${stats.completedToday}/${stats.todays.length}`,
                },
                {
                  label: "Faturado 14 dias",
                  value: currency.format(stats.monthRevenue),
                },
                {
                  label: "Clientes ativos",
                  value: String(stats.uniqueClients),
                },
              ].map((kpi, index) => (
                <article
                  key={kpi.label}
                  className="painel__kpi"
                  data-glow
                  data-reveal
                  style={{ ["--i" as string]: index }}
                >
                  <span>{kpi.label}</span>
                  <strong>{kpi.value}</strong>
                </article>
              ))}
            </section>

            <section className="painel__grid">
              <article className="painel__card" data-glow data-reveal>
                <h2>Receita · últimos 14 dias</h2>
                <div
                  className="painel__bars"
                  role="img"
                  aria-label="Receita por dia"
                >
                  {revenue.map((day) => (
                    <div
                      key={day.key}
                      className="painel__bar"
                      data-value={currency.format(day.total)}
                    >
                      <i style={{ height: `${(day.total / max) * 100}%` }} />
                      <small>{day.label}</small>
                    </div>
                  ))}
                </div>
              </article>

              <article className="painel__card" data-glow data-reveal>
                <h2>Agenda de hoje</h2>
                {stats.todays.length === 0 ? (
                  <p className="painel__empty">Nenhum atendimento para hoje.</p>
                ) : (
                  <ul className="painel__timeline">
                    {stats.todays.map((item) => (
                      <li key={item.id}>
                        <time>{timeLabel(item.scheduledAt)}</time>
                        <div>
                          <strong>{item.clientName}</strong>
                          <span>
                            {item.serviceName} · {item.professionalName}
                          </span>
                        </div>
                        <em
                          className={`painel__tag painel__tag--${statusLabel(item.status) === "Concluído" ? "ok" : "wait"}`}
                        >
                          {statusLabel(item.status)}
                        </em>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </section>
          </>
        )}

        {view === "agenda" && (
          <section className="painel__card painel__card--table" data-glow>
            {upcoming.length === 0 ? (
              <p className="painel__empty">Nenhum agendamento encontrado.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Serviço</th>
                    <th>Profissional</th>
                    <th>Valor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcoming.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {dateLabel(item.scheduledAt)} ·{" "}
                        {timeLabel(item.scheduledAt)}
                      </td>
                      <td>{item.clientName}</td>
                      <td>{item.serviceName}</td>
                      <td>{item.professionalName}</td>
                      <td>{currency.format(item.price)}</td>
                      <td>
                        <em
                          className={`painel__tag painel__tag--${statusLabel(item.status) === "Concluído" ? "ok" : "wait"}`}
                        >
                          {statusLabel(item.status)}
                        </em>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {view === "servicos" && (
          <section className="painel__cards">
            {data.services.map((service, index) => (
              <article
                key={service.id}
                className="painel__card"
                data-tilt
                data-glow
                data-reveal
                style={{ ["--i" as string]: index }}
              >
                <span className="painel__tag painel__tag--wait">
                  {service.duration ? `${service.duration} min` : "—"}
                </span>
                <h2>{service.name}</h2>
                <strong className="painel__price">
                  {currency.format(service.price)}
                </strong>
                <small>{service.active ? "Ativo" : "Inativo"}</small>
              </article>
            ))}
          </section>
        )}

        {view === "clientes" && (
          <section className="painel__card painel__card--table" data-glow>
            {clients.length === 0 ? (
              <p className="painel__empty">Nenhum cliente ainda.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Visitas</th>
                    <th>Gasto</th>
                    <th>Última visita</th>
                  </tr>
                </thead>
                <tbody>
                  {clients
                    .filter((client) =>
                      client.name
                        .toLowerCase()
                        .includes(query.trim().toLowerCase()),
                    )
                    .map((client) => (
                      <tr key={client.name}>
                        <td>
                          <span className="painel__avatar">
                            {initials(client.name)}
                          </span>
                          {client.name}
                        </td>
                        <td>{client.visits}</td>
                        <td>{currency.format(client.spent)}</td>
                        <td>{dateLabel(client.last)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
