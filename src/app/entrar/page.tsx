import type { Metadata } from "next";
import { BlackShell } from "@/site/components/BlackShell";
import { BlackLogin } from "@/site/components/BlackLogin";

export const metadata: Metadata = { title: "Entrar" };

export default function BlackLoginPage() {
  return (
    <BlackShell>
      <BlackLogin />
    </BlackShell>
  );
}
