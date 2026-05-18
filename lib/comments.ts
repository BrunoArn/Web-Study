import { db } from "./db";
import type { Comment } from "@/generated/prisma/client";

export type CreateCommentData = Omit<Comment, 'id' | 'postedAt'>;

export async function addCommentForReview({ slug, user, message }: CreateCommentData) {
    return await db.comment.create({
        data: {
            slug, user, message
        },
    });
}

export async function getCommentsForReview(slug: string) {
    return await db.comment.findMany({
        where: { slug },
        orderBy: { postedAt: "desc" },
    });
}