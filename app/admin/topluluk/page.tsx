"use client";
import { useEffect, useState } from "react";
import { SectionForm } from "@/components/admin/section-form";
import { TextField, TextArea, ListEditor } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/image-upload";
import type { OutreachItem } from "@/data/types";

function useSection<T>(section: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    fetch(`/api/admin/content?section=${section}`)
      .then((r) => r.json()).then((j) => setData(j.data));
  }, [section]);
  return data;
}

const blankOutreach: OutreachItem = {
  slug: "", title: "", period: "", blurb: "", stat: "", statLabel: "", image: null,
};

export default function ToplulukEditor() {
  const outreach = useSection<OutreachItem[]>("outreach");

  if (!outreach) return <p className="text-neutral-500">Yükleniyor…</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Topluluk</h1>
      <SectionForm section="outreach" initial={outreach}>
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
