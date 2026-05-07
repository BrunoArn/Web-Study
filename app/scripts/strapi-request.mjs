import { writeFileSync } from "node:fs"

const url = 'http://localhost:1337/api/reviews'
+ '?populate=*';
const response = await fetch(url);
const body = await response.json();

const file = "app/scripts/strapi-response.json";
writeFileSync(file, JSON.stringify(body, null, 2), "utf8");