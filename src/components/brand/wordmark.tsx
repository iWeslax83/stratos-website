import { cn } from "@/lib/cn";
import { site } from "@/data/site";

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
    <div className="flex min-w-0 flex-col leading-none">
      <span className={cn("wordmark-stratos text-[1.4rem] sm:text-[1.85rem]", className)}>
        STRATOS
      </span>
      {withDescriptor && (
        <span
          className={cn(
            "mt-1 truncate text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-ink-300/80 font-display",
            descriptorClassName,
          )}
        >
          <span className="sm:hidden">{site.brand.descriptorShort}</span>
          <span className="hidden sm:inline">{site.brand.descriptor}</span>
        </span>
      )}
    </div>
  );
}
