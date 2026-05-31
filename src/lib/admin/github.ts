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
