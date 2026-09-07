"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { nav, type Locale } from "@/lib/site-data";

export function Header({
  locale,
  bookingUrl,
  accountUrl,
}: {
  locale: Locale;
  bookingUrl: string;
  accountUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const isFr = locale === "fr";

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link className="brand" href={isFr ? "/" : "/en/home/"}>
          <Image
            src="/images/brand/logo.png"
            width={218}
            height={102}
            alt="Corail Plongée"
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label={isFr ? "Navigation principale" : "Main navigation"}>
          {nav[locale].map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="language-switch" href={isFr ? "/en/home/" : "/"}>
            {isFr ? "EN" : "FR"}
          </Link>
          <a className="account-link" href={accountUrl} target="_blank" rel="noreferrer" aria-label={isFr ? "Mon compte" : "My account"}>
            <UserRound size={19} />
          </a>
          <a className="button button-small button-coral desktop-book" href={bookingUrl} target="_blank" rel="noreferrer">
            {isFr ? "Réserver" : "Book"}
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Navigation mobile">
          {nav[locale].map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a href={bookingUrl} target="_blank" rel="noreferrer">
            {isFr ? "Réserver une plongée" : "Book a dive"}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
