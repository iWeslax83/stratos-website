import { NextResponse } from "next/server";
import { signSession, SESSION_COOKIE, SESSION_TTL_MS } from "@/lib/admin/auth";

function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a), bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  const expected = process.env.ADMIN_PASSWORD;
  await new Promise((r) => setTimeout(r, 400)); // slow brute force
  if (!expected || !password || !timingSafeEqual(password, expected)) {
    return NextResponse.json({ error: "Hatalı şifre" }, { status: 401 });
  }
  const token = await signSession({ exp: Date.now() + SESSION_TTL_MS });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true, secure: true, sameSite: "strict",
    path: "/", maxAge: SESSION_TTL_MS / 1000,
  });
  return res;
}
