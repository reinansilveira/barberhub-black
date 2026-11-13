import Image from "next/image";
import Link from "next/link";
import { BlackShell } from "@/site/components/BlackShell";
import { FloatingActions } from "@/site/components/FloatingActions";
import { Hero } from "@/site/components/Hero";
import { ChairArt, RazorArt, ScissorsArt } from "@/site/components/LineArt";
import { Marquee } from "@/site/components/Marquee";
import { ClipperIcon, ScissorsIcon, StarIcon } from "@/site/components/Vectors";
import { PinnedGallery } from "@/site/components/PinnedGallery";
import { BookingFlow } from "@/site/components/BookingFlow";
import { Rating } from "@/site/components/Rating";
import { ReviewsSection } from "@/site/components/ReviewsSection";
import { ServicesRail } from "@/site/components/ServicesRail";
import { SiteFooter } from "@/site/components/SiteFooter";
import { SiteNav } from "@/site/components/SiteNav";
import { PLANS, STATS } from "@/site/site.data";
import { getHome } from "@/site/site.service";

export const dynamic = "force-dynamic";

export default async function BlackPage() {
  const { team, summary, reviews } = getHome();

  return (
    <BlackShell>
      <SiteNav />
      <Hero />
      <Marquee />

      <section className="book-section" id="agendar">
        <ScissorsArt className="art--book" />
        <BookingFlow team={team} initial={{}} variant="section" />
      </section>

      <ServicesRail />
      <PinnedGallery />

      {team.length > 0 && (
        <section className="team" id="time">
          <header className="head head--art">
            <div>
              <p className="eyebrow" data-reveal>
                O time
              </p>
              <h2 className="title" data-reveal>
                Quem cuida <em>de você</em>
              </h2>
            </div>
            <ChairArt className="art--team" />
          </header>
          <div className="team__grid">
            {team.slice(0, 4).map((barber, index) => (
              <Link
                key={barber.id}
                href={`/profissionais/${barber.id}`}
                className="member"
                data-reveal
                data-cursor-label="Ver perfil"
                style={{ ["--i" as string]: index }}
              >
                <div className="member__media">
                  {barber.image && (
                    <Image
                      src={barber.image}
                      alt={`${barber.name}, ${barber.role}`}
                      fill
                      sizes="(max-width: 900px) 75vw, 25vw"
                    />
                  )}
                </div>
                <div className="member__info">
                  <h3>{barber.name}</h3>
                  <p>{barber.role}</p>
                </div>
                {barber.rating && (
                  <span className="member__rating">
                    <Rating value={barber.rating} count={barber.reviews} />
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="stats" aria-label="Números">
        {STATS.map((stat, index) => {
          const Icon = [ScissorsIcon, ClipperIcon, StarIcon][index] ?? StarIcon;
          return (
          <div key={stat.label} className="stats__item" data-reveal>
            <Icon className="stats__icon" />
            <strong
              data-count={stat.value}
              data-suffix={stat.suffix}
              data-decimals={"decimals" in stat ? stat.decimals : 0}
            >
              0
            </strong>
            <span>{stat.label}</span>
          </div>
          );
        })}
      </section>

      <section className="club" id="clube">
        <RazorArt className="art--club" />
        <header className="head head--center">
          <p className="eyebrow" data-reveal>
            Clube
          </p>
          <h2 className="title" data-reveal>
            Assine e <em>volte sempre</em>
          </h2>
        </header>
        <div className="club__plans">
          {PLANS.map((plan, index) => {
            const featured = "featured" in plan;
            return (
              <article
                key={plan.name}
                className={`plan${featured ? " plan--featured" : ""}`}
                data-reveal
                style={{ ["--i" as string]: index }}
              >
                {featured && (
                  <span className="plan__badge">Mais escolhido</span>
                )}
                <h3>{plan.name}</h3>
                <p className="plan__price">
                  <small>R$</small>
                  {plan.price}
                  <small>/mês</small>
                </p>
                <ul>
                  {plan.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <Link
                  href="/planos"
                  prefetch={false}
                  className={`btn ${featured ? "btn--gold" : "btn--line"}`}
                  data-magnetic
                >
                  Assinar
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <ReviewsSection
        summary={summary}
        reviews={reviews}
        title={
          <>
            Quem vem, <em>volta</em>
          </>
        }
      />
      <SiteFooter />
      <FloatingActions />
    </BlackShell>
  );
}
