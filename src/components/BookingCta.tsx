import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function BookingCta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`button button-coral ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2.2} />
    </a>
  );
}
