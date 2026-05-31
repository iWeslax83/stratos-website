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
