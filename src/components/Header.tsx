"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LockKeyhole, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { nav, type Locale } from "@/lib/site-data";

export function Header({
  locale,
  bookingUrl,
  giftUrl,
  accountUrl,
}: {
  locale: Locale;
  bookingUrl: string;
  giftUrl: string;
  accountUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const isFr = locale === "fr";
  const items = nav[locale];

  function itemHref(item: (typeof items)[number]) {
    if (item.bookingKey === "gift_dive") return giftUrl;
    if (item.bookingKey === "agenda") return bookingUrl;
    return item.href ?? "#";
  }

  function closeMobileNavigation() {
    setOpen(false);
    setMobileServicesOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link className="admin-lock-link" href="/admin/" aria-label={isFr ? "Accéder à l’administration" : "Open administration"} title={isFr ? "Administration" : "Administration"}>
          <LockKeyhole size={16} />
        </Link>
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
          {items.map((item) => item.children ? (
            <div
              className={`desktop-nav-group${servicesOpen ? " is-open" : ""}`}
              key={item.href}
              onMouseLeave={() => setServicesOpen(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
              }}
            >
              <div className="desktop-nav-parent">
                <Link href={item.href ?? "#"}>{item.label}</Link>
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="desktop-services-menu"
                  aria-label={isFr ? "Ouvrir le menu des prestations" : "Open services menu"}
                  onClick={() => setServicesOpen((value) => !value)}
                >
                  <ChevronDown size={14} />
                </button>
              </div>
              <div id="desktop-services-menu" className="desktop-dropdown">
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href}>{child.label}</Link>
                ))}
              </div>
            </div>
          ) : item.bookingKey ? (
            <a className="desktop-nav-action" key={item.label} href={itemHref(item)} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ) : (
            <Link key={item.href} href={itemHref(item)}>{item.label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="language-switch" href={isFr ? "/en/home/" : "/"}>
            {isFr ? "EN" : "FR"}
          </Link>
          <a className="account-link" href={accountUrl} target="_blank" rel="noreferrer" aria-label={isFr ? "Mon compte" : "My account"}>
            <UserRound size={19} />
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
          {items.map((item) => item.children ? (
            <div className="mobile-nav-group" key={item.href}>
              <div className="mobile-nav-parent">
                <Link href={item.href ?? "#"} onClick={closeMobileNavigation}>{item.label}</Link>
                <button
                  type="button"
                  aria-expanded={mobileServicesOpen}
                  aria-controls="mobile-services-menu"
                  aria-label={isFr ? "Afficher les prestations" : "Show services"}
                  onClick={() => setMobileServicesOpen((value) => !value)}
                >
                  <ChevronDown size={20} />
                </button>
              </div>
              {mobileServicesOpen ? (
                <div id="mobile-services-menu" className="mobile-subnav">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} onClick={closeMobileNavigation}>{child.label}</Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : item.bookingKey ? (
            <a key={item.label} href={itemHref(item)} target="_blank" rel="noreferrer" onClick={closeMobileNavigation}>{item.label}</a>
          ) : (
            <Link key={item.href} href={itemHref(item)} onClick={closeMobileNavigation}>{item.label}</Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
