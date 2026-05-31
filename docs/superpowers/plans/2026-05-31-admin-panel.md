# Stratos Admin Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A password-protected `/admin` panel that lets the team edit all site content (and upload images), committing changes to GitHub via the Contents API, with editable data auto-translated TR→EN via Gemini.

**Architecture:** Content moves from TS consts into JSON files (`src/content/*.json`) read by thin typed loaders. The admin app reads/writes that JSON live through GitHub's REST Contents API (server-side, token never reaches the browser). Auth is a single shared password backed by an HMAC-signed session cookie (Web Crypto, no deps). On save, the edited section is validated with zod, committed, then its translatable fields are sent to Gemini and `site.en.json` is committed.

**Tech Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · zod · Vitest (new) · GitHub REST Contents API (fetch) · Gemini Generative Language API (fetch) · Web Crypto HMAC.

**Phasing:** Phase 0 (foundation) → 1 (auth) → 2 (GitHub client + content API + first editor end-to-end) → 3 (remaining editors) → 4 (image upload) → 5 (Gemini + EN refactor). Each phase leaves the app building and deployable.

**Env vars (already set on Vercel):** `GITHUB_TOKEN`, `ADMIN_PASSWORD`, `GITHUB_REPO=iWeslax83/iha-website`, `GITHUB_BRANCH=main`, `SESSION_SECRET`, `GEMINI_API_KEY`. Add them to `.env.local` for local dev (point `GITHUB_BRANCH` to a scratch branch locally to avoid committing to `main`).

---

## Phase 0 — Test infra + content refactor

### Task 0.1: Add Vitest

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install Vitest**

Run: `npm i -D vitest @vitejs/plugin-react vite-tsconfig-paths`
Expected: packages added to devDependencies.

- [ ] **Step 2: Add test script** to `package.json` `scripts`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
```

- [ ] **Step 4: Sanity test.** Create `src/lib/admin/sanity.test.ts`:

```ts
import { test, expect } from "vitest";
test("vitest runs", () => { expect(1 + 1).toBe(2); });
```

Run: `npm test`
Expected: 1 passed. Then delete `src/lib/admin/sanity.test.ts`.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "test: add vitest"
```

---

### Task 0.2: Extract content to JSON

**Files:**
- Create: `scripts/extract-content.ts`
- Create: `src/content/site.json`, `src/content/blog.json`

- [ ] **Step 1: Install tsx**

Run: `npm i -D tsx`

- [ ] **Step 2: Create `scripts/extract-content.ts`**

```ts
import { writeFileSync, mkdirSync } from "node:fs";
import { site } from "../src/data/site";
import { posts } from "../src/data/blog";

mkdirSync("src/content", { recursive: true });

// nav stays in code (structural) — strip it from the editable content.
const { nav: _nav, ...content } = site;

writeFileSync("src/content/site.json", JSON.stringify(content, null, 2) + "\n");
writeFileSync("src/content/blog.json", JSON.stringify({ posts }, null, 2) + "\n");
console.log("wrote src/content/site.json and src/content/blog.json");
```

- [ ] **Step 3: Run it**

Run: `npx tsx scripts/extract-content.ts`
Expected: both files written. `JSON.stringify` drops the `as const` / `as string | null` casts automatically, producing plain JSON. `null` values are preserved.

- [ ] **Step 4: Verify valid JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/content/site.json','utf8')); JSON.parse(require('fs').readFileSync('src/content/blog.json','utf8')); console.log('valid')"`
Expected: `valid`.

- [ ] **Step 5: Commit**

```bash
git add scripts/extract-content.ts src/content/site.json src/content/blog.json
git commit -m "chore(content): extract site/blog data to JSON"
```

---

### Task 0.3: Explicit types + JSON-backed loaders

**Files:**
- Create: `src/data/types.ts`
- Modify: `src/data/site.ts`, `src/data/blog.ts`
- Modify: `tsconfig.json` (ensure `resolveJsonModule`)

- [ ] **Step 1: Ensure JSON imports allowed.** Confirm `tsconfig.json` `compilerOptions` has `"resolveJsonModule": true` and `"esModuleInterop": true`. Add `"resolveJsonModule": true` if missing.

Run: `grep resolveJsonModule tsconfig.json || echo MISSING`

- [ ] **Step 2: Create `src/data/types.ts`** — explicit interfaces matching the JSON exactly:

```ts
export interface Brand {
  name: string; descriptor: string; descriptorShort: string;
  school: string; city: string; tagline: string; longTagline: string;
}
export interface Contact {
  email: string; phone: string; phoneHref: string; address: string;
}
export interface Season {
  label: string; competition: string; competitionDate: string;
  sponsorshipDeadline: string; currentPhase: string; nextMilestone: string;
}
export interface Social {
  instagram: string | null; linkedin: string | null; youtube: string | null;
}
export interface NavItem { href: string; label: string; }

export interface Achievement {
  id: string; title: string; year: string; category: string; blurb: string;
}
export interface Spec { value: string; unit: string; label: string; }
export interface Project {
  slug: string; title: string; competition: string; year: string;
  summary: string; highlights: string[]; tech: string[];
  image: string | null; specs: Spec[];
}
export interface Member {
  name: string; role: string; department: string; captain: boolean;
  photo?: string | null;
}
export interface Advisor { name: string; role: string; photo: string | null; }
export interface Department { id: string; name: string; blurb: string; }
export interface Team {
  advisor: Advisor; members: Member[]; departments: Department[];
}
export interface Tier {
  id: string; name: string; amount: string; benefits: string[];
}
export interface Sponsor {
  name: string; logo: string; url: string | null; tier: string;
}
export interface Sponsorship {
  intro: string; tiers: Tier[]; sponsors: Sponsor[];
}
export interface OutreachItem {
  slug: string; title: string; period: string; blurb: string;
  stat?: string; statLabel?: string; image?: string | null;
}
export interface Media { revealBand: string | null; }

/** Editable content (everything in site.json — i.e. site minus nav). */
export interface SiteContent {
  brand: Brand; contact: Contact; season: Season; social: Social;
  achievements: Achievement[]; projects: Project[]; team: Team;
  sponsorship: Sponsorship; outreach: OutreachItem[]; media: Media;
}
/** Full runtime site object (content + code-owned nav). */
export interface Site extends SiteContent { nav: NavItem[]; }

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; lang?: string; code: string }
  | { type: "quote"; text: string }
  | { type: "metric"; items: { label: string; value: string }[] };
export interface BlogPost {
  slug: string; title: string; excerpt: string; date: string;
  readTimeMin: number;
  category: "Build Log" | "Donanım" | "Yazılım" | "Saha" | "Takım";
  author: string; content: BlogBlock[];
}
```

- [ ] **Step 3: Rewrite `src/data/site.ts`**

```ts
// Single source of truth for site content. Editable content lives in
// src/content/site.json (managed by /admin). nav stays here (structural).
import content from "@/content/site.json";
import type {
  Site, SiteContent, Project, Member, Department, Achievement, Tier, Sponsor,
  OutreachItem,
} from "./types";

const nav = [
  { href: "/", label: "Anasayfa" },
  { href: "/projeler", label: "Projeler" },
  { href: "/takim", label: "Takım" },
  { href: "/basarilar", label: "Başarılar" },
  { href: "/galeri", label: "Galeri" },
  { href: "/topluluk", label: "Topluluk" },
  { href: "/blog", label: "Blog" },
  { href: "/sponsorlar", label: "Sponsorlar" },
  { href: "/iletisim", label: "İletişim" },
];

export const site: Site = { ...(content as SiteContent), nav };

export type {
  Site, SiteContent, Project, Member, Department, Achievement, Tier, Sponsor,
  OutreachItem,
} from "./types";
```

- [ ] **Step 4: Rewrite `src/data/blog.ts`**

```ts
import data from "@/content/blog.json";
import type { BlogPost, BlogBlock } from "./types";

export const posts = (data as { posts: BlogPost[] }).posts;
export type { BlogPost, BlogBlock } from "./types";
```

- [ ] **Step 5: Verify the whole site still typechecks and builds identically**

Run: `npm run typecheck && npm run build`
Expected: no type errors; build succeeds. (This proves the JSON + explicit types match every consumer.) If `tech`/literal-narrowing type errors appear in consumers, they were relying on `as const` literals — widen the consumer or adjust the type; note and fix.

- [ ] **Step 6: Commit**

```bash
git add tsconfig.json src/data/types.ts src/data/site.ts src/data/blog.ts
git commit -m "refactor(data): back site/blog content with JSON + explicit types"
```

---

## Phase 1 — Auth

### Task 1.1: Session sign/verify (HMAC, Web Crypto)

**Files:**
- Create: `src/lib/admin/auth.ts`
- Test: `src/lib/admin/auth.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { test, expect, beforeAll } from "vitest";
import { signSession, verifySession } from "./auth";

beforeAll(() => { process.env.SESSION_SECRET = "test-secret-test-secret-32chars!!"; });

test("round-trips a valid session", async () => {
  const token = await signSession({ exp: Date.now() + 10_000 });
  expect(await verifySession(token)).toBe(true);
});
test("rejects tampered token", async () => {
  const token = await signSession({ exp: Date.now() + 10_000 });
  expect(await verifySession(token.slice(0, -2) + "xx")).toBe(false);
});
test("rejects expired token", async () => {
  const token = await signSession({ exp: Date.now() - 1 });
  expect(await verifySession(token)).toBe(false);
});
test("rejects garbage", async () => {
  expect(await verifySession("not.a.token")).toBe(false);
  expect(await verifySession("")).toBe(false);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- auth`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/lib/admin/auth.ts`**

```ts
// HMAC-signed session payloads using Web Crypto (works on Edge + Node).
const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (const b of arr) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64url(s: string): Uint8Array {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4 ? 4 - (s.length % 4) : 0;
  const bin = atob(s + "=".repeat(pad));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}
async function key(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET not set");
  return crypto.subtle.importKey(
    "raw", enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"],
  );
}

export interface SessionPayload { exp: number; }

export async function signSession(payload: SessionPayload): Promise<string> {
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign("HMAC", await key(), enc.encode(body));
  return `${body}.${b64url(sig)}`;
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token || !token.includes(".")) return false;
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;
  try {
    const ok = await crypto.subtle.verify(
      "HMAC", await key(), fromB64url(sig), enc.encode(body),
    );
    if (!ok) return false;
    const payload = JSON.parse(new TextDecoder().decode(fromB64url(body))) as SessionPayload;
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch { return false; }
}

export const SESSION_COOKIE = "stratos_admin";
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- auth`
Expected: 4 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/admin/auth.ts src/lib/admin/auth.test.ts
git commit -m "feat(admin): HMAC session sign/verify"
```

---

### Task 1.2: Login / logout routes

**Files:**
- Create: `app/api/admin/login/route.ts`, `app/api/admin/logout/route.ts`

- [ ] **Step 1: Implement `app/api/admin/login/route.ts`**

```ts
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
```

- [ ] **Step 2: Implement `app/api/admin/logout/route.ts`**

```ts
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/admin/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: routes compile.

- [ ] **Step 4: Commit**

```bash
git add app/api/admin/login/route.ts app/api/admin/logout/route.ts
git commit -m "feat(admin): login/logout routes"
```

---

### Task 1.3: Middleware guard + helper for API routes

**Files:**
- Create: `middleware.ts` (repo root)
- Create: `src/lib/admin/guard.ts`

- [ ] **Step 1: Implement `middleware.ts`**

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/admin/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySession(token)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/admin/:path*"] };
```

Note: middleware guards admin *pages*. API routes are guarded server-side (next step) — defense in depth.

- [ ] **Step 2: Implement `src/lib/admin/guard.ts`**

```ts
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "./auth";

/** Returns true if the current request has a valid admin session. */
export async function isAuthed(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySession(token);
}
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add middleware.ts src/lib/admin/guard.ts
git commit -m "feat(admin): middleware guard + isAuthed helper"
```

---

### Task 1.4: Login page

**Files:**
- Create: `app/admin/login/page.tsx`

- [ ] **Step 1: Implement `app/admin/login/page.tsx`**

```tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) router.push("/admin");
    else setError("Hatalı şifre");
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-neutral-950 p-6 text-neutral-100">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold">Stratos Admin</h1>
        <input
          type="password" value={password} autoFocus
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre"
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          disabled={loading}
          className="w-full rounded-lg bg-sky-600 px-4 py-3 font-semibold disabled:opacity-50"
        >
          {loading ? "..." : "Giriş"}
        </button>
      </form>
    </main>
  );
}
```

- [ ] **Step 2: Manual test**

Run `npm run dev`, open `http://localhost:3000/admin` → should redirect to `/admin/login`. Enter wrong password → "Hatalı şifre". Enter `ADMIN_PASSWORD` from `.env.local` → redirects to `/admin` (will 404 until Task 2.4; that's expected).

- [ ] **Step 3: Commit**

```bash
git add app/admin/login/page.tsx
git commit -m "feat(admin): login page"
```

---

## Phase 2 — GitHub client + content API + first editor (vertical slice)

### Task 2.1: GitHub Contents client

**Files:**
- Create: `src/lib/admin/github.ts`
- Test: `src/lib/admin/github.test.ts`

- [ ] **Step 1: Write the failing test** (mock `fetch`):

```ts
import { test, expect, vi, beforeEach } from "vitest";
import { getFile, putFile } from "./github";

beforeEach(() => {
  process.env.GITHUB_TOKEN = "tok";
  process.env.GITHUB_REPO = "owner/repo";
  process.env.GITHUB_BRANCH = "main";
});

test("getFile decodes base64 content + returns sha", async () => {
  const content = btoa(unescape(encodeURIComponent('{"a":1}')));
  vi.stubGlobal("fetch", vi.fn(async () =>
    new Response(JSON.stringify({ content, sha: "abc" }), { status: 200 })));
  const r = await getFile("src/content/site.json");
  expect(r).toEqual({ text: '{"a":1}', sha: "abc" });
});

test("getFile returns null sha on 404", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 404 })));
  expect(await getFile("missing.json")).toEqual({ text: null, sha: null });
});

test("putFile sends base64 + sha + branch", async () => {
  const spy = vi.fn(async () => new Response(JSON.stringify({ commit: { sha: "x" } }), { status: 200 }));
  vi.stubGlobal("fetch", spy);
  await putFile("p.json", "hello", "Stratos", "prevsha");
  const [, init] = spy.mock.calls[0];
  const body = JSON.parse(init.body);
  expect(decodeURIComponent(escape(atob(body.content)))).toBe("hello");
  expect(body.sha).toBe("prevsha");
  expect(body.branch).toBe("main");
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- github`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/lib/admin/github.ts`**

```ts
const API = "https://api.github.com";

function cfg() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !repo) throw new Error("GITHUB_TOKEN / GITHUB_REPO not set");
  return { token, repo, branch };
}
function headers(token: string) {
  return {
    authorization: `Bearer ${token}`,
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
  };
}
function encodeUtf8B64(s: string): string {
  return btoa(unescape(encodeURIComponent(s)));
}
function decodeUtf8B64(s: string): string {
  return decodeURIComponent(escape(atob(s.replace(/\n/g, ""))));
}

export interface FileRead { text: string | null; sha: string | null; }

export async function getFile(path: string): Promise<FileRead> {
  const { token, repo, branch } = cfg();
  const res = await fetch(
    `${API}/repos/${repo}/contents/${path}?ref=${branch}`,
    { headers: headers(token), cache: "no-store" },
  );
  if (res.status === 404) return { text: null, sha: null };
  if (!res.ok) throw new Error(`GitHub getFile ${res.status}`);
  const json = (await res.json()) as { content: string; sha: string };
  return { text: decodeUtf8B64(json.content), sha: json.sha };
}

/** Commit a text file. `sha` is the previous blob sha (omit for new files). */
export async function putFile(
  path: string, text: string, message: string, sha: string | null,
): Promise<void> {
  const { token, repo, branch } = cfg();
  const res = await fetch(`${API}/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { ...headers(token), "content-type": "application/json" },
    body: JSON.stringify({
      message, branch, content: encodeUtf8B64(text), ...(sha ? { sha } : {}),
    }),
  });
  if (res.status === 409) throw new Error("CONFLICT");
  if (!res.ok) throw new Error(`GitHub putFile ${res.status}: ${await res.text()}`);
}

/** Commit a binary file from a base64 string (already base64). */
export async function putBinary(
  path: string, base64: string, message: string,
): Promise<void> {
  const { token, repo, branch } = cfg();
  const existing = await getFile(path).catch(() => ({ sha: null }));
  const res = await fetch(`${API}/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { ...headers(token), "content-type": "application/json" },
    body: JSON.stringify({
      message, branch, content: base64, ...(existing.sha ? { sha: existing.sha } : {}),
    }),
  });
  if (!res.ok) throw new Error(`GitHub putBinary ${res.status}: ${await res.text()}`);
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- github`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/admin/github.ts src/lib/admin/github.test.ts
git commit -m "feat(admin): github contents client"
```

---

### Task 2.2: Zod schema for site content

**Files:**
- Create: `src/lib/admin/schema.ts`
- Test: `src/lib/admin/schema.test.ts`

- [ ] **Step 1: Install zod**

Run: `npm i zod`

- [ ] **Step 2: Write the failing test**

```ts
import { test, expect } from "vitest";
import { sectionSchemas, SECTIONS } from "./schema";
import siteContent from "@/content/site.json";

test("every section in SECTIONS has a schema", () => {
  for (const s of SECTIONS) expect(sectionSchemas[s]).toBeDefined();
});

test("current site.json validates against its section schemas", () => {
  for (const s of SECTIONS) {
    const data = (siteContent as Record<string, unknown>)[s];
    const r = sectionSchemas[s].safeParse(data);
    expect(r.success, `${s}: ${r.success ? "" : JSON.stringify(r.error.issues)}`).toBe(true);
  }
});

test("rejects a malformed sponsor", () => {
  const r = sectionSchemas.sponsorship.safeParse({ intro: "x", tiers: [], sponsors: [{ name: 1 }] });
  expect(r.success).toBe(false);
});
```

- [ ] **Step 3: Run to verify it fails**

Run: `npm test -- schema`
Expected: FAIL (module not found).

- [ ] **Step 4: Implement `src/lib/admin/schema.ts`** — zod schemas mirroring `types.ts`:

```ts
import { z } from "zod";

const nullableStr = z.string().nullable();

export const brand = z.object({
  name: z.string(), descriptor: z.string(), descriptorShort: z.string(),
  school: z.string(), city: z.string(), tagline: z.string(), longTagline: z.string(),
});
export const contact = z.object({
  email: z.string(), phone: z.string(), phoneHref: z.string(), address: z.string(),
});
export const season = z.object({
  label: z.string(), competition: z.string(), competitionDate: z.string(),
  sponsorshipDeadline: z.string(), currentPhase: z.string(), nextMilestone: z.string(),
});
export const social = z.object({
  instagram: nullableStr, linkedin: nullableStr, youtube: nullableStr,
});
export const achievements = z.array(z.object({
  id: z.string(), title: z.string(), year: z.string(), category: z.string(), blurb: z.string(),
}));
export const projects = z.array(z.object({
  slug: z.string(), title: z.string(), competition: z.string(), year: z.string(),
  summary: z.string(), highlights: z.array(z.string()), tech: z.array(z.string()),
  image: nullableStr,
  specs: z.array(z.object({ value: z.string(), unit: z.string(), label: z.string() })),
}));
export const team = z.object({
  advisor: z.object({ name: z.string(), role: z.string(), photo: nullableStr }),
  members: z.array(z.object({
    name: z.string(), role: z.string(), department: z.string(),
    captain: z.boolean(), photo: nullableStr.optional(),
  })),
  departments: z.array(z.object({ id: z.string(), name: z.string(), blurb: z.string() })),
});
export const sponsorship = z.object({
  intro: z.string(),
  tiers: z.array(z.object({
    id: z.string(), name: z.string(), amount: z.string(), benefits: z.array(z.string()),
  })),
  sponsors: z.array(z.object({
    name: z.string(), logo: z.string(), url: nullableStr, tier: z.string(),
  })),
});
export const outreach = z.array(z.object({
  slug: z.string(), title: z.string(), period: z.string(), blurb: z.string(),
  stat: z.string().optional(), statLabel: z.string().optional(), image: nullableStr.optional(),
}));
export const media = z.object({ revealBand: nullableStr });

const blogBlock = z.union([
  z.object({ type: z.literal("p"), text: z.string() }),
  z.object({ type: z.literal("h2"), text: z.string() }),
  z.object({ type: z.literal("list"), items: z.array(z.string()) }),
  z.object({ type: z.literal("code"), lang: z.string().optional(), code: z.string() }),
  z.object({ type: z.literal("quote"), text: z.string() }),
  z.object({ type: z.literal("metric"), items: z.array(z.object({ label: z.string(), value: z.string() })) }),
]);
export const blog = z.object({ posts: z.array(z.object({
  slug: z.string(), title: z.string(), excerpt: z.string(), date: z.string(),
  readTimeMin: z.number(),
  category: z.enum(["Build Log", "Donanım", "Yazılım", "Saha", "Takım"]),
  author: z.string(), content: z.array(blogBlock),
})) });

export const sectionSchemas = {
  brand, contact, season, social, achievements, projects, team, sponsorship, outreach, media,
} as const;

export type Section = keyof typeof sectionSchemas;
export const SECTIONS = Object.keys(sectionSchemas) as Section[];
```

- [ ] **Step 5: Run to verify it passes**

Run: `npm test -- schema`
Expected: 3 passed. (If the parity test fails, the schema diverges from the real JSON — fix the schema to match.)

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/lib/admin/schema.ts src/lib/admin/schema.test.ts
git commit -m "feat(admin): zod section schemas"
```

---

### Task 2.3: Content GET/POST API

**Files:**
- Create: `app/api/admin/content/route.ts`

**Note:** Translation (Phase 5) is wired in later. For now POST commits TR only.

- [ ] **Step 1: Implement `app/api/admin/content/route.ts`**

```ts
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
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add app/api/admin/content/route.ts
git commit -m "feat(admin): content read/write API"
```

---

### Task 2.4: Admin shell + dashboard + reusable form primitives

**Files:**
- Create: `app/admin/layout.tsx`, `app/admin/page.tsx`
- Create: `src/components/admin/fields.tsx`, `src/components/admin/section-form.tsx`

- [ ] **Step 1: Create `app/admin/layout.tsx`**

```tsx
import Link from "next/link";

export const metadata = { title: "Admin · Stratos", robots: { index: false, follow: false } };

const SECTIONS: { slug: string; label: string }[] = [
  { slug: "genel", label: "Genel" },
  { slug: "takim", label: "Takım" },
  { slug: "sponsorlar", label: "Sponsorlar" },
  { slug: "basarilar", label: "Başarılar" },
  { slug: "topluluk", label: "Topluluk" },
  { slug: "projeler", label: "Projeler" },
  { slug: "blog", label: "Blog" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-100">
      <header className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
        <Link href="/admin" className="font-bold">Stratos Admin</Link>
        <nav className="flex flex-wrap gap-3 text-sm">
          {SECTIONS.map((s) => (
            <Link key={s.slug} href={`/admin/${s.slug}`} className="text-neutral-400 hover:text-neutral-100">
              {s.label}
            </Link>
          ))}
          <form action="/api/admin/logout" method="post">
            <button className="text-neutral-500 hover:text-red-400">Çıkış</button>
          </form>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
    </div>
  );
}
```

Note: the logout `<form method="post">` posts to the route; after it returns, redirect client-side is unnecessary because middleware will bounce the next `/admin` navigation to login. (Optional polish: make logout a client button that `fetch`es then `router.push("/admin/login")`.)

- [ ] **Step 2: Create `app/admin/page.tsx`** (dashboard):

```tsx
import Link from "next/link";

const CARDS = [
  { slug: "genel", label: "Genel", desc: "Marka, iletişim, sezon, sosyal, medya" },
  { slug: "takim", label: "Takım", desc: "Üyeler, departmanlar, danışman" },
  { slug: "sponsorlar", label: "Sponsorlar", desc: "Sponsorlar ve tier'lar" },
  { slug: "basarilar", label: "Başarılar", desc: "Ödüller ve dereceler" },
  { slug: "topluluk", label: "Topluluk", desc: "Etkinlikler" },
  { slug: "projeler", label: "Projeler", desc: "İHA'lar, specs, görseller" },
  { slug: "blog", label: "Blog", desc: "Yazılar" },
];

export default function AdminDashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CARDS.map((c) => (
        <Link key={c.slug} href={`/admin/${c.slug}`}
          className="rounded-xl border border-neutral-800 p-5 hover:border-sky-600">
          <p className="font-semibold">{c.label}</p>
          <p className="mt-1 text-sm text-neutral-400">{c.desc}</p>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/admin/fields.tsx`** (reusable inputs):

```tsx
"use client";
import { useState } from "react";

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
```

- [ ] **Step 4: Create `src/components/admin/section-form.tsx`** (save wrapper used by every editor):

```tsx
"use client";
import { useState } from "react";

export function SectionForm<T>({ section, initial, children }: {
  section: string; initial: T;
  children: (state: T, set: (v: T) => void) => React.ReactNode;
}) {
  const [state, setState] = useState<T>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function save() {
    setStatus("saving"); setMsg("");
    const res = await fetch("/api/admin/content", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ section, data: state }),
    });
    if (res.ok) { setStatus("ok"); setMsg("Kaydedildi — ~1-2 dk içinde yayında."); }
    else {
      const j = await res.json().catch(() => ({}));
      setStatus("err"); setMsg(j.error ?? "Hata");
    }
  }

  return (
    <div className="space-y-6">
      {children(state, setState)}
      <div className="sticky bottom-0 flex items-center gap-4 border-t border-neutral-800 bg-neutral-950 py-4">
        <button onClick={save} disabled={status === "saving"}
          className="rounded-lg bg-sky-600 px-5 py-2.5 font-semibold disabled:opacity-50">
          {status === "saving" ? "Kaydediliyor..." : "Kaydet"}
        </button>
        {msg && <span className={status === "err" ? "text-red-400" : "text-green-400"}>{msg}</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Build check**

Run: `npm run build`
Expected: success.

- [ ] **Step 6: Commit**

```bash
git add app/admin/layout.tsx app/admin/page.tsx src/components/admin/
git commit -m "feat(admin): shell, dashboard, form primitives"
```

---

### Task 2.5: "Genel" editor (vertical slice — proves end-to-end)

**Files:**
- Create: `app/admin/genel/page.tsx`

This page edits four sections (brand, contact, season, social) plus media. Because the API saves one section per POST, this editor saves each independently using one `SectionForm` per section. (Simplest: separate save buttons per block.)

- [ ] **Step 1: Implement `app/admin/genel/page.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import { SectionForm } from "@/components/admin/section-form";
import { TextField } from "@/components/admin/fields";
import type { Brand, Contact, Season, Social } from "@/data/types";

function useSection<T>(section: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    fetch(`/api/admin/content?section=${section}`)
      .then((r) => r.json()).then((j) => setData(j.data));
  }, [section]);
  return data;
}

export default function GenelEditor() {
  const brand = useSection<Brand>("brand");
  const contact = useSection<Contact>("contact");
  const social = useSection<Social>("social");

  if (!brand || !contact || !social) return <p className="text-neutral-500">Yükleniyor…</p>;

  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-4 text-lg font-bold">Marka</h2>
        <SectionForm section="brand" initial={brand}>
          {(s, set) => (
            <div className="space-y-3">
              <TextField label="Ad" value={s.name} onChange={(v) => set({ ...s, name: v })} />
              <TextField label="Tanım" value={s.descriptor} onChange={(v) => set({ ...s, descriptor: v })} />
              <TextField label="Tagline" value={s.tagline} onChange={(v) => set({ ...s, tagline: v })} />
              <TextField label="Uzun tagline" value={s.longTagline} onChange={(v) => set({ ...s, longTagline: v })} />
              <TextField label="Okul" value={s.school} onChange={(v) => set({ ...s, school: v })} />
              <TextField label="Şehir" value={s.city} onChange={(v) => set({ ...s, city: v })} />
            </div>
          )}
        </SectionForm>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">İletişim</h2>
        <SectionForm section="contact" initial={contact}>
          {(s, set) => (
            <div className="space-y-3">
              <TextField label="E-posta" value={s.email} onChange={(v) => set({ ...s, email: v })} />
              <TextField label="Telefon" value={s.phone} onChange={(v) => set({ ...s, phone: v })} />
              <TextField label="Telefon href" value={s.phoneHref} onChange={(v) => set({ ...s, phoneHref: v })} />
              <TextField label="Adres" value={s.address} onChange={(v) => set({ ...s, address: v })} />
            </div>
          )}
        </SectionForm>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">Sosyal Medya</h2>
        <SectionForm section="social" initial={social}>
          {(s, set) => (
            <div className="space-y-3">
              <TextField label="Instagram (boş = yok)" value={s.instagram ?? ""} onChange={(v) => set({ ...s, instagram: v || null })} />
              <TextField label="LinkedIn" value={s.linkedin ?? ""} onChange={(v) => set({ ...s, linkedin: v || null })} />
              <TextField label="YouTube" value={s.youtube ?? ""} onChange={(v) => set({ ...s, youtube: v || null })} />
            </div>
          )}
        </SectionForm>
      </section>
    </div>
  );
}
```

(Season + media blocks follow the identical pattern — add a `season` SectionForm with the 6 season fields and a `media` one with `revealBand`. Use the same `TextField` composition.)

- [ ] **Step 2: End-to-end manual test (against the scratch branch)**

In `.env.local` set `GITHUB_BRANCH` to a throwaway branch (create it: `git push origin feat/admin-panel:admin-scratch`). Run `npm run dev`, log in, open `/admin/genel`, change the tagline, Save → expect "Kaydedildi". Verify on GitHub that `src/content/site.json` got a commit on `admin-scratch`. Revert the test commit afterward.

- [ ] **Step 3: Commit**

```bash
git add app/admin/genel/page.tsx
git commit -m "feat(admin): Genel editor (brand/contact/season/social/media)"
```

---

## Phase 3 — Remaining editors

Each editor follows the Task 2.5 pattern: fetch the section via `useSection`, wrap in `SectionForm`, compose `fields.tsx` primitives. Field specs below are exact — implement one page per section.

### Task 3.1: Takım editor — `app/admin/takim/page.tsx`
- `team` section. Blocks: **advisor** (`TextField` name, role, photo), **members** (`ListEditor<Member>`, blank `{name:"",role:"",department:"",captain:false,photo:null}`; per row: name, role, department `TextField`s + captain checkbox), **departments** (`ListEditor<Department>`, blank `{id:"",name:"",blurb:""}`; per row: id, name `TextField` + blurb `TextArea`). One `SectionForm section="team"` holding the whole `team` object.

- [ ] Implement, manual-test save, commit `feat(admin): Takım editor`.

### Task 3.2: Sponsorlar editor — `app/admin/sponsorlar/page.tsx`
- `sponsorship` section. Blocks: **intro** (`TextArea`), **tiers** (`ListEditor<Tier>`, blank `{id:"",name:"",amount:"",benefits:[]}`; per row: id, name, amount `TextField` + benefits `StringList`), **sponsors** (`ListEditor<Sponsor>`, blank `{name:"",logo:"",url:null,tier:"altin"}`; per row: name `TextField`, logo `TextField` (Phase 4 swaps to `ImageUpload`), url `TextField`, tier `Select` with options derived from current tiers).

- [ ] Implement, manual-test, commit `feat(admin): Sponsorlar editor`.

### Task 3.3: Başarılar editor — `app/admin/basarilar/page.tsx`
- `achievements` section (array). `ListEditor<Achievement>`, blank `{id:"",title:"",year:"",category:"",blurb:""}`; per row: id, title, year, category `TextField` + blurb `TextArea`. `SectionForm section="achievements"` with the array as state.

- [ ] Implement, manual-test, commit `feat(admin): Başarılar editor`.

### Task 3.4: Topluluk editor — `app/admin/topluluk/page.tsx`
- `outreach` section (array, currently empty). `ListEditor<OutreachItem>`, blank `{slug:"",title:"",period:"",blurb:"",stat:"",statLabel:"",image:null}`; per row: slug, title, period `TextField`, blurb `TextArea`, stat + statLabel `TextField`, image `TextField` (Phase 4 → `ImageUpload`).

- [ ] Implement, manual-test, commit `feat(admin): Topluluk editor`.

### Task 3.5: Projeler editor — `app/admin/projeler/page.tsx`
- `projects` section (array). `ListEditor<Project>`, blank `{slug:"",title:"",competition:"",year:"",summary:"",highlights:[],tech:[],image:null,specs:[]}`; per row: slug, title, competition, year `TextField`, summary `TextArea`, highlights `StringList`, tech `StringList`, image `TextField` (Phase 4 → `ImageUpload`), specs nested `ListEditor<Spec>` (blank `{value:"",unit:"",label:""}`; row: 3 `TextField`s).

- [ ] Implement, manual-test, commit `feat(admin): Projeler editor`.

### Task 3.6: Blog editor — `app/admin/blog/page.tsx` (most complex)
- Reads/writes the **blog.json** file, not site.json. Add a `BLOG_PATH` branch to the content API: extend `app/api/admin/content/route.ts` so `section === "blog"` reads/writes `src/content/blog.json` (shape `{posts: BlogPost[]}`) and validates with `schema.blog`. Add `blog` to a separate `blogSchema` import (already defined in Task 2.2 as `blog`).
  - **Step A:** In `route.ts`, before the site-section logic, handle `if (section === "blog")`: GET returns `JSON.parse(text).posts`; POST validates `{posts: data}` against `blog`, writes the whole file.
- Editor: `ListEditor<BlogPost>` (blank post with `content: []`). Per row: slug, title, date, author, readTimeMin (`type="number"` via TextField, parse to Number on save), category `Select` (the 5 enum values), excerpt `TextArea`, and a **block editor** for `content`: a `ListEditor<BlogBlock>` where each block renders fields by `type` (a `Select` to choose type, then type-specific inputs: `p/h2/quote` → `TextArea text`; `list` → `StringList items`; `code` → lang `TextField` + code `TextArea`; `metric` → nested `ListEditor` of `{label,value}`).

- [ ] Implement (route extension + page), manual-test, commit `feat(admin): Blog editor`.

---

## Phase 4 — Image upload

### Task 4.1: Upload API

**Files:**
- Create: `app/api/admin/upload/route.ts`

- [ ] **Step 1: Implement `app/api/admin/upload/route.ts`**

```ts
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
```

- [ ] **Step 2: Build check** — `npm run build`. Commit `feat(admin): image upload API`.

### Task 4.2: ImageUpload component + wire into editors

**Files:**
- Create: `src/components/admin/image-upload.tsx`
- Modify: editors that have image fields (sponsorlar, projeler, topluluk, takim photo, genel media)

- [ ] **Step 1: Implement `src/components/admin/image-upload.tsx`**

```tsx
"use client";
import { useState } from "react";

export function ImageUpload({ label, value, category, onChange }: {
  label: string; value: string | null; category: string; onChange: (path: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function upload(file: File) {
    setBusy(true); setErr("");
    const fd = new FormData(); fd.append("file", file); fd.append("category", category);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setBusy(false);
    const j = await res.json();
    if (res.ok) onChange(j.path); else setErr(j.error ?? "Yükleme hatası");
  }

  return (
    <div className="space-y-2">
      <span className="text-xs uppercase tracking-wide text-neutral-400">{label}</span>
      {value && <img src={value} alt="" className="h-16 rounded bg-white/5 object-contain" />}
      <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml"
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} disabled={busy} />
      <input value={value ?? ""} placeholder="/images/..." onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm" />
      {busy && <p className="text-sm text-sky-400">Yükleniyor…</p>}
      {err && <p className="text-sm text-red-400">{err}</p>}
    </div>
  );
}
```

- [ ] **Step 2:** Replace the image `TextField`s in the sponsorlar (logo, category `"sponsors"`), projeler (image, `"projects"`), topluluk (image, `"outreach"`), takim (member/advisor photo, `"team"`), and genel media (revealBand, `"reveal"`) editors with `ImageUpload`.

- [ ] **Step 3:** Manual test: upload a small PNG in the sponsors editor → preview shows, path filled, Save → verify the image file + the JSON both committed on the scratch branch. Commit `feat(admin): ImageUpload wired into editors`.

---

## Phase 5 — Gemini translation + EN page refactor

### Task 5.1: Translatable-field manifest

**Files:**
- Create: `src/lib/admin/translatable.ts`
- Test: `src/lib/admin/translatable.test.ts`

The manifest extracts translatable strings from a section's data into a flat `{path: text}` map and re-applies a `{path: translation}` map onto a clone.

- [ ] **Step 1: Write the failing test**

```ts
import { test, expect } from "vitest";
import { extractStrings, applyStrings } from "./translatable";

test("extracts only translatable fields for achievements", () => {
  const data = [{ id: "a", title: "Başlık", year: "2026", category: "Tasarım", blurb: "Açıklama" }];
  const map = extractStrings("achievements", data);
  expect(map).toEqual({ "0.title": "Başlık", "0.category": "Tasarım", "0.blurb": "Açıklama" });
});

test("applyStrings replaces only mapped paths, clones input", () => {
  const data = [{ id: "a", title: "Başlık", year: "2026", category: "Tasarım", blurb: "Açıklama" }];
  const out = applyStrings("achievements", data, { "0.title": "Title", "0.blurb": "Desc", "0.category": "Design" });
  expect(out[0]).toEqual({ id: "a", title: "Title", year: "2026", category: "Design", blurb: "Desc" });
  expect(data[0].title).toBe("Başlık"); // original untouched
});
```

- [ ] **Step 2: Run to verify it fails** — `npm test -- translatable`.

- [ ] **Step 3: Implement `src/lib/admin/translatable.ts`**

```ts
import type { Section } from "./schema";

// For each section, the leaf field names (within array items or objects) that
// hold human text. Array indices are inserted automatically by the walker.
type Rule = { arrayOf?: string[]; fields?: string[]; nested?: Record<string, Rule> };

const RULES: Record<Section, Rule> = {
  brand: { fields: ["tagline", "longTagline", "descriptor", "descriptorShort"] },
  contact: { fields: ["address"] },
  season: { fields: ["label", "competition", "currentPhase", "nextMilestone"] },
  social: {},
  media: {},
  achievements: { arrayOf: ["title", "category", "blurb"] },
  projects: { arrayOf: ["title", "competition", "summary"], nested: {
    highlights: { fields: [] }, // string[] handled specially below
  } },
  team: { nested: {
    advisor: { fields: ["role"] },
    members: { arrayOf: ["role", "department"] },
    departments: { arrayOf: ["name", "blurb"] },
  } },
  sponsorship: { fields: ["intro"], nested: {
    tiers: { arrayOf: ["name"] }, // benefits handled as string[]
  } },
  outreach: { arrayOf: ["title", "blurb", "statLabel"] },
};

// To keep the walker simple and robust, we hand-roll extraction per shape.
// Returns flat {dotPath: text}.
export function extractStrings(section: Section, data: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  const put = (p: string, v: unknown) => { if (typeof v === "string" && v.trim()) out[p] = v; };

  switch (section) {
    case "brand": case "season":
      for (const f of RULES[section].fields ?? []) put(f, (data as any)[f]);
      break;
    case "contact":
      put("address", (data as any).address); break;
    case "achievements": case "outreach":
      (data as any[]).forEach((it, i) =>
        (section === "achievements" ? ["title", "category", "blurb"] : ["title", "blurb", "statLabel"])
          .forEach((f) => put(`${i}.${f}`, it[f]))); break;
    case "projects":
      (data as any[]).forEach((p, i) => {
        ["title", "competition", "summary"].forEach((f) => put(`${i}.${f}`, p[f]));
        (p.highlights as string[]).forEach((h, j) => put(`${i}.highlights.${j}`, h));
        (p.specs as any[]).forEach((s, j) => put(`${i}.specs.${j}.label`, s.label));
      }); break;
    case "team": {
      const t = data as any;
      put("advisor.role", t.advisor.role);
      (t.members as any[]).forEach((m, i) => { put(`members.${i}.role`, m.role); put(`members.${i}.department`, m.department); });
      (t.departments as any[]).forEach((d, i) => { put(`departments.${i}.name`, d.name); put(`departments.${i}.blurb`, d.blurb); });
      break;
    }
    case "sponsorship": {
      const s = data as any;
      put("intro", s.intro);
      (s.tiers as any[]).forEach((tr, i) => {
        put(`tiers.${i}.name`, tr.name);
        (tr.benefits as string[]).forEach((b, j) => put(`tiers.${i}.benefits.${j}`, b));
      });
      break;
    }
    case "social": case "media": break;
  }
  return out;
}

/** Returns a deep clone of data with translated strings applied at their paths. */
export function applyStrings<T>(_section: Section, data: T, translations: Record<string, string>): T {
  const clone = structuredClone(data) as any;
  for (const [path, value] of Object.entries(translations)) {
    const parts = path.split(".");
    let node = clone;
    for (let i = 0; i < parts.length - 1; i++) node = node[isNaN(+parts[i]) ? parts[i] : +parts[i]];
    const last = parts[parts.length - 1];
    node[isNaN(+last) ? last : +last] = value;
  }
  return clone;
}
```

- [ ] **Step 4: Run to verify it passes** — `npm test -- translatable`. Expected: 2 passed. (The `RULES` constant documents intent; the switch is the source of truth. Keep them aligned.)

- [ ] **Step 5: Commit** `feat(admin): translatable field manifest`.

### Task 5.2: Gemini client

**Files:**
- Create: `src/lib/admin/gemini.ts`
- Test: `src/lib/admin/gemini.test.ts`

- [ ] **Step 1: Write the failing test** (mock fetch):

```ts
import { test, expect, vi, beforeEach } from "vitest";
import { translateMap } from "./gemini";

beforeEach(() => { process.env.GEMINI_API_KEY = "k"; });

test("sends strings and parses returned JSON map", async () => {
  const returned = JSON.stringify({ "0.title": "Title" });
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({
    candidates: [{ content: { parts: [{ text: returned }] } }],
  }), { status: 200 })));
  const out = await translateMap({ "0.title": "Başlık" });
  expect(out).toEqual({ "0.title": "Title" });
});

test("returns empty map for empty input without calling API", async () => {
  const spy = vi.fn();
  vi.stubGlobal("fetch", spy);
  expect(await translateMap({})).toEqual({});
  expect(spy).not.toHaveBeenCalled();
});
```

- [ ] **Step 2: Run to verify it fails** — `npm test -- gemini`.

- [ ] **Step 3: Implement `src/lib/admin/gemini.ts`**

```ts
const MODEL = "gemini-2.0-flash";

/** Translate a {path: TR text} map to {path: EN text} using Gemini. */
export async function translateMap(strings: Record<string, string>): Promise<Record<string, string>> {
  const keys = Object.keys(strings);
  if (keys.length === 0) return {};
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const prompt = [
    "Translate the VALUES of this JSON object from Turkish to English.",
    "Keep the KEYS exactly the same. Do not translate proper nouns, brand names,",
    "product names, or technical part names. Return ONLY a valid JSON object,",
    "no markdown, no commentary.",
    JSON.stringify(strings),
  ].join("\n");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const text: string = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
  const parsed = JSON.parse(text) as Record<string, string>;
  // only keep keys we asked for
  const out: Record<string, string> = {};
  for (const k of keys) if (typeof parsed[k] === "string") out[k] = parsed[k];
  return out;
}
```

- [ ] **Step 4: Run to verify it passes** — `npm test -- gemini`. Expected: 2 passed.

- [ ] **Step 5: Commit** `feat(admin): gemini translation client`.

### Task 5.3: Wire translation into content save

**Files:**
- Modify: `app/api/admin/content/route.ts`

- [ ] **Step 1:** After the successful `putFile` of `site.json` in POST, add EN generation (best-effort, must not fail the TR save):

```ts
// --- EN translation (best-effort) ---
try {
  const enPath = "src/content/site.en.json";
  const en = await getFile(enPath);
  const enAll = JSON.parse(en.text ?? "{}") as Record<string, unknown>;
  const { extractStrings, applyStrings } = await import("@/lib/admin/translatable");
  const { translateMap } = await import("@/lib/admin/gemini");
  const strings = extractStrings(section, parsed.data);
  const translated = await translateMap(strings);
  enAll[section] = applyStrings(section, parsed.data, translated);
  await putFile(enPath, JSON.stringify(enAll, null, 2) + "\n",
    `content(${section}): EN çeviri`, en.sha);
  return NextResponse.json({ ok: true, en: true });
} catch (e) {
  return NextResponse.json({ ok: true, en: false, enError: (e as Error).message });
}
```

Replace the existing `return NextResponse.json({ ok: true })` and the `TODO(Phase 5)` comment with this block. Update `SectionForm`'s success message to warn when `en === false`: "Kaydedildi. (EN çevirisi başarısız — tekrar dene)".

- [ ] **Step 2:** Seed `src/content/site.en.json` once so the file exists: copy `site.json` to `site.en.json`, commit. (First real saves will overwrite each section's EN.) Run `cp src/content/site.json src/content/site.en.json`.

- [ ] **Step 3:** Build + manual test: save a section, confirm a second commit to `site.en.json` appears with translated values. Commit `feat(admin): translate sections to EN on save`.

### Task 5.4: EN loader + refactor `app/en/page.tsx`

**Files:**
- Create: `src/data/site-en.ts`
- Modify: `app/en/page.tsx`

- [ ] **Step 1: Create `src/data/site-en.ts`**

```ts
import content from "@/content/site.en.json";
import type { SiteContent } from "./types";
export const siteEn = content as SiteContent;
```

- [ ] **Step 2: Refactor `app/en/page.tsx`** to consume `siteEn` for data-driven blocks, removing the hardcoded `tiersEn`, `achievementsEn`, `pillarsEn`(keep — it's static UI copy with icons), `credibilityEn`(keep — derived from project specs; optionally map from `siteEn.projects[0].specs`), `captainRoleEn`(replace with `siteEn.team.members` roles):
  - `SponsorTiers`: map `siteEn.sponsorship.tiers` instead of `tiersEn`. Keep `tierAccent` keyed by tier `id` (now `altin/gumus/bronz/destekci` — add a `bronz` accent, drop stale `platin`).
  - `Achievements`: map `siteEn.achievements` instead of `achievementsEn`.
  - `Team`: use `siteEn.team.members.filter(m => m.captain)` and each member's translated `role` (drop `captainRoleEn`).
  - Hero/About/section headings/CTA labels: leave as static English (per spec — not auto-translated).
  - Keep all `site.*` references that are language-neutral (school, city, contact) or switch to `siteEn` where the value is translated.

- [ ] **Step 3:** Build check — `npm run build`. Visit `/en`, confirm tiers/achievements/team now reflect `site.en.json` and the stale `platin` tier is gone. Commit `refactor(en): drive /en data blocks from site.en.json`.

---

## Final: cleanup, robots, merge

### Task 6.1: robots noindex for /admin
- [ ] Modify `app/robots.ts` to add `disallow: ["/admin", "/api/admin"]` to the rules. Build, commit `chore(admin): disallow /admin in robots`.

### Task 6.2: Full verification
- [ ] Run `npm run typecheck && npm run lint && npm test && npm run build` — all green.
- [ ] Manual smoke on dev (scratch branch): login → edit one field in each of the 7 sections → upload one image → confirm commits land → `/en` reflects a translated change.
- [ ] Remove scratch branch from `.env.local` (point `GITHUB_BRANCH` back to `main`), delete remote `admin-scratch` branch and any test commits.

### Task 6.3: Ship
- [ ] Open PR from `feat/admin-panel` → `main`. After merge, Vercel deploys. Verify `stratosiha.vercel.app/admin` login works in production and one real edit publishes.

---

## Self-review notes (filled during planning)

- **Spec coverage:** storage=GitHub (Task 2.1/2.3), auth=single password (Phase 1), per-section tailored forms (Phase 2.4–3), images (Phase 4), Gemini EN data-only translation (Phase 5), env vars documented (header), risks (build-break → zod in 2.2/2.3; concurrency → sha 409 in 2.3; brute-force delay in 1.2), robots (6.1), EN refactor incl. stale-tier fix (5.4). All covered.
- **Type consistency:** `getFile`/`putFile`/`putBinary`, `signSession`/`verifySession`, `isAuthed`, `extractStrings`/`applyStrings`, `translateMap`, `sectionSchemas`/`SECTIONS`/`Section` used consistently across tasks.
- **Known approximation:** content extraction (0.2) uses a generation script + build-parity check (0.3 step 5) rather than hand-transcribed JSON — verified by typecheck/build, not eyeballing. Blog block editor (3.6) is the highest-effort UI task.
