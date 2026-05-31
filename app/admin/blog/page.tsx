"use client";
import { useSection } from "@/components/admin/use-section";
import { useAdminLang } from "@/components/admin/lang-context";
import { SectionForm } from "@/components/admin/section-form";
import { TextField, TextArea, Select, StringList, ListEditor } from "@/components/admin/fields";
import type { BlogPost, BlogBlock } from "@/data/types";

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
    case "code": return { type: "code", code: "" };
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
  const { lang } = useAdminLang();
  const posts = useSection<BlogPost[]>("blog", "tr");

  if (lang === "en") {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-sm text-neutral-500 text-center">
          Blog yalnızca Türkçe düzenlenir. Düzenlemek için yukarıdan TR&apos;ye geç.
        </p>
      </div>
    );
  }

  if (!posts) return <p className="text-neutral-500">Yükleniyor…</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Blog</h1>
      <SectionForm key="blog" section="blog" initial={posts} lang="tr">
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
                      return renderBlock(block, (newBlock) => {
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
