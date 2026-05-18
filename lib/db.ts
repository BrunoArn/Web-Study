import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
});

declare global {
    var prismaClient: PrismaClient | undefined;
}

function CreatePrismaClient(): PrismaClient {
    if (!globalThis.prismaCLient) {
        globalThis.prismaCLient = new PrismaClient({

            adapter
        });
    }
    return globalThis.prismaCLient;
}

export const db = CreatePrismaClient();