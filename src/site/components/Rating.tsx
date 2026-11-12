import { formatRating } from "../site.utils";
import { StarIcon } from "./Vectors";

export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <span className="rating" aria-label={`Nota ${formatRating(value)} de 5`}>
      <StarIcon className="rating__star" width="14" height="14" />
      <strong>{formatRating(value)}</strong>
      {count !== undefined && <small>({count})</small>}
    </span>
  );
}

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span
      className="stars"
      role="img"
      aria-label={`${formatRating(value)} de 5 estrelas`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, value - index));
        return (
          <span
            key={index}
            className="stars__item"
            style={{ width: size, height: size }}
          >
            <StarIcon width={size} height={size} className="stars__off" />
            <span className="stars__fill" style={{ width: `${fill * 100}%` }}>
              <StarIcon width={size} height={size} className="stars__on" />
            </span>
          </span>
        );
      })}
    </span>
  );
}
