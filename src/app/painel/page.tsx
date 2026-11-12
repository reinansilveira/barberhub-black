import type { Metadata } from "next";
import { BlackShell } from "@/site/components/BlackShell";
import { PainelApp } from "@/site/painel/PainelApp";
import { DEMO_DATA } from "@/site/painel/painel.demo";

export const metadata: Metadata = { title: "Painel do profissional" };

export default function PainelPage() {
  return (
    <BlackShell>
      <PainelApp data={DEMO_DATA} />
    </BlackShell>
  );
}
