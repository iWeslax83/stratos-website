"use client";

const base = "w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm";

export function TextField({ label, value, onChange, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs uppercase tracking-wide text-neutral-400">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={base} />
    </label>
  );
}

export function TextArea({ label, value, onChange, rows = 4 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs uppercase tracking-wide text-neutral-400">{label}</span>
      <textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value)} className={base} />
    </label>
  );
}

export function Toggle({ label, value, onChange, hint }: {
  label: string; value: boolean; onChange: (v: boolean) => void; hint?: string;
}) {
  return (
    <label className="flex items-start justify-between gap-4">
      <span className="space-y-1">
        <span className="block text-xs uppercase tracking-wide text-neutral-400">{label}</span>
        {hint && <span className="block text-xs text-neutral-500">{hint}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${
          value ? "bg-sky-600" : "bg-neutral-700"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            value ? "translate-x-[1.375rem]" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

export function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs uppercase tracking-wide text-neutral-400">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={base}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

export function StringList({ label, value, onChange }: {
  label: string; value: string[]; onChange: (v: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      <span className="text-xs uppercase tracking-wide text-neutral-400">{label}</span>
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input value={item} className={base}
            onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))} />
          <button type="button" className="px-2 text-red-400"
            onClick={() => onChange(value.filter((_, j) => j !== i))}>✕</button>
        </div>
      ))}
      <button type="button" className="text-sm text-sky-400" onClick={() => onChange([...value, ""])}>
        + Satır ekle
      </button>
    </div>
  );
}

/** Generic list editor for arrays of objects. */
export function ListEditor<T>({ label, value, onChange, blank, render }: {
  label: string; value: T[]; onChange: (v: T[]) => void; blank: T;
  render: (item: T, set: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{label}</span>
        <button type="button" className="text-sm text-sky-400"
          onClick={() => onChange([...value, structuredClone(blank)])}>+ Ekle</button>
      </div>
      {value.map((item, i) => (
        <div key={i} className="space-y-3 rounded-lg border border-neutral-800 p-4">
          <div className="flex justify-between">
            <span className="text-xs text-neutral-500">#{i + 1}</span>
            <div className="flex gap-2 text-xs">
              {i > 0 && <button type="button" onClick={() => {
                const c = [...value]; [c[i - 1], c[i]] = [c[i], c[i - 1]]; onChange(c);
              }}>↑</button>}
              {i < value.length - 1 && <button type="button" onClick={() => {
                const c = [...value]; [c[i + 1], c[i]] = [c[i], c[i + 1]]; onChange(c);
              }}>↓</button>}
              <button type="button" className="text-red-400"
                onClick={() => onChange(value.filter((_, j) => j !== i))}>Sil</button>
            </div>
          </div>
          {render(item, (patch) =>
            onChange(value.map((v, j) => (j === i ? { ...v, ...patch } : v))))}
        </div>
      ))}
    </div>
  );
}
