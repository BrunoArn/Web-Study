import { UserCircleIcon } from "@heroicons/react/20/solid";



export default  function CommentListSkeleton() {


    return (
        <ul className="animate-pulse border mt-3 rounded">
            {[1, 2, 3].map((index) => (
                <li key={index}
                    className="border-b px-3 py-2 last:border-none odd:bg-orange-100">
                    <div className="flex gap-3 items-center pb-1 text-slate-300">
                        <UserCircleIcon className="h-6 w-6" />
                        <div className="bg-slate-300 rounded h-3 w-24" />
                    </div>
                    <p className="py-1" />
                    <div className="bg-slate-300 rounded h-3 w-2/3" />
                </li>
            ))}
        </ul>
    );
}