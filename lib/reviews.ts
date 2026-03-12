import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

export async function getReviewData(slug: string) {
    const text = await readFile(`./content/reviews/${slug}.md`, "utf-8");
    const { content, data: { title, date, image } } = matter(text);
    const body = marked(content);
    return { title, date, image, body };
}