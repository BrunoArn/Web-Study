import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const db = new PrismaClient({ adapter,
     log: [{ emit: "stdout", level: "query" }] });

// const comment = await db.comment.create({
//     data: {
//         slug: "diablo-iv",
//         user: "Wayne",
//         message: "Ok game!",
//     },
// });

const comments = await db.comment.findMany({
    where: { slug: "diablo-iv" }
});

console.log("Found comments:", comments);
await db.$disconnect();
