import { writeFileSync } from "node:fs"
import { title } from "node:process";
import qs from "qs";

const url = 'http://localhost:1337/api/reviews'
    + '?' + qs.stringify({
    fields: ['slug', 'Title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    pagination: { pageSize: 6 }
    }, { encodeValuesOnly: true });

console.log('url:', url);

const response = await fetch(url);
const body = await response.json();

const file = "app/scripts/strapi-response.json";
writeFileSync(file, JSON.stringify(body, null, 2), "utf8");