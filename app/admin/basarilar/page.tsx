"use client";
import { useEffect, useState } from "react";
import { SectionForm } from "@/components/admin/section-form";
import { TextField, TextArea, ListEditor } from "@/components/admin/fields";
import type { Achievement } from "@/data/types";

function useSection<T>(section: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    fetch(`/api/admin/content?section=${section}`)
      .then((r) => r.json()).then((j) => setData(j.data));
  }, [section]);
  return data;
}

const blankAchievement: Achievement = { id: "", title: "", year: "", category: "", blurb: "" };

export default function BasarilarEditor() {
  const achievements = useSection<Achievement[]>("achievements");

  if (!achievements) return <p className="text-neutral-500">Yükleniyor…</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Başarılar</h1>
      <SectionForm section="achievements" initial={achievements}>
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
