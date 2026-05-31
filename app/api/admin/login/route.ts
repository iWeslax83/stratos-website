import { timingSafeEqual as nodeTimingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { signSession, SESSION_COOKIE, SESSION_TTL_MS } from "@/lib/admin/auth";

function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  // Pad both to the same length so length never leaks via early return.
  const len = Math.max(ab.length, bb.length);
  const pa = new Uint8Array(len);
  const pb = new Uint8Array(len);
  pa.set(ab);
  pb.set(bb);
  const equal = nodeTimingSafeEqual(pa, pb);
  return equal && ab.length === bb.length;
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
