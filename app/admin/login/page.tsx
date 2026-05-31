"use client";
import { useState } from "react";

export default function AdminLogin() {
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
    if (res.ok) {
      // Full-page navigation so the new session cookie is sent and middleware
      // re-runs cleanly (a client-side router.push can reuse a stale,
      // pre-login prefetch of /admin and bounce back to login).
      window.location.assign("/admin");
      return;
    }
    setLoading(false);
    setError("Hatalı şifre");
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
