import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold uppercase tracking-[0.18em] transition-all duration-200 active:translate-y-px active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-brand-400)] text-ink-950 hover:bg-[var(--color-brand-300)] shadow-[0_6px_20px_-8px_color-mix(in_oklab,var(--color-brand-400)_70%,transparent)] hover:shadow-[0_10px_28px_-10px_color-mix(in_oklab,var(--color-brand-300)_75%,transparent)]",
  secondary:
    "bg-ink-100 text-ink-950 hover:bg-white",
  ghost:
    "bg-transparent text-ink-50 hover:bg-white/5",
  outline:
    "border border-ink-50/20 bg-transparent text-ink-50 hover:bg-white/5 hover:border-ink-50/40",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.7rem]",
  md: "h-11 px-6 text-[0.78rem]",
  lg: "h-14 px-8 text-[0.85rem]",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends BaseProps {
  as?: "button";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  href?: never;
}

interface ButtonAsLink extends BaseProps {
  as: "link";
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.as === "link") {
    if (props.external) {
      return (
        <a className={classes} href={props.href} target="_blank" rel="noreferrer noopener">
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={props.href}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
}
