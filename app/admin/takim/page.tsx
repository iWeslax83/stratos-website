"use client";
import { useEffect, useState } from "react";
import { SectionForm } from "@/components/admin/section-form";
import { TextField, TextArea, ListEditor } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/image-upload";
import type { Team, Member, Department } from "@/data/types";

function useSection<T>(section: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    fetch(`/api/admin/content?section=${section}`)
      .then((r) => r.json()).then((j) => setData(j.data));
  }, [section]);
  return data;
}

const blankMember: Member = { name: "", role: "", department: "", captain: false, photo: null };
const blankDepartment: Department = { id: "", name: "", blurb: "" };

export default function TakimEditor() {
  const team = useSection<Team>("team");

  if (!team) return <p className="text-neutral-500">Yükleniyor…</p>;

  return (
    <div className="space-y-12">
      <h1 className="text-xl font-bold">Takım</h1>
      <SectionForm section="team" initial={team}>
        {(s, set) => (
          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-lg font-bold">Danışman</h2>
              <div className="space-y-3">
                <TextField label="Ad Soyad" value={s.advisor.name} onChange={(v) => set({ ...s, advisor: { ...s.advisor, name: v } })} />
                <TextField label="Rol" value={s.advisor.role} onChange={(v) => set({ ...s, advisor: { ...s.advisor, role: v } })} />
                <ImageUpload label="Fotoğraf" value={s.advisor.photo ?? ""} category="team" onChange={(v) => set({ ...s, advisor: { ...s.advisor, photo: v || null } })} />
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold">Üyeler</h2>
              <ListEditor<Member>
                label="Üyeler"
                value={s.members}
                onChange={(members) => set({ ...s, members })}
                blank={blankMember}
                render={(item, patch) => (
                  <div className="space-y-3">
                    <TextField label="Ad Soyad" value={item.name} onChange={(v) => patch({ name: v })} />
                    <TextField label="Rol" value={item.role} onChange={(v) => patch({ role: v })} />
                    <TextField label="Departman" value={item.department} onChange={(v) => patch({ department: v })} />
                    <ImageUpload label="Fotoğraf" value={item.photo ?? ""} category="team" onChange={(v) => patch({ photo: v || null })} />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={item.captain}
                        onChange={(e) => patch({ captain: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-neutral-300">Kaptan</span>
                    </label>
                  </div>
                )}
              />
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold">Departmanlar</h2>
              <ListEditor<Department>
                label="Departmanlar"
                value={s.departments}
                onChange={(departments) => set({ ...s, departments })}
                blank={blankDepartment}
                render={(item, patch) => (
                  <div className="space-y-3">
                    <TextField label="ID" value={item.id} onChange={(v) => patch({ id: v })} />
                    <TextField label="Ad" value={item.name} onChange={(v) => patch({ name: v })} />
                    <TextArea label="Açıklama" value={item.blurb} onChange={(v) => patch({ blurb: v })} rows={3} />
                  </div>
                )}
              />
            </section>
          </div>
        )}
      </SectionForm>
    </div>
  );
}
