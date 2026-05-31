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

// --- team round-trip ---

const teamFixture = {
  advisor: { name: "X", role: "Danışman", photo: null },
  members: [{ name: "A", role: "Kaptan", department: "Yazılım", captain: true }],
  departments: [{ id: "d", name: "Yazılım", blurb: "açıklama" }],
};

test("team: extractStrings returns exactly the translatable paths", () => {
  const map = extractStrings("team", teamFixture);
  // must include these
  expect(map).toHaveProperty("advisor.role", "Danışman");
  expect(map).toHaveProperty("members.0.role", "Kaptan");
  expect(map).toHaveProperty("members.0.department", "Yazılım");
  expect(map).toHaveProperty("departments.0.name", "Yazılım");
  expect(map).toHaveProperty("departments.0.blurb", "açıklama");
  // must NOT include name/id/captain/photo
  expect(Object.keys(map)).not.toContain("advisor.name");
  expect(Object.keys(map)).not.toContain("members.0.name");
  expect(Object.keys(map)).not.toContain("members.0.captain");
  expect(Object.keys(map)).not.toContain("departments.0.id");
  expect(Object.keys(map)).not.toContain("advisor.photo");
});

test("team: identity round-trip deep-equals original", () => {
  const extracted = extractStrings("team", teamFixture);
  const result = applyStrings("team", teamFixture, extracted);
  expect(result).toEqual(teamFixture);
});

test("team: partial translation updates only the targeted nested field", () => {
  const result = applyStrings("team", teamFixture, { "members.0.role": "Captain" });
  expect(result.members[0].role).toBe("Captain");
  expect(result.members[0].name).toBe("A");       // untouched
  expect(result.advisor.role).toBe("Danışman");   // untouched
  expect(teamFixture.members[0].role).toBe("Kaptan"); // original not mutated
});

// --- sponsorship round-trip (array-within-array) ---

const sponsorshipFixture = {
  intro: "giriş",
  tiers: [{ id: "altin", name: "Altın", amount: "X", benefits: ["fayda1", "fayda2"] }],
  sponsors: [{ name: "S", logo: "/l.png", url: null, tier: "altin" }],
};

test("sponsorship: extractStrings includes intro, tier name, and nested benefits", () => {
  const map = extractStrings("sponsorship", sponsorshipFixture);
  expect(map).toHaveProperty("intro", "giriş");
  expect(map).toHaveProperty("tiers.0.name", "Altın");
  expect(map).toHaveProperty("tiers.0.benefits.0", "fayda1");
  expect(map).toHaveProperty("tiers.0.benefits.1", "fayda2");
  // must NOT include amount, id, or any sponsor fields
  expect(Object.keys(map)).not.toContain("tiers.0.amount");
  expect(Object.keys(map)).not.toContain("tiers.0.id");
  expect(Object.keys(map)).not.toContain("sponsors.0.name");
  expect(Object.keys(map)).not.toContain("sponsors.0.tier");
});

test("sponsorship: identity round-trip deep-equals original", () => {
  const extracted = extractStrings("sponsorship", sponsorshipFixture);
  const result = applyStrings("sponsorship", sponsorshipFixture, extracted);
  expect(result).toEqual(sponsorshipFixture);
});
