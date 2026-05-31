import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin/guard";
import { putBinary } from "@/lib/admin/github";

const ALLOWED: Record<string, string> = {
  "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/svg+xml": "svg",
};
const MAX = 5 * 1024 * 1024;

function slugify(s: string): string {
  return s.toLowerCase().normalize("NFKD").replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "file";
}

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "auth" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file") as File | null;
  const category = slugify(String(form.get("category") ?? "misc"));
  if (!file) return NextResponse.json({ error: "dosya yok" }, { status: 400 });
  const ext = ALLOWED[file.type];
  if (!ext) return NextResponse.json({ error: "desteklenmeyen tip" }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "dosya 5MB'tan büyük" }, { status: 400 });

  const buf = new Uint8Array(await file.arrayBuffer());
  let bin = ""; for (const b of buf) bin += String.fromCharCode(b);
  const base64 = btoa(bin);

  const name = `${slugify(file.name.replace(/\.[^.]+$/, ""))}-${buf.length}`;
  const path = `public/images/${category}/${name}.${ext}`;
  await putBinary(path, base64, `media: ${path} yüklendi`);
  return NextResponse.json({ path: `/images/${category}/${name}.${ext}` });
}
