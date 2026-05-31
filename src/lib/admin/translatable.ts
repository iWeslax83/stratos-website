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
