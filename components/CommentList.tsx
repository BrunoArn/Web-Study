import { getCommentsForReview } from "@/lib/comments";
import { UserCircleIcon } from "@heroicons/react/20/solid";



export default async function CommentList({ slug }) {
    const comments = await getCommentsForReview(slug);
    if (comments.length === 0) {
        return (
            <p className="border mt-3 rounded p-3 text-center italic text-slate-500">
                No comments yet. Be the first to comment!
            </p>
        );
    }

    return (
        <ul className="border mt-3 rounded">
            {comments.map((comment) => (
                <li key={comment.id}
                    className="border-b px-3 py-2 last:border-none odd:bg-orange-100">
                    <div className="flex gap-3 pb-1 text-slate-500">
                        <UserCircleIcon className="h-6 w-6" />
                        {comment.user}</div>
                    <p>{comment.message}</p>
                </li>
            ))}
        </ul>
    );
}