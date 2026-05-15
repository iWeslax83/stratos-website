"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

/**
 * Global delegate: clicking any standalone Stratos logo image opens it large.
 * Skips logos wrapped in <a> or <button> (e.g. header brand link) so navigation
 * isn't hijacked. Targets <img> with alt containing "amblem".
 */
export function LogoLightbox() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const img = target.closest("img") as HTMLImageElement | null;
      if (!img) return;
      const alt = (img.getAttribute("alt") ?? "").toLowerCase();
      if (!alt.includes("amblem")) return;
      // Don't hijack if the logo sits inside an interactive ancestor.
      if (img.closest("a, button")) return;
      e.preventDefault();
      // Resolve to the original (un-optimized) source for max quality.
      const raw = img.currentSrc || img.src;
      setSrc(raw.includes("/_next/image") ? "/brand/logo-mark.png" : raw);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSrc(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Stratos amblemi"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--color-ink-950)]/95 backdrop-blur-md"
      onClick={() => setSrc(null)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setSrc(null);
        }}
        aria-label="Kapat"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-ink-100 hover:bg-white/10"
      >
        <X size={20} />
      </button>
      <figure
        className="relative mx-4 flex max-h-[90vh] w-full max-w-2xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Stratos İHA Takımı amblemi"
          className="max-h-[80vh] w-auto rounded-3xl object-contain shadow-[0_0_120px_-20px_var(--color-brand-300)]"
        />
        <figcaption className="mt-5 text-center text-xs uppercase tracking-[0.3em] text-ink-300">
          Stratos · Bursa Fen Lisesi İHA Takımı
        </figcaption>
      </figure>
    </div>
  );
}
