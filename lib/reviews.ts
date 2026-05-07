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
    const { data } = await FetchReviewsList(
        {
            filters: { slug: { $eq: slug } },
            fields: ['slug', 'Title', 'subtitle', 'publishedAt', 'Body'],
            populate: { image: { fields: ['url'] } },
            pagination: { pageSize: 1, withCount: false },
        });

    const review = data[0];
    return {
        ...ToReview(review),
        body: marked(review.Body),
    };
}

export async function getReviewsList() {
    const { data } = await FetchReviewsList(
        {
            fields: ['slug', 'Title', 'subtitle', 'publishedAt'],
            populate: { image: { fields: ['url'] } },
            sort: ['publishedAt:desc'],
            pagination: { pageSize: 6 }
        });

    return data.map(ToReview);
}

export async function getSlugs() {
    const files = await readdir("./content/reviews");
    return files.filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(".md", ""));
}

async function FetchReviewsList(parameters) {
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify(parameters, { encodeValuesOnly: true });

    console.log('FetchReviewsList:', url);

    const response = await fetch(url);
    if(!response.ok) {
        throw new Error(`Failed to fetch reviews list: ${response.status} for ${url}`);
    }
    return await response.json();
}

function ToReview(item) {
    return {
        slug: item.slug,
        title: item.Title,
        date: item.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        image: CMS_URL + (item.image?.url)
    }
}