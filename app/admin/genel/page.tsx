"use client";
import { SectionForm } from "@/components/admin/section-form";
import { useSection } from "@/components/admin/use-section";
import { useAdminLang } from "@/components/admin/lang-context";
import { TextField } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/image-upload";
import type { Brand, Contact, Season, Social, Media } from "@/data/types";

export default function GenelEditor() {
  const { lang } = useAdminLang();
  const brand = useSection<Brand>("brand", lang);
  const contact = useSection<Contact>("contact", lang);
  const social = useSection<Social>("social", lang);
  const season = useSection<Season>("season", lang);
  const media = useSection<Media>("media", lang);

  if (!brand || !contact || !social || !season || !media)
    return <p className="text-neutral-500">Yükleniyor…</p>;

  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-4 text-lg font-bold">Marka</h2>
        <SectionForm key={`brand-${lang}`} section="brand" initial={brand} lang={lang}>
          {(s, set) => (
            <div className="space-y-3">
              <TextField label="Ad" value={s.name} onChange={(v) => set({ ...s, name: v })} />
              <TextField label="Tanım" value={s.descriptor} onChange={(v) => set({ ...s, descriptor: v })} />
              <TextField label="Kısa tanım" value={s.descriptorShort} onChange={(v) => set({ ...s, descriptorShort: v })} />
              <TextField label="Tagline" value={s.tagline} onChange={(v) => set({ ...s, tagline: v })} />
              <TextField label="Uzun tagline" value={s.longTagline} onChange={(v) => set({ ...s, longTagline: v })} />
              <TextField label="Okul" value={s.school} onChange={(v) => set({ ...s, school: v })} />
              <TextField label="Şehir" value={s.city} onChange={(v) => set({ ...s, city: v })} />
            </div>
          )}
        </SectionForm>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">İletişim</h2>
        <SectionForm key={`contact-${lang}`} section="contact" initial={contact} lang={lang}>
          {(s, set) => (
            <div className="space-y-3">
              <TextField label="E-posta" value={s.email} onChange={(v) => set({ ...s, email: v })} />
              <TextField label="Telefon" value={s.phone} onChange={(v) => set({ ...s, phone: v })} />
              <TextField label="Telefon href" value={s.phoneHref} onChange={(v) => set({ ...s, phoneHref: v })} />
              <TextField label="Adres" value={s.address} onChange={(v) => set({ ...s, address: v })} />
            </div>
          )}
        </SectionForm>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">Sosyal Medya</h2>
        <SectionForm key={`social-${lang}`} section="social" initial={social} lang={lang}>
          {(s, set) => (
            <div className="space-y-3">
              <TextField label="Instagram (boş = yok)" value={s.instagram ?? ""} onChange={(v) => set({ ...s, instagram: v || null })} />
              <TextField label="LinkedIn" value={s.linkedin ?? ""} onChange={(v) => set({ ...s, linkedin: v || null })} />
              <TextField label="YouTube" value={s.youtube ?? ""} onChange={(v) => set({ ...s, youtube: v || null })} />
            </div>
          )}
        </SectionForm>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">Sezon</h2>
        <SectionForm key={`season-${lang}`} section="season" initial={season} lang={lang}>
          {(s, set) => (
            <div className="space-y-3">
              <TextField label="Etiket" value={s.label} onChange={(v) => set({ ...s, label: v })} />
              <TextField label="Yarışma" value={s.competition} onChange={(v) => set({ ...s, competition: v })} />
              <TextField label="Yarışma tarihi" value={s.competitionDate} onChange={(v) => set({ ...s, competitionDate: v })} />
              <TextField label="Sponsorluk son tarihi" value={s.sponsorshipDeadline} onChange={(v) => set({ ...s, sponsorshipDeadline: v })} />
              <TextField label="Mevcut aşama" value={s.currentPhase} onChange={(v) => set({ ...s, currentPhase: v })} />
              <TextField label="Sonraki kilometre taşı" value={s.nextMilestone} onChange={(v) => set({ ...s, nextMilestone: v })} />
            </div>
          )}
        </SectionForm>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">Medya</h2>
        <SectionForm key={`media-${lang}`} section="media" initial={media} lang={lang}>
          {(s, set) => (
            <div className="space-y-3">
              <ImageUpload label="Reveal band görseli" value={s.revealBand ?? ""} category="reveal" onChange={(v) => set({ ...s, revealBand: v || null })} />
            </div>
          )}
        </SectionForm>
      </section>
    </div>
  );
}
