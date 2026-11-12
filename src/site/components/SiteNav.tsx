"use client";

import Link from "next/link";
import { NAV } from "../site.data";
import { useNavMenu } from "../hooks/use-nav-menu";
import { cn } from "@/lib/class-names";
import { Logo } from "./Logo";

export function SiteNav({
  base = "",
  bookHref = "#agendar",
}: {
  base?: string;
  bookHref?: string;
}) {
  const menu = useNavMenu();

  return (
    <header
      className={cn(
        "nav",
        menu.scrolled && "nav--solid",
        menu.hidden && "nav--hidden",
        menu.open && "nav--open",
      )}
    >
      <Logo onClick={menu.close} />

      <nav className="nav__links" id="menu-principal" aria-label="Principal">
        {NAV.map((item, index) => (
          <a
            key={item.href}
            href={`${base}${item.href}`}
            onClick={menu.close}
            style={{ ["--i" as string]: index }}
          >
            {item.label}
          </a>
        ))}
        <Link
          href="/entrar"
          prefetch={false}
          className="nav__menu-login"
          onClick={menu.close}
        >
          Área do profissional →
        </Link>
      </nav>

      <div className="nav__actions">
        <Link href="/entrar" prefetch={false} className="nav__login">
          Entrar
        </Link>
        <Link
          href={bookHref}
          prefetch={false}
          className="btn btn--gold btn--sm nav__cta"
          data-magnetic
        >
          Agendar
        </Link>
        <button
          type="button"
          className="nav__burger"
          aria-expanded={menu.open}
          aria-controls="menu-principal"
          aria-label={menu.open ? "Fechar menu" : "Abrir menu"}
          onClick={menu.toggle}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
