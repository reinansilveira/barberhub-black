import { HERO_VIDEO, IMAGES } from "../site.data";
import { DateStrip } from "./DateStrip";

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <video
        className="hero__video"
        src={HERO_VIDEO}
        poster={IMAGES.hero}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">
          <span /> Barbearia em São Paulo desde 2014
        </p>
        <h1 className="hero__title">
          <span className="hero__line">Tradição em</span>
          <span className="hero__line">
            cada <em>detalhe.</em>
          </span>
        </h1>
      </div>

      <div className="hero__booking">
        <DateStrip />
      </div>
    </section>
  );
}
