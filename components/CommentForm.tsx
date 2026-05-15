export default function CommentForm({ title }) {
    return (
        <form className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded">
            <p>
                Already played <strong>{title}</strong>? Have your say!
            </p>
            <div className="flex">
                <label htmlFor="userField" className="shrink-0 w-32">
                    Your Name:
                </label>
                <input id="userField" placeholder="Enter your name" className="border px-2 py-1 rounded w-48"/>
            </div>

            <div className="flex">
                <label htmlFor="messageField" className="shrink-0 w-32">
                    Your Comment:
                </label>
                <textarea id="messageField" placeholder="Enter your comment" className="border px-2 py-1 rounded w-full"/>
            </div>
            <button type="submit"
                    className="bg-orange-800 rounded px-2 py-1 self-center
                    text-slate-50 w-32 hover:bg-orange-700 transition">
                Submit
            </button>
        </form>
    )
}