import { ScissorsIcon, StarIcon } from "./Vectors";

const ITEMS = ["Corte Signature", "Barba Ritual", "Day Spa", "Agenda online", "Clube BarberHub", "Toalha quente"];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="band" aria-hidden="true">
      <div className="band__track">
        {[row, row].map((items, copy) => (
          <span key={copy} className="band__group">
            {items.map((item, index) => (
              <span key={`${copy}-${index}`} className="band__item">
                {item}
                {index % 2 ? <StarIcon width="16" height="16" /> : <ScissorsIcon width="20" height="20" />}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
