"use client";
import { useState } from "react";

export function ImageUpload({ label, value, category, onChange }: {
  label: string; value: string; category: string; onChange: (path: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function upload(file: File) {
    setBusy(true); setErr("");
    const fd = new FormData(); fd.append("file", file); fd.append("category", category);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setBusy(false);
    const j = await res.json();
    if (res.ok) onChange(j.path); else setErr(j.error ?? "Yükleme hatası");
  }

  return (
    <div className="space-y-2">
      <span className="text-xs uppercase tracking-wide text-neutral-400">{label}</span>
      {value && <img src={value} alt="" className="h-16 rounded bg-white/5 object-contain" />}
      <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml"
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} disabled={busy} />
      <input value={value ?? ""} placeholder="/images/..." onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm" />
      {busy && <p className="text-sm text-sky-400">Yükleniyor…</p>}
      {err && <p className="text-sm text-red-400">{err}</p>}
    </div>
  );
}
