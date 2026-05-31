const MODEL = "gemini-2.0-flash";

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

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const text: string = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
  const parsed = JSON.parse(text) as Record<string, string>;
  // only keep keys we asked for
  const out: Record<string, string> = {};
  for (const k of keys) if (typeof parsed[k] === "string") out[k] = parsed[k];
  return out;
}
