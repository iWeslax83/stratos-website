import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/data/site";
import { ContactForms } from "@/components/forms/contact-forms";

export const metadata = {
  title: "İletişim",
  description:
    "Stratos İHA Takımı'na sponsor olun ya da üye olmak için başvurun.",
};

export default function IletisimPage() {
  return (
    <>
      <PageHeader
        eyebrow="İletişim"
        title="Konuşmaya hazırız."
        description="Sponsorluk, iş birliği veya takıma katılım için aşağıdaki formları kullanın. Genel sorular için doğrudan mail atın."
      />

      <Container size="wide">
        <section className="grid gap-10 py-16 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-4">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              Doğrudan
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-[var(--color-brand-300)]" />
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-400">
                    E-posta
                  </p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="mt-1 block text-base text-ink-50 hover:text-white"
                  >
                    {site.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-[var(--color-brand-300)]" />
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-400">
                    Telefon
                  </p>
                  <a
                    href={site.contact.phoneHref}
                    className="mt-1 block text-base text-ink-50 hover:text-white"
                  >
                    {site.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--color-brand-300)]" />
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-400">
                    Adres
                  </p>
                  <p className="mt-1 text-base text-ink-100">
                    {site.contact.address}
                  </p>
                </div>
              </li>
            </ul>
          </aside>

          <div className="md:col-span-8">
            <ContactForms />
          </div>
        </section>
      </Container>
    </>
  );
}
