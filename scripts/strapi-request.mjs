import { writeFileSync } from "node:fs"
import { title } from "node:process";
import qs from "qs";

const url = 'http://localhost:1337/api/reviews'
    + '?' + qs.stringify({
        filters: { slug: { $eq: 'diablo-iv' } },
        fields: ['slug', 'Title', 'subtitle', 'publishedAt', 'Body'],
        populate: { image: { fields: ['url'] } },
        pagination: { pageSize: 1, withCount: false },
    }, { encodeValuesOnly: true });

console.log('url:', url);

const response = await fetch(url);
const body = await response.json();

const file = "scripts/strapi-response.json";
writeFileSync(file, JSON.stringify(body, null, 2), "utf8");