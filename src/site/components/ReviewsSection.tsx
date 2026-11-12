import { initials } from "@/lib/format";
import { formatRating, relativeDate, type ReviewCard } from "../site.utils";
import { Stars } from "./Rating";

type Summary = {
  average: number;
  count: number;
  breakdown: { stars: number; count: number; percentage: number }[];
};

const TONES = ["gold", "sand", "smoke"] as const;

export function ReviewsSection({
  summary,
  reviews,
  title,
}: {
  summary: Summary;
  reviews: ReviewCard[];
  title: React.ReactNode;
}) {
  if (!summary.count) return null;

  return (
    <section className="reviews" id="avaliacoes">
      <aside className="reviews__aside">
        <p className="eyebrow" data-reveal>
          Avaliações
        </p>
        <h2 className="title title--sm" data-reveal>
          {title}
        </h2>

        <div className="score" data-reveal>
          <div className="score__top">
            <strong className="score__value">{formatRating(summary.average)}</strong>
            <div>
              <Stars value={summary.average} size={18} />
              <span className="score__count">{summary.count} avaliações de clientes</span>
            </div>
          </div>
          <ul className="score__bars" aria-label="Distribuição das notas">
            {summary.breakdown.map((row) => (
              <li key={row.stars}>
                <span>{row.stars}</span>
                <i>
                  <b style={{ width: `${row.percentage}%` }} />
                </i>
                <small>{row.percentage}%</small>
              </li>
            ))}
          </ul>
        </div>

        <a href="#agendar" className="btn btn--gold reviews__cta" data-magnetic>
          Quero agendar <span aria-hidden="true">→</span>
        </a>
      </aside>

      {reviews.length > 0 && (
        <div className={`reviews__wall${reviews.length <= 3 ? " reviews__wall--few" : ""}`}>
          {reviews.map((review, index) => (
            <figure
              key={review.id}
              className={`review review--${TONES[index % TONES.length]}`}
              data-reveal
              style={{ ["--i" as string]: index % 4 }}
            >
              <header className="review__head">
                <span className="review__avatar" aria-hidden="true">
                  {initials(review.client)}
                </span>
                <span className="review__who">
                  <strong>{review.client}</strong>
                  <small>{relativeDate(review.createdAt)}</small>
                </span>
                <Stars value={review.rating} size={13} />
              </header>
              <blockquote>{review.comment}</blockquote>
              {(review.service || review.professional) && (
                <figcaption className="review__tags">
                  {review.service && <span>{review.service}</span>}
                  {review.professional && <span>com {review.professional.split(" ")[0]}</span>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
