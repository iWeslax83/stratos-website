"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface GalleryItem {
  src: string;
  alt: string;
  category?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

const ALL = "Tümü";

export function GalleryGrid({ items }: GalleryGridProps) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.category && set.add(i.category));
    return [ALL, ...Array.from(set)];
  }, [items]);

  const [filter, setFilter] = useState<string>(ALL);
  const filtered = useMemo(
    () => (filter === ALL ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  );

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(
    () => setOpenIdx((i) => (i == null ? null : (i + 1) % filtered.length)),
    [filtered.length],
  );
  const prev = useCallback(
    () =>
      setOpenIdx((i) =>
        i == null ? null : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  useEffect(() => {
    if (openIdx == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, close, next, prev]);

  return (
    <>
      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[0.65rem] font-display font-semibold uppercase tracking-[0.2em] transition-colors",
                filter === c
                  ? "border-[var(--color-brand-300)] bg-[var(--color-brand-300)]/10 text-[var(--color-brand-200)]"
                  : "border-white/10 text-ink-300 hover:border-white/20 hover:text-white",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 sm:gap-4 lg:auto-rows-[220px] lg:grid-cols-6">
        {filtered.map((img, i) => {
          const span = spanFor(i);
          return (
            <button
              type="button"
              key={img.src}
              onClick={() => setOpenIdx(i)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-300)]",
                span,
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink-950)]/85 via-[var(--color-ink-950)]/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                <p className="text-left text-[0.7rem] font-display uppercase tracking-[0.18em] text-ink-100">
                  {img.alt}
                </p>
                {img.category && (
                  <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.2em] text-[var(--color-brand-200)] backdrop-blur">
                    {img.category}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {openIdx != null && (
        <Lightbox
          item={filtered[openIdx]}
          index={openIdx}
          total={filtered.length}
          onClose={close}
          onNext={next}
          onPrev={prev}
        />
      )}
    </>
  );
}

// Bento span pattern repeats every 6 items: large hero + smaller tiles.
function spanFor(i: number): string {
  const k = i % 6;
  if (k === 0) return "col-span-2 row-span-2";
  if (k === 5) return "col-span-2";
  return "";
}

function Lightbox({
  item,
  index,
  total,
  onClose,
  onNext,
  onPrev,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-ink-950)]/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-ink-100 hover:bg-white/10"
        aria-label="Kapat"
      >
        <X size={20} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/5 text-ink-100 hover:bg-white/10 sm:left-6"
        aria-label="Önceki"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/5 text-ink-100 hover:bg-white/10 sm:right-6"
        aria-label="Sonraki"
      >
        <ChevronRight size={22} />
      </button>
      <figure
        className="relative mx-4 flex max-h-[90vh] w-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
        <figcaption className="mt-4 flex w-full items-center justify-between gap-4 text-sm text-ink-200">
          <span>{item.alt}</span>
          <span className="text-xs uppercase tracking-[0.2em] text-ink-400">
            {index + 1} / {total}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
