import { test, expect, vi, beforeEach } from "vitest";
import { translateMap } from "./gemini";

beforeEach(() => { process.env.GEMINI_API_KEY = "k"; });

const okBody = JSON.stringify({
  candidates: [{ content: { parts: [{ text: JSON.stringify({ "0.title": "Title" }) }] } }],
});

test("sends strings and parses returned JSON map", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(okBody, { status: 200 })));
  const out = await translateMap({ "0.title": "Başlık" });
  expect(out).toEqual({ "0.title": "Title" });
});

test("returns empty map for empty input without calling API", async () => {
  const spy = vi.fn();
  vi.stubGlobal("fetch", spy);
  expect(await translateMap({})).toEqual({});
  expect(spy).not.toHaveBeenCalled();
});

test("falls back to next model when one returns 429 quota", async () => {
  const fetchMock = vi.fn()
    .mockResolvedValueOnce(new Response('{"error":{"code":429}}', { status: 429 }))
    .mockResolvedValueOnce(new Response(okBody, { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  const out = await translateMap({ "0.title": "Başlık" });
  expect(out).toEqual({ "0.title": "Title" });
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

test("throws when every model is exhausted", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response('{"error":{"code":429}}', { status: 429 })));
  await expect(translateMap({ "0.title": "Başlık" })).rejects.toThrow(/429/);
});

test("strips a markdown json fence if the model adds one", async () => {
  const fenced = JSON.stringify({
    candidates: [{ content: { parts: [{ text: "```json\n" + JSON.stringify({ "0.title": "Title" }) + "\n```" }] } }],
  });
  vi.stubGlobal("fetch", vi.fn(async () => new Response(fenced, { status: 200 })));
  const out = await translateMap({ "0.title": "Başlık" });
  expect(out).toEqual({ "0.title": "Title" });
});
