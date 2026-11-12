import Link from "next/link";
import { ScissorsIcon } from "./Vectors";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      className="logo"
      onClick={onClick}
      aria-label="BarberHub, início"
    >
      <ScissorsIcon className="logo__mark" />
      <span>
        Barber<em>Hub</em>
      </span>
    </Link>
  );
}
