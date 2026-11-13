import Image from "next/image";
import Link from "next/link";
import { BUSINESS, whatsappUrl } from "@/lib/business";
import { IMAGES, NAV, UNITS } from "../site.data";
import { PoleArt } from "./LineArt";
import { Logo } from "./Logo";

export function SiteFooter({
  base = "",
  bookHref = "#agendar",
}: {
  base?: string;
  bookHref?: string;
}) {
  return (
    <>
      <section className="finale">
        <div className="finale__media" data-parallax="0.08">
          <Image src={IMAGES.finale} alt="" fill sizes="100vw" />
        </div>
        <PoleArt className="art--finale" />
        <div className="finale__content">
          <h2 className="title" data-reveal>
            Sua cadeira
            <br />
            está <em>esperando.</em>
          </h2>
          <Link
            href={bookHref}
            prefetch={false}
            className="btn btn--gold btn--lg"
            data-magnetic
          >
            Agendar horário <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer className="foot">
        <div className="foot__row">
          <Logo />
          <nav className="foot__nav" aria-label="Rodapé">
            {NAV.map((item) => (
              <a key={item.href} href={`${base}${item.href}`}>
                {item.label}
              </a>
            ))}
            <Link href="/entrar" prefetch={false}>
              Área do profissional
            </Link>
          </nav>
          <div className="foot__social">
            <a
              href={`https://www.instagram.com/${BUSINESS.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (abre em nova aba)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
              </svg>
            </a>
            <a
              href={whatsappUrl("Olá! Quero agendar um horário.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp (abre em nova aba)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.3 4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.3s1 2.6 1.1 2.8c.1.2 2 3 4.7 4.2 2.3.9 2.8.7 3.3.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.1-1.3l-.5-.3-1.9-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.4.3-.5v-.5l-.8-2c-.2-.5-.4-.5-.6-.5h-.4Z"
                />
              </svg>
            </a>
          </div>
        </div>

        <ul className="foot__units">
          {UNITS.map((unit) => (
            <li key={unit.name}>
              <strong>{unit.name}</strong>
              <span>{unit.street}</span>
              <a href={`tel:${unit.phone.replace(/\D/g, "")}`}>{unit.phone}</a>
            </li>
          ))}
        </ul>

        <div className="foot__bottom">
          <span>© 2026 BarberHub · Segunda a sábado, 9h às 20h</span>
          <a href="#">Voltar ao topo ↑</a>
        </div>
      </footer>
    </>
  );
}
