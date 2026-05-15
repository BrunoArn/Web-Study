import { UserCircleIcon } from "@heroicons/react/20/solid";

const comments = [
    { id: 1, user: 'Alice', message: 'Great review!' },
    { id: 2, user: 'Bob', message: 'Thanks for the insights!' },
    { id: 3, user: 'Charlie', message: 'Looking forward to more reviews like this.' }
];

export default function CommentList() {
    return (
        <ul className="border mt-3 rounded">
            {comments.map((comment) => (
                <li key={comment.id}
                 className="border-b px-3 py-2 last:border-none odd:bg-orange-100">
                    <div className="flex gap-3 pb-1 text-slate-500">
                        <UserCircleIcon className="h-6 w-6"/>
                        {comment.user}</div>
                    <p>{comment.message}</p>
                </li>
            ))}
        </ul>
    );
}