import { addCommentForReview } from "@/lib/comments";
import { redirect } from "next/navigation";

export default function CommentForm({ slug, title }) {
    
    async function action(formData: FormData) {
        "use server";
        const message = await addCommentForReview({
            slug: slug,
            user: formData.get("user"),
            message: formData.get("message")
        });
        console.log("[action] message:", message);
        redirect("/reviews/" + slug);
    }

    return (
        <form action={action}
            className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded">
            <p>
                Already played <strong>{title}</strong>? Have your say!
            </p>
            <div className="flex">
                <label htmlFor="userField" className="shrink-0 w-32">
                    Your Name:
                </label>
                <input id="userField"
                    name="user"
                    placeholder="Enter your name"
                    className="border px-2 py-1 rounded w-48" />
            </div>

            <div className="flex">
                <label htmlFor="messageField" className="shrink-0 w-32">
                    Your Comment:
                </label>
                <textarea id="messageField"
                    name="message"
                    placeholder="Enter your comment"
                    className="border px-2 py-1 rounded w-full" />
            </div>
            <button type="submit"
                className="bg-orange-800 rounded px-2 py-1 self-center
                    text-slate-50 w-32 hover:bg-orange-700 transition">
                Submit
            </button>
        </form>
    )
}