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
