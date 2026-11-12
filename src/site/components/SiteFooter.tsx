import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { IMAGES, NAV, UNITS } from "../site.data";
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
          <a
            className="foot__social"
            href={`https://www.instagram.com/${BUSINESS.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{BUSINESS.instagram}
          </a>
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
          <span>© 2026 BarberHub</span>
          <span>
            <Link href="/termos" prefetch={false}>
              Termos
            </Link>
            <Link href="/privacidade" prefetch={false}>
              Privacidade
            </Link>
          </span>
        </div>
      </footer>
    </>
  );
}
