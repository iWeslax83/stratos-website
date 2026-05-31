"use client";
import { SectionForm } from "@/components/admin/section-form";
import { useSection } from "@/components/admin/use-section";
import { useAdminLang } from "@/components/admin/lang-context";
import { TextField, TextArea, ListEditor } from "@/components/admin/fields";
import type { Achievement } from "@/data/types";

const blankAchievement: Achievement = { id: "", title: "", year: "", category: "", blurb: "" };

export default function BasarilarEditor() {
  const { lang } = useAdminLang();
  const achievements = useSection<Achievement[]>("achievements", lang);

  if (!achievements) return <p className="text-neutral-500">Yükleniyor…</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Başarılar</h1>
      <SectionForm key={lang} section="achievements" initial={achievements} lang={lang}>
        {(s, set) => (
          <ListEditor<Achievement>
            label="Başarılar"
            value={s}
            onChange={set}
            blank={blankAchievement}
            render={(item, patch) => (
              <div className="space-y-3">
                <TextField label="ID" value={item.id} onChange={(v) => patch({ id: v })} />
                <TextField label="Başlık" value={item.title} onChange={(v) => patch({ title: v })} />
                <TextField label="Yıl" value={item.year} onChange={(v) => patch({ year: v })} />
                <TextField label="Kategori" value={item.category} onChange={(v) => patch({ category: v })} />
                <TextArea label="Açıklama" value={item.blurb} onChange={(v) => patch({ blurb: v })} rows={3} />
              </div>
            )}
          />
        )}
      </SectionForm>
    </div>
  );
}
