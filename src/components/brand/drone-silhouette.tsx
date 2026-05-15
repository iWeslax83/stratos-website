// Decorative inline X-quadrotor silhouette. Pure SVG, no external asset.
// Sized to scale via parent; defaults to filling its container.

interface DroneSilhouetteProps {
  className?: string;
}

export function DroneSilhouette({ className }: DroneSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Arms */}
      <line x1="60" y1="60" x2="140" y2="140" />
      <line x1="260" y1="60" x2="180" y2="140" />
      <line x1="60" y1="260" x2="140" y2="180" />
      <line x1="260" y1="260" x2="180" y2="180" />

      {/* Body — central hub */}
      <rect x="140" y="140" width="40" height="40" rx="8" />
      <circle cx="160" cy="160" r="6" />

      {/* Motor mounts */}
      <circle cx="60" cy="60" r="18" />
      <circle cx="260" cy="60" r="18" />
      <circle cx="60" cy="260" r="18" />
      <circle cx="260" cy="260" r="18" />

      {/* Propellers — dashed circles imply rotation */}
      <circle cx="60" cy="60" r="38" strokeDasharray="3 6" opacity="0.7" />
      <circle cx="260" cy="60" r="38" strokeDasharray="3 6" opacity="0.7" />
      <circle cx="60" cy="260" r="38" strokeDasharray="3 6" opacity="0.7" />
      <circle cx="260" cy="260" r="38" strokeDasharray="3 6" opacity="0.7" />

      {/* Camera mount */}
      <line x1="160" y1="180" x2="160" y2="200" />
      <rect x="148" y="200" width="24" height="14" rx="3" />

      {/* GPS mast */}
      <line x1="160" y1="140" x2="160" y2="116" />
      <circle cx="160" cy="110" r="6" />
    </svg>
  );
}
