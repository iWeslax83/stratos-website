"use client";
import { SectionForm } from "@/components/admin/section-form";
import { useSection } from "@/components/admin/use-section";
import { useAdminLang } from "@/components/admin/lang-context";
import { TextField, TextArea, Select, StringList, ListEditor } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/image-upload";
import type { Sponsorship, Tier, Sponsor } from "@/data/types";

const blankTier: Tier = { id: "", name: "", amount: "", benefits: [] };
const blankSponsor: Sponsor = { name: "", logo: "", url: null, tier: "altin" };

export default function SponsorlarEditor() {
  const { lang } = useAdminLang();
  const sponsorship = useSection<Sponsorship>("sponsorship", lang);

  if (!sponsorship) return <p className="text-neutral-500">Yükleniyor…</p>;

  return (
    <div className="space-y-12">
      <h1 className="text-xl font-bold">Sponsorlar</h1>
      <SectionForm key={lang} section="sponsorship" initial={sponsorship} lang={lang}>
        {(s, set) => {
          const tierOptions = s.tiers.length > 0
            ? s.tiers.map((t) => ({ value: t.id, label: t.name || t.id }))
            : [{ value: "altin", label: "Altın" }];

          return (
            <div className="space-y-10">
              <section>
                <h2 className="mb-4 text-lg font-bold">Giriş</h2>
                <TextArea label="Giriş metni" value={s.intro} onChange={(v) => set({ ...s, intro: v })} rows={4} />
              </section>

              <section>
                <h2 className="mb-4 text-lg font-bold">Tier'lar</h2>
                <ListEditor<Tier>
                  label="Tier'lar"
                  value={s.tiers}
                  onChange={(tiers) => set({ ...s, tiers })}
                  blank={blankTier}
                  render={(item, patch) => (
                    <div className="space-y-3">
                      <TextField label="ID" value={item.id} onChange={(v) => patch({ id: v })} />
                      <TextField label="Ad" value={item.name} onChange={(v) => patch({ name: v })} />
                      <TextField label="Tutar" value={item.amount} onChange={(v) => patch({ amount: v })} />
                      <StringList label="Avantajlar" value={item.benefits} onChange={(v) => patch({ benefits: v })} />
                    </div>
                  )}
                />
              </section>

              <section>
                <h2 className="mb-4 text-lg font-bold">Sponsorlar</h2>
                <ListEditor<Sponsor>
                  label="Sponsorlar"
                  value={s.sponsors}
                  onChange={(sponsors) => set({ ...s, sponsors })}
                  blank={blankSponsor}
                  render={(item, patch) => (
                    <div className="space-y-3">
                      <TextField label="Ad" value={item.name} onChange={(v) => patch({ name: v })} />
                      <ImageUpload label="Logo" value={item.logo} category="sponsors" onChange={(v) => patch({ logo: v })} />
                      <TextField label="URL (boş = yok)" value={item.url ?? ""} onChange={(v) => patch({ url: v || null })} />
                      <Select
                        label="Tier"
                        value={item.tier}
                        onChange={(v) => patch({ tier: v })}
                        options={tierOptions}
                      />
                    </div>
                  )}
                />
              </section>
            </div>
          );
        }}
      </SectionForm>
    </div>
  );
}
