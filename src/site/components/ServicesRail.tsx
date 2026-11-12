"use client";

import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "../site.data";
import { useScroller } from "../hooks/use-scroller";
import { SERVICE_ICONS } from "./Vectors";

export function ServicesRail() {
  const { ref, prev, next } = useScroller();

  return (
    <section className="rail" id="servicos">
      <header className="head head--row">
        <div>
          <p className="eyebrow" data-reveal>
            O menu
          </p>
          <h2 className="title" data-reveal>
            Escolha seu <em>ritual</em>
          </h2>
        </div>
        <div className="rail__arrows">
          <button type="button" onClick={prev} aria-label="Serviços anteriores">
            ←
          </button>
          <button type="button" onClick={next} aria-label="Próximos serviços">
            →
          </button>
        </div>
      </header>

      <div className="rail__track" ref={ref}>
        {SERVICES.map((service, index) => {
          const Icon = SERVICE_ICONS[index];
          return (
            <Link
              key={service.name}
              href="#agendar"
              prefetch={false}
              className="card"
              data-reveal
              data-cursor-label="Agendar"
              style={{ ["--i" as string]: index }}
            >
              <div className="card__media">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 80vw, 360px"
                />
              </div>
              <Icon className="card__icon" />
              <div className="card__body">
                <span className="card__time">{service.time}</span>
                <h3>{service.name}</h3>
                <p>{service.text}</p>
                <span className="card__price">{service.price}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
