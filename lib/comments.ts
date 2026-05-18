import {db} from "./db";

export async function getCommentsForReview(slug: string) {
    return await db.comment.findMany({
        where: { slug }
    });
}