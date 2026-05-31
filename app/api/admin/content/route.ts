import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin/guard";
import { getFile, putFile } from "@/lib/admin/github";
import { sectionSchemas, type Section } from "@/lib/admin/schema";

const SITE_PATH = "src/content/site.json";

export async function GET(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "auth" }, { status: 401 });
  const section = new URL(req.url).searchParams.get("section") as Section | null;
  const { text } = await getFile(SITE_PATH);
  const all = JSON.parse(text ?? "{}") as Record<string, unknown>;
  if (section) return NextResponse.json({ data: all[section] });
  return NextResponse.json({ data: all });
}

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "auth" }, { status: 401 });
  const { section, data } = (await req.json()) as { section: Section; data: unknown };
  const schema = sectionSchemas[section];
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
  // TODO(Phase 5): trigger EN translation here.
  return NextResponse.json({ ok: true });
}
