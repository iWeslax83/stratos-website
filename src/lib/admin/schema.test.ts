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
    expect(r.success, `${s}: ${r.success ? "" : JSON.stringify((r as { success: false; error: { issues: unknown } }).error.issues)}`).toBe(true);
  }
});

test("rejects a malformed sponsor", () => {
  const r = sectionSchemas.sponsorship.safeParse({ intro: "x", tiers: [], sponsors: [{ name: 1 }] });
  expect(r.success).toBe(false);
});
