import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoMarkProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function LogoMark({ size = 44, className, priority }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/logo-mark.png"
        alt="Stratos İHA Takımı amblemi"
        width={size}
        height={size}
        priority={priority}
        className="h-full w-full rounded-full object-cover transition-transform hover:scale-105"
      />
    </span>
  );
}
