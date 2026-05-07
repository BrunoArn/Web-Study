import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import qs from "qs";

const CMS_URL = 'http://localhost:1337'

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
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify({
            fields: ['slug', 'Title', 'subtitle', 'publishedAt'],
            populate: { image: { fields: ['url'] } },
            sort: ['publishedAt:desc'],
            pagination: { pageSize: 6 }
        }, { encodeValuesOnly: true });
    console.log('getReviewsList:', url);

    const response = await fetch(url);
    const { data } = await response.json();
    return data.map((attributes) => ({
        slug: attributes.slug,
        title: attributes.Title,
        date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        image: CMS_URL + (attributes.image?.url)
    }));
}

export async function getSlugs() {
    const files = await readdir("./content/reviews");
    return files.filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(".md", ""));
}