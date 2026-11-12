import type { Metadata } from "next";
import { BlackShell } from "@/site/components/BlackShell";
import { BookingFlow } from "@/site/components/BookingFlow";
import { SiteNav } from "@/site/components/SiteNav";
import { getTeam } from "@/site/site.service";

export const metadata: Metadata = { title: "Agendar" };

export default async function BlackBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ profissional?: string; date?: string }>;
}) {
  const [{ profissional, date }, team] = await Promise.all([
    searchParams,
    getTeam(),
  ]);

  return (
    <BlackShell>
      <SiteNav base="/" bookHref="/agendar" />
      <div className="booking-page">
        <BookingFlow
          team={team}
          initial={{ professionalId: profissional, date }}
        />
      </div>
    </BlackShell>
  );
}
