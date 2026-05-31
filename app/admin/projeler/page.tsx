"use client";
import { useEffect, useState } from "react";
import { SectionForm } from "@/components/admin/section-form";
import { TextField, TextArea, StringList, ListEditor } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/image-upload";
import type { Project, Spec } from "@/data/types";

function useSection<T>(section: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    fetch(`/api/admin/content?section=${section}`)
      .then((r) => r.json()).then((j) => setData(j.data));
  }, [section]);
  return data;
}

const blankSpec: Spec = { value: "", unit: "", label: "" };
const blankProject: Project = {
  slug: "", title: "", competition: "", year: "",
  summary: "", highlights: [], tech: [], image: null, specs: [],
};

export default function ProjelerEditor() {
  const projects = useSection<Project[]>("projects");

  if (!projects) return <p className="text-neutral-500">Yükleniyor…</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Projeler</h1>
      <SectionForm section="projects" initial={projects}>
        {(s, set) => (
          <ListEditor<Project>
            label="Projeler"
            value={s}
            onChange={set}
            blank={blankProject}
            render={(item, patch) => (
              <div className="space-y-3">
                <TextField label="Slug" value={item.slug} onChange={(v) => patch({ slug: v })} />
                <TextField label="Başlık" value={item.title} onChange={(v) => patch({ title: v })} />
                <TextField label="Yarışma" value={item.competition} onChange={(v) => patch({ competition: v })} />
                <TextField label="Yıl" value={item.year} onChange={(v) => patch({ year: v })} />
                <TextArea label="Özet" value={item.summary} onChange={(v) => patch({ summary: v })} rows={3} />
                <StringList label="Öne çıkanlar" value={item.highlights} onChange={(v) => patch({ highlights: v })} />
                <StringList label="Teknolojiler" value={item.tech} onChange={(v) => patch({ tech: v })} />
                <ImageUpload label="Görsel" value={item.image ?? ""} category="projects" onChange={(v) => patch({ image: v || null })} />
                <div className="pl-2 border-l border-neutral-700">
                  <ListEditor<Spec>
                    label="Teknik özellikler"
                    value={item.specs}
                    onChange={(specs) => patch({ specs })}
                    blank={blankSpec}
                    render={(spec, setSpec) => (
                      <div className="grid grid-cols-3 gap-3">
                        <TextField label="Değer" value={spec.value} onChange={(v) => setSpec({ value: v })} />
                        <TextField label="Birim" value={spec.unit} onChange={(v) => setSpec({ unit: v })} />
                        <TextField label="Etiket" value={spec.label} onChange={(v) => setSpec({ label: v })} />
                      </div>
                    )}
                  />
                </div>
              </div>
            )}
          />
        )}
      </SectionForm>
    </div>
  );
}
