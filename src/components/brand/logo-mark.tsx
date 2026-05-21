import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoMarkProps {
  /** Rendered height in px; width scales to the phoenix aspect ratio. */
  size?: number;
  className?: string;
  priority?: boolean;
}

// Phoenix emblem intrinsic dimensions (transparent PNG).
const PHOENIX_W = 1350;
const PHOENIX_H = 625;

export function LogoMark({ size = 40, className, priority }: LogoMarkProps) {
  const width = Math.round((size * PHOENIX_W) / PHOENIX_H);
  return (
    <span
      className={cn("inline-flex shrink-0 items-center", className)}
      style={{ height: size }}
    >
      <Image
        src="/brand/phoenix.png"
        alt="Stratos İHA Takımı amblemi"
        width={width}
        height={size}
        priority={priority}
        className="h-full w-auto object-contain transition-transform hover:scale-105"
      />
    </span>
  );
}
