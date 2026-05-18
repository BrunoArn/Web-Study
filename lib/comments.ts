import { db } from "./db";

export async function addCommentForReview({slug, user, message}) {
    return await db.comment.create({
        data: { slug, user, message
        },
    });
}

export async function getCommentsForReview(slug: string) {
    return await db.comment.findMany({
        where: { slug },
        orderBy: {postedAt: "desc"},
    });
}