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
