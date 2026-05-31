"use client";
import { SectionForm } from "@/components/admin/section-form";
import { useSection } from "@/components/admin/use-section";
import { useAdminLang } from "@/components/admin/lang-context";
import { TextField, TextArea, ListEditor } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/image-upload";
import type { OutreachItem } from "@/data/types";

const blankOutreach: OutreachItem = {
  slug: "", title: "", period: "", blurb: "", stat: "", statLabel: "", image: null,
};

export default function ToplulukEditor() {
  const { lang } = useAdminLang();
  const outreach = useSection<OutreachItem[]>("outreach", lang);

  if (!outreach) return <p className="text-neutral-500">Yükleniyor…</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Topluluk</h1>
      <SectionForm key={lang} section="outreach" initial={outreach} lang={lang}>
        {(s, set) => (
          <ListEditor<OutreachItem>
            label="Etkinlikler"
            value={s}
            onChange={set}
            blank={blankOutreach}
            render={(item, patch) => (
              <div className="space-y-3">
                <TextField label="Slug" value={item.slug} onChange={(v) => patch({ slug: v })} />
                <TextField label="Başlık" value={item.title} onChange={(v) => patch({ title: v })} />
                <TextField label="Dönem" value={item.period} onChange={(v) => patch({ period: v })} />
                <TextArea label="Açıklama" value={item.blurb} onChange={(v) => patch({ blurb: v })} rows={3} />
                <TextField label="İstatistik" value={item.stat ?? ""} onChange={(v) => patch({ stat: v })} />
                <TextField label="İstatistik etiketi" value={item.statLabel ?? ""} onChange={(v) => patch({ statLabel: v })} />
                <ImageUpload label="Görsel" value={item.image ?? ""} category="outreach" onChange={(v) => patch({ image: v || null })} />
              </div>
            )}
          />
        )}
      </SectionForm>
    </div>
  );
}
