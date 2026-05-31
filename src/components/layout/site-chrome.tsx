"use client";

import { usePathname } from "next/navigation";

/**
 * Renders the public site chrome (backdrop, header, footer, lightbox) around
 * the page — EXCEPT on /admin routes, which provide their own full-screen
 * layout. The chrome elements are passed in as props so they stay server
 * components (this gate only decides whether to render them).
 */
export function SiteChrome({
  backdrop,
  header,
  footer,
  lightbox,
  children,
}: {
  backdrop: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  lightbox: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }
  return (
    <>
      {backdrop}
      <div className="relative flex min-h-dvh flex-col">
        {header}
        <main className="flex-1">{children}</main>
        {footer}
      </div>
      {lightbox}
    </>
  );
}
