import { writeFileSync, mkdirSync } from "node:fs";
import { site } from "../src/data/site";
import { posts } from "../src/data/blog";

mkdirSync("src/content", { recursive: true });

// nav stays in code (structural) — strip it from the editable content.
const { nav: _nav, ...content } = site;

writeFileSync("src/content/site.json", JSON.stringify(content, null, 2) + "\n");
writeFileSync("src/content/blog.json", JSON.stringify({ posts }, null, 2) + "\n");
console.log("wrote src/content/site.json and src/content/blog.json");
