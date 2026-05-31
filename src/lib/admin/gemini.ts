// Models tried in order. On a non-OK response (e.g. 429 free-tier quota = 0
// for a given model/region) we fall through to the next model. First success wins.
const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"];

/** Strip an accidental ```json ... ``` markdown fence if the model adds one. */
function stripFence(text: string): string {
  return text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
}

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

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
  });

  let lastError = "";
  for (const model of MODELS) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      { method: "POST", headers: { "content-type": "application/json" }, body },
    );
    if (!res.ok) {
      // Quota (429) or model unavailable — record and try the next model.
      lastError = `Gemini ${model} ${res.status}: ${await res.text()}`;
      continue;
    }
    const json = await res.json();
    const text: string = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
    const parsed = JSON.parse(stripFence(text)) as Record<string, string>;
    // only keep keys we asked for
    const out: Record<string, string> = {};
    for (const k of keys) if (typeof parsed[k] === "string") out[k] = parsed[k];
    return out;
  }
  throw new Error(lastError || "Gemini: all models failed");
}
