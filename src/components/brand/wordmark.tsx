import { cn } from "@/lib/cn";

interface WordmarkProps {
  className?: string;
  withDescriptor?: boolean;
  descriptorClassName?: string;
}

/**
 * STRATOS wordmark — Aerospace Stencil treatment.
 * Pairs with the round logo mark; standalone on dark surfaces only.
 */
export function Wordmark({
  className,
  withDescriptor = false,
  descriptorClassName,
}: WordmarkProps) {
  return (
    <div className="flex flex-col leading-none">
      <span className={cn("wordmark-stratos text-[1.6rem] sm:text-[1.85rem]", className)}>
        STRATOS
      </span>
      {withDescriptor && (
        <span
          className={cn(
            "mt-1 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.28em] text-ink-300/80 font-display",
            descriptorClassName,
          )}
        >
          Bursa Fen Lisesi İHA Takımı
        </span>
      )}
    </div>
  );
}
