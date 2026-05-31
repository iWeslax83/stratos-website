import { LangProvider } from "@/components/admin/lang-context";
import { AdminHeader } from "@/components/admin/admin-header";

export const metadata = { title: "Admin · Stratos", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-100">
      <LangProvider>
        <AdminHeader />
        <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
      </LangProvider>
    </div>
  );
}
