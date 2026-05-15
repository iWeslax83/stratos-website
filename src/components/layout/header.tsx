"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Languages } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/brand/logo-mark";
import { Wordmark } from "@/components/brand/wordmark";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-[color-mix(in_oklab,var(--color-ink-900)_85%,transparent)] backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <Container size="wide">
        <div className="flex h-20 items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3 group" aria-label="Stratos anasayfaya dön">
            <LogoMark size={44} priority />
            <Wordmark withDescriptor />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 text-[0.78rem] font-display font-semibold uppercase tracking-[0.18em] transition-colors",
                    active
                      ? "text-[var(--color-brand-300)]"
                      : "text-ink-200 hover:text-white",
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[var(--color-brand-300)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitcher pathname={pathname} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-ink-100 lg:hidden"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <MobileMenu pathname={pathname} />
      )}
    </header>
  );
}

function LangSwitcher({ pathname }: { pathname: string }) {
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  return (
    <div className="flex items-center rounded-full border border-white/10 p-0.5 text-[0.65rem] font-display font-semibold uppercase tracking-[0.2em]">
      <Link
        href="/"
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          !isEn
            ? "bg-white/10 text-white"
            : "text-ink-300 hover:text-white",
        )}
        aria-current={!isEn ? "page" : undefined}
      >
        TR
      </Link>
      <Link
        href="/en"
        className={cn(
          "flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors",
          isEn
            ? "bg-white/10 text-white"
            : "text-ink-300 hover:text-white",
        )}
        aria-current={isEn ? "page" : undefined}
      >
        <Languages size={11} /> EN
      </Link>
    </div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <div className="lg:hidden">
          <div className="border-y border-white/5 bg-[color-mix(in_oklab,var(--color-ink-900)_95%,transparent)] backdrop-blur-xl">
            <Container size="wide">
              <nav className="grid gap-1 py-4">
                {site.nav.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-lg px-4 py-3 text-base font-display font-semibold uppercase tracking-[0.2em] transition-colors",
                        active
                          ? "bg-white/5 text-[var(--color-brand-300)]"
                          : "text-ink-100 hover:bg-white/5",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </Container>
          </div>
        </div>
  );
}
