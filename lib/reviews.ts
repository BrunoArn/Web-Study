import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

export async function getFeaturedReview() {
    const slugs = await getSlugs();
    return await getReviewData(slugs[0]);
}

export async function getReviewData(slug) {
    const text = await readFile(`./content/reviews/${slug}.md`, "utf-8");
    const { content, data: { title, date, image } } = matter(text);
    const body = marked(content);
    return { slug, title, date, image, body };
}

export async function getReviewsList() {
    const slugs = await getSlugs();

    const reviews = [];
    for (const slug of slugs) {
        const review = await getReviewData(slug);
        reviews.push(review);
    }

    reviews.sort((a,b) => b.date.localeCompare(a.date));

    return reviews;
}

export async function getSlugs() {
    const files = await readdir("./content/reviews");
    return files.filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(".md", ""));
}