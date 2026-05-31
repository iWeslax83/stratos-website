"use client";
import { useEffect, useState } from "react";
import { SectionForm } from "@/components/admin/section-form";
import { TextField, TextArea, Select, StringList, ListEditor } from "@/components/admin/fields";
import type { BlogPost, BlogBlock } from "@/data/types";

function useSection<T>(section: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    fetch(`/api/admin/content?section=${section}`)
      .then((r) => r.json()).then((j) => setData(j.data));
  }, [section]);
  return data;
}

const CATEGORY_OPTIONS = [
  { value: "Build Log", label: "Build Log" },
  { value: "Donanım", label: "Donanım" },
  { value: "Yazılım", label: "Yazılım" },
  { value: "Saha", label: "Saha" },
  { value: "Takım", label: "Takım" },
];

const BLOCK_TYPE_OPTIONS = [
  { value: "p", label: "Paragraf (p)" },
  { value: "h2", label: "Başlık (h2)" },
  { value: "quote", label: "Alıntı (quote)" },
  { value: "list", label: "Liste (list)" },
  { value: "code", label: "Kod (code)" },
  { value: "metric", label: "Metrik (metric)" },
];

function freshBlock(type: BlogBlock["type"]): BlogBlock {
  switch (type) {
    case "p": return { type: "p", text: "" };
    case "h2": return { type: "h2", text: "" };
    case "quote": return { type: "quote", text: "" };
    case "list": return { type: "list", items: [] };
    case "code": return { type: "code", lang: "", code: "" };
    case "metric": return { type: "metric", items: [] };
  }
}

const blankMetricItem = { label: "", value: "" };

function renderBlock(
  block: BlogBlock,
  setBlock: (b: BlogBlock) => void,
): React.ReactNode {
  const typeSelect = (
    <Select
      label="Blok türü"
      value={block.type}
      onChange={(v) => setBlock(freshBlock(v as BlogBlock["type"]))}
      options={BLOCK_TYPE_OPTIONS}
    />
  );

  switch (block.type) {
    case "p":
    case "h2":
    case "quote":
      return (
        <div className="space-y-3">
          {typeSelect}
          <TextArea
            label="Metin"
            value={block.text}
            onChange={(v) => setBlock({ ...block, text: v })}
            rows={3}
          />
        </div>
      );
    case "list":
      return (
        <div className="space-y-3">
          {typeSelect}
          <StringList
            label="Öğeler"
            value={block.items}
            onChange={(v) => setBlock({ ...block, items: v })}
          />
        </div>
      );
    case "code":
      return (
        <div className="space-y-3">
          {typeSelect}
          <TextField
            label="Dil (boş = yok)"
            value={block.lang ?? ""}
            onChange={(v) => setBlock({ ...block, lang: v || undefined })}
          />
          <TextArea
            label="Kod"
            value={block.code}
            onChange={(v) => setBlock({ ...block, code: v })}
            rows={6}
          />
        </div>
      );
    case "metric":
      return (
        <div className="space-y-3">
          {typeSelect}
          <ListEditor<{ label: string; value: string }>
            label="Metrik öğeleri"
            value={block.items}
            onChange={(items) => setBlock({ ...block, items })}
            blank={blankMetricItem}
            render={(item, patch) => (
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Etiket" value={item.label} onChange={(v) => patch({ label: v })} />
                <TextField label="Değer" value={item.value} onChange={(v) => patch({ value: v })} />
              </div>
            )}
          />
        </div>
      );
  }
}

const blankBlock: BlogBlock = { type: "p", text: "" };
const blankPost: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  date: "",
  readTimeMin: 0,
  category: "Build Log",
  author: "",
  content: [],
};

export default function BlogEditor() {
  const posts = useSection<BlogPost[]>("blog");

  if (!posts) return <p className="text-neutral-500">Yükleniyor…</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Blog</h1>
      <SectionForm section="blog" initial={posts}>
        {(s, set) => (
          <ListEditor<BlogPost>
            label="Yazılar"
            value={s}
            onChange={set}
            blank={blankPost}
            render={(post, patch) => (
              <div className="space-y-3">
                <TextField label="Slug" value={post.slug} onChange={(v) => patch({ slug: v })} />
                <TextField label="Başlık" value={post.title} onChange={(v) => patch({ title: v })} />
                <TextField label="Tarih (YYYY-MM-DD)" value={post.date} onChange={(v) => patch({ date: v })} />
                <TextField label="Yazar" value={post.author} onChange={(v) => patch({ author: v })} />
                <TextField
                  label="Okuma süresi (dk)"
                  value={String(post.readTimeMin)}
                  onChange={(v) => {
                    const n = Number(v);
                    patch({ readTimeMin: isNaN(n) ? 0 : n });
                  }}
                />
                <Select
                  label="Kategori"
                  value={post.category}
                  onChange={(v) => patch({ category: v as BlogPost["category"] })}
                  options={CATEGORY_OPTIONS}
                />
                <TextArea label="Özet" value={post.excerpt} onChange={(v) => patch({ excerpt: v })} rows={2} />
                <div className="pl-2 border-l border-neutral-700">
                  <ListEditor<BlogBlock>
                    label="İçerik blokları"
                    value={post.content}
                    onChange={(content) => patch({ content })}
                    blank={blankBlock}
                    render={(block, _patchBlock) => {
                      // _patchBlock uses Partial<BlogBlock> but blocks are discriminated unions;
                      // we need full replacement — capture index via the onChange above instead.
                      // We use a local helper that calls onChange on the full content array.
                      // Because ListEditor gives us a patch(Partial<T>) callback, and BlogBlock
                      // is a discriminated union, we replace by spreading the whole block.
                      return renderBlock(block, (newBlock) => {
                        // Build a full replacement by spreading — TypeScript is happy because
                        // we only call patch with keys that exist on all union members.
                        // Safest: cast via unknown.
                        _patchBlock(newBlock as unknown as Partial<BlogBlock>);
                      });
                    }}
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
