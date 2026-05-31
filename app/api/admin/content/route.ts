import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin/guard";
import { getFile, putFile } from "@/lib/admin/github";
import { sectionSchemas, blog as blogSchema, type Section } from "@/lib/admin/schema";

const SITE_PATH = "src/content/site.json";
const BLOG_PATH = "src/content/blog.json";

export async function GET(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "auth" }, { status: 401 });
  const section = new URL(req.url).searchParams.get("section") as Section | "blog" | null;

  if (section === "blog") {
    const { text } = await getFile(BLOG_PATH);
    const parsed = JSON.parse(text ?? '{"posts":[]}') as { posts: unknown[] };
    return NextResponse.json({ data: parsed.posts });
  }

  const { text } = await getFile(SITE_PATH);
  const all = JSON.parse(text ?? "{}") as Record<string, unknown>;
  if (section) return NextResponse.json({ data: all[section] });
  return NextResponse.json({ data: all });
}

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "auth" }, { status: 401 });
  const { section, data } = (await req.json()) as { section: Section | "blog"; data: unknown };

  if (section === "blog") {
    const parsed = blogSchema.safeParse({ posts: data });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "geçersiz veri", issues: parsed.error.issues }, { status: 400 });
    }
    const { sha } = await getFile(BLOG_PATH);
    try {
      await putFile(BLOG_PATH, JSON.stringify(parsed.data, null, 2) + "\n",
        `content(blog): admin güncellemesi`, sha);
    } catch (e) {
      if ((e as Error).message === "CONFLICT") {
        return NextResponse.json(
          { error: "içerik değişti, sayfayı yenile" }, { status: 409 });
      }
      throw e;
    }
    // TODO(Phase 5): trigger EN translation here.
    return NextResponse.json({ ok: true });
  }

  const schema = sectionSchemas[section as Section];
  if (!schema) return NextResponse.json({ error: "bilinmeyen bölüm" }, { status: 400 });
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "geçersiz veri", issues: parsed.error.issues }, { status: 400 });
  }
  const { text, sha } = await getFile(SITE_PATH);
  const all = JSON.parse(text ?? "{}") as Record<string, unknown>;
  all[section] = parsed.data;
  try {
    await putFile(SITE_PATH, JSON.stringify(all, null, 2) + "\n",
      `content(${section}): admin güncellemesi`, sha);
  } catch (e) {
    if ((e as Error).message === "CONFLICT") {
      return NextResponse.json(
        { error: "içerik değişti, sayfayı yenile" }, { status: 409 });
    }
    throw e;
  }
  // --- EN translation (best-effort) ---
  try {
    const enPath = "src/content/site.en.json";
    const en = await getFile(enPath);
    const enAll = JSON.parse(en.text ?? "{}") as Record<string, unknown>;
    const { extractStrings, applyStrings } = await import("@/lib/admin/translatable");
    const { translateMap } = await import("@/lib/admin/gemini");
    const strings = extractStrings(section as Section, parsed.data);
    const translated = await translateMap(strings);
    enAll[section] = applyStrings(section as Section, parsed.data, translated);
    await putFile(enPath, JSON.stringify(enAll, null, 2) + "\n",
      `content(${section}): EN çeviri`, en.sha);
    return NextResponse.json({ ok: true, en: true });
  } catch (e) {
    return NextResponse.json({ ok: true, en: false, enError: (e as Error).message });
  }
}
