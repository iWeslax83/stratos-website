import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";

const resendKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.RESEND_FROM ?? "Stratos Web <onboarding@resend.dev>";
const toAddress = process.env.CONTACT_TO ?? site.contact.email;

// Bot guards: honeypot field must stay empty + form must be open at least 2.5s.
const HONEYPOT_FIELD = "website_url";
const MIN_ELAPSED_MS = 2_500;

interface SponsorPayload {
  kind: "sponsor";
  company: string;
  name: string;
  email: string;
  phone?: string;
  tier: string;
  message: string;
}

interface MembershipPayload {
  kind: "membership";
  name: string;
  grade: string;
  email: string;
  phone?: string;
  department: string;
  message: string;
}

type Payload = SponsorPayload | MembershipPayload;

function isString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isSpam(b: Record<string, unknown>): boolean {
  const honey = b[HONEYPOT_FIELD];
  if (typeof honey === "string" && honey.trim().length > 0) return true;
  const elapsed = b._elapsed;
  if (typeof elapsed === "number" && elapsed < MIN_ELAPSED_MS) return true;
  return false;
}

function validate(body: unknown): Payload | { error: string; spam?: boolean } {
  if (!body || typeof body !== "object") return { error: "Geçersiz istek." };
  const b = body as Record<string, unknown>;
  if (isSpam(b)) return { error: "Spam koruması tetiklendi.", spam: true };
  if (b.kind === "sponsor") {
    const required = ["company", "name", "email", "tier", "message"] as const;
    for (const k of required) if (!isString(b[k])) return { error: `Alan eksik: ${k}` };
    return {
      kind: "sponsor",
      company: String(b.company).trim(),
      name: String(b.name).trim(),
      email: String(b.email).trim(),
      phone: isString(b.phone) ? String(b.phone).trim() : undefined,
      tier: String(b.tier).trim(),
      message: String(b.message).trim(),
    };
  }
  if (b.kind === "membership") {
    const required = ["name", "grade", "email", "department", "message"] as const;
    for (const k of required) if (!isString(b[k])) return { error: `Alan eksik: ${k}` };
    return {
      kind: "membership",
      name: String(b.name).trim(),
      grade: String(b.grade).trim(),
      email: String(b.email).trim(),
      phone: isString(b.phone) ? String(b.phone).trim() : undefined,
      department: String(b.department).trim(),
      message: String(b.message).trim(),
    };
  }
  return { error: "Bilinmeyen form türü." };
}

function renderHtml(p: Payload) {
  if (p.kind === "sponsor") {
    return `
<h2>Yeni Sponsor Talebi</h2>
<table style="font-family:Inter,system-ui,sans-serif;font-size:14px">
  <tr><td><strong>Şirket</strong></td><td>${escapeHtml(p.company)}</td></tr>
  <tr><td><strong>İletişim</strong></td><td>${escapeHtml(p.name)}</td></tr>
  <tr><td><strong>E-posta</strong></td><td>${escapeHtml(p.email)}</td></tr>
  <tr><td><strong>Telefon</strong></td><td>${escapeHtml(p.phone ?? "—")}</td></tr>
  <tr><td><strong>Paket</strong></td><td>${escapeHtml(p.tier)}</td></tr>
</table>
<h3>Mesaj</h3>
<p>${escapeHtml(p.message).replace(/\n/g, "<br>")}</p>`;
  }
  return `
<h2>Yeni Üyelik Başvurusu</h2>
<table style="font-family:Inter,system-ui,sans-serif;font-size:14px">
  <tr><td><strong>Ad</strong></td><td>${escapeHtml(p.name)}</td></tr>
  <tr><td><strong>Sınıf</strong></td><td>${escapeHtml(p.grade)}</td></tr>
  <tr><td><strong>E-posta</strong></td><td>${escapeHtml(p.email)}</td></tr>
  <tr><td><strong>Telefon</strong></td><td>${escapeHtml(p.phone ?? "—")}</td></tr>
  <tr><td><strong>Departman</strong></td><td>${escapeHtml(p.department)}</td></tr>
</table>
<h3>Mesaj</h3>
<p>${escapeHtml(p.message).replace(/\n/g, "<br>")}</p>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const result = validate(json);
  if ("error" in result) {
    if (result.spam) {
      // Quietly accept so bots don't iterate based on response codes.
      console.warn("[contact] honeypot/timing rejected");
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (!resendKey) {
    // Dev fallback: don't expose missing key to clients in production; here it
    // logs server-side so the form still works for local development testing.
    console.warn("[contact] RESEND_API_KEY missing — skipping send, payload:", result);
    return NextResponse.json({ ok: true, dev: true });
  }

  const resend = new Resend(resendKey);
  const subject =
    result.kind === "sponsor"
      ? `Sponsor talebi — ${result.company}`
      : `Üyelik başvurusu — ${result.name}`;

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: result.email,
      subject,
      html: renderHtml(result),
    });
    if (error) {
      console.error("[contact] resend error", error, { from: fromAddress, to: toAddress });
      return NextResponse.json(
        {
          error: "Mail gönderilemedi.",
          detail: { name: error.name, message: error.message, from: fromAddress, to: toAddress },
        },
        { status: 502 },
      );
    }
    console.log("[contact] resend ok", data?.id);
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[contact] resend throw", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Beklenmeyen hata.", detail: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST /api/contact with form payload." });
}
