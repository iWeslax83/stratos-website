"use client";
import { useState } from "react";

export function SectionForm<T>({ section, initial, children }: {
  section: string; initial: T;
  children: (state: T, set: (v: T) => void) => React.ReactNode;
}) {
  const [state, setState] = useState<T>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function save() {
    setStatus("saving"); setMsg("");
    const res = await fetch("/api/admin/content", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ section, data: state }),
    });
    if (res.ok) {
      const j = await res.json().catch(() => ({}));
      setStatus("ok");
      setMsg(j.en === false
        ? "Kaydedildi. (EN çevirisi başarısız — tekrar dene)"
        : "Kaydedildi — ~1-2 dk içinde yayında.");
    }
    else {
      const j = await res.json().catch(() => ({}));
      setStatus("err"); setMsg(j.error ?? "Hata");
    }
  }

  return (
    <div className="space-y-6">
      {children(state, setState)}
      <div className="sticky bottom-0 flex items-center gap-4 border-t border-neutral-800 bg-neutral-950 py-4">
        <button onClick={save} disabled={status === "saving"}
          className="rounded-lg bg-sky-600 px-5 py-2.5 font-semibold disabled:opacity-50">
          {status === "saving" ? "Kaydediliyor..." : "Kaydet"}
        </button>
        {msg && <span className={status === "err" ? "text-red-400" : "text-green-400"}>{msg}</span>}
      </div>
    </div>
  );
}
