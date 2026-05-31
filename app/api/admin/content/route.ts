import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin/guard";
import { getFile, putFile } from "@/lib/admin/github";
import { sectionSchemas, blog as blogSchema, type Section } from "@/lib/admin/schema";

const SITE_PATH = "src/content/site.json";
const SITE_EN_PATH = "src/content/site.en.json";
const BLOG_PATH = "src/content/blog.json";

function sitePathFor(lang: string | null) {
  return lang === "en" ? SITE_EN_PATH : SITE_PATH;
}

export async function GET(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "auth" }, { status: 401 });
  const params = new URL(req.url).searchParams;
  const section = params.get("section") as Section | "blog" | null;
  const lang = params.get("lang");

  if (section === "blog") {
    const { text } = await getFile(BLOG_PATH);
    const parsed = JSON.parse(text ?? '{"posts":[]}') as { posts: unknown[] };
    return NextResponse.json({ data: parsed.posts });
  }

  const { text } = await getFile(sitePathFor(lang));
  const all = JSON.parse(text ?? "{}") as Record<string, unknown>;
  if (section) return NextResponse.json({ data: all[section] });
  return NextResponse.json({ data: all });
}

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "auth" }, { status: 401 });
  const { section, data, lang } = (await req.json()) as {
    section: Section | "blog";
    data: unknown;
    lang?: string;
  };

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
    return NextResponse.json({ ok: true });
  }

  const schema = sectionSchemas[section as Section];
  if (!schema) return NextResponse.json({ error: "bilinmeyen bölüm" }, { status: 400 });
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "geçersiz veri", issues: parsed.error.issues }, { status: 400 });
  }

  const isEn = lang === "en";
  const filePath = sitePathFor(lang ?? null);
  const { text, sha } = await getFile(filePath);
  const all = JSON.parse(text ?? "{}") as Record<string, unknown>;
  all[section] = parsed.data;
  const commitMsg = isEn
    ? `content(${section}, en): admin güncellemesi`
    : `content(${section}): admin güncellemesi`;
  try {
    await putFile(filePath, JSON.stringify(all, null, 2) + "\n", commitMsg, sha);
  } catch (e) {
    if ((e as Error).message === "CONFLICT") {
      return NextResponse.json(
        { error: "içerik değişti, sayfayı yenile" }, { status: 409 });
    }
    throw e;
  }
  return NextResponse.json({ ok: true });
}
