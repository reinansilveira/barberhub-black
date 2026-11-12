import { initials } from "@/lib/format";
import { formatRating, relativeDate, type ReviewCard } from "../site.utils";
import { Stars } from "./Rating";

type Summary = {
  average: number;
  count: number;
  breakdown: { stars: number; count: number; percentage: number }[];
};

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
      <header className="reviews__head">
        <div>
          <p className="eyebrow" data-reveal>
            Avaliações
          </p>
          <h2 className="title" data-reveal>
            {title}
          </h2>
        </div>

        <div className="score" data-reveal>
          <strong className="score__value">
            {formatRating(summary.average)}
          </strong>
          <div className="score__meta">
            <Stars value={summary.average} size={20} />
            <span>{summary.count} avaliações verificadas</span>
          </div>
          <ul className="score__bars" aria-label="Distribuição das notas">
            {summary.breakdown.map((row) => (
              <li key={row.stars}>
                <span>{row.stars}</span>
                <i>
                  <b style={{ width: `${row.percentage}%` }} />
                </i>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {reviews.length > 0 && (
        <div className="reviews__track">
          {reviews.map((review, index) => (
            <figure
              key={review.id}
              className="review"
              data-reveal
              style={{ ["--i" as string]: index }}
            >
              <Stars value={review.rating} size={14} />
              <blockquote>{review.comment}</blockquote>
              <figcaption>
                <span className="review__avatar" aria-hidden="true">
                  {initials("Cliente")}
                </span>
                <span>
                  <strong>Cliente verificado</strong>
                  <small>
                    {review.professional
                      ? `com ${review.professional.split(" ")[0]} · `
                      : ""}
                    {relativeDate(review.createdAt)}
                  </small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
