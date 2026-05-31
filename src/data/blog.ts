import data from "@/content/blog.json";
import type { BlogPost, BlogBlock } from "./types";

export const posts = (data as { posts: BlogPost[] }).posts;
export type { BlogPost, BlogBlock } from "./types";
