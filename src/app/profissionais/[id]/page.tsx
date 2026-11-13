import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { initials } from "@/lib/format";
import { BlackShell } from "@/site/components/BlackShell";
import { BookingFlow } from "@/site/components/BookingFlow";
import { ScissorsArt } from "@/site/components/LineArt";
import { FloatingActions } from "@/site/components/FloatingActions";
import { Rating, Stars } from "@/site/components/Rating";
import { ReviewsSection } from "@/site/components/ReviewsSection";
import { SiteFooter } from "@/site/components/SiteFooter";
import { SiteNav } from "@/site/components/SiteNav";
import { getProfile, getTeam } from "@/site/site.service";
import { formatRating } from "@/site/site.utils";

type Params = { id: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const profile = await getProfile((await params).id);
  return {
    title: profile
      ? `${profile.member.name}`
      : "Profissional",
  };
}

export default async function BarberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const profile = getProfile(id);
  const team = getTeam();
  if (!profile) notFound();

  const { member, summary, reviews, others } = profile;
  const [firstName, ...rest] = member.name.split(" ");

  return (
    <BlackShell>
      <SiteNav base="/" />

      <section className="profile">
        <div className="profile__copy">
          <Link href="/#time" className="profile__back">
            ← Time
          </Link>
          <p className="eyebrow">{member.role}</p>
          <h1 className="title">
            {firstName} <em>{rest.join(" ")}</em>
          </h1>
          {member.bio && <p className="profile__bio">{member.bio}</p>}

          {summary.count > 0 && (
            <a href="#avaliacoes" className="profile__score">
              <strong>{formatRating(summary.average)}</strong>
              <span className="profile__score-meta">
                <Stars value={summary.average} size={18} />
                <small>{summary.count} avaliações</small>
              </span>
            </a>
          )}

          <div className="profile__actions">
            <a href="#agendar" className="btn btn--gold btn--lg" data-magnetic>
              Agendar com {firstName} <span aria-hidden="true">→</span>
            </a>
            {member.years ? (
              <span className="profile__years">
                {member.years} anos de experiência
              </span>
            ) : null}
          </div>
        </div>

        <div className="profile__media">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          ) : (
            <span className="profile__initials">{initials(member.name)}</span>
          )}
        </div>
      </section>

      <section className="book-section" id="agendar">
        <ScissorsArt className="art--book" />
        <BookingFlow
          team={team}
          initial={{ professionalId: member.id }}
          variant="section"
          title={
            <>
              Agende com <em>{firstName}</em>
            </>
          }
        />
      </section>

      <ReviewsSection
        summary={summary}
        reviews={reviews}
        title={
          <>
            O que dizem do <em>{firstName}</em>
          </>
        }
      />

      {others.length > 0 && (
        <section className="team">
          <header className="head">
            <h2 className="title title--sm" data-reveal>
              Também no <em>time</em>
            </h2>
          </header>
          <div className="team__grid team__grid--three">
            {others.map((item, index) => (
              <Link
                key={item.id}
                href={`/profissionais/${item.id}`}
                className="member"
                data-reveal
                data-cursor-label="Ver perfil"
                style={{ ["--i" as string]: index }}
              >
                <div className="member__media">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={`${item.name}, ${item.role}`}
                      fill
                      sizes="(max-width: 900px) 75vw, 30vw"
                    />
                  )}
                </div>
                <div className="member__info">
                  <h3>{item.name}</h3>
                  <p>{item.role}</p>
                </div>
                {item.rating && (
                  <span className="member__rating">
                    <Rating value={item.rating} count={item.reviews} />
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter base="/" />
      <FloatingActions />
    </BlackShell>
  );
}
