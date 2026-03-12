import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

export async function getReviewData(slug) {
    const text = await readFile(`./content/reviews/${slug}.md`, "utf-8");
    const { content, data: { title, date, image } } = matter(text);
    const body = marked(content);
    return { slug, title, date, image, body };
}

export async function getReviewsList() {
    const files = await readdir("./content/reviews");
    const slugs = files.filter((file) => file.endsWith(".md")) 
        .map((file) => file.replace(".md", ""));

    const reviews = [];
    for (const slug of slugs) {
        const review = await getReviewData(slug);
        reviews.push(review);
    }
    return reviews;
}