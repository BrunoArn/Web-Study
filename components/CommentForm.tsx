"use client";

import { useState } from "react";
import { CreateCommentAction } from "@/app/reviews/[slug]/actions";


export default function CommentForm({ slug, title }) {
    const [state, setState] = useState({isLoading: false, error: null });

    const handleSubmit = async (event) => {
        event.preventDefault();

        setState({isLoading: true, error: null});
        const form = event.currentTarget;
        const formData = new FormData(form);

        const result = await CreateCommentAction(formData);

        if (result?.isError) {
            setState({isLoading: false, error: result});
        } else {
            form.reset();
            setState({isLoading: false, error: null});
        }
    }

    return (
        <form onSubmit={handleSubmit}
            className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded">
            <p>
                Already played <strong>{title}</strong>? Have your say!
            </p>
            <input type="hidden" name="slug" value={slug} />
            <div className="flex">
                <label htmlFor="userField" className="shrink-0 w-32">
                    Your Name:
                </label>
                <input id="userField"
                    name="user"
                    placeholder="Enter your name"
                    required maxLength={50}
                    className="border px-2 py-1 rounded w-48" />
            </div>

            <div className="flex">
                <label htmlFor="messageField" className="shrink-0 w-32">
                    Your Comment:
                </label>
                <textarea id="messageField"
                    name="message"
                    placeholder="Enter your comment"
                    required maxLength={500}
                    className="border px-2 py-1 rounded w-full" />
            </div>
            {Boolean(state.error) && (
                <p className="text-red-500">
                    {state.error} 
                </p>
            )}
            <button type="submit"
                className="bg-orange-800 rounded px-2 py-1 self-center
                    text-slate-50 w-32 hover:bg-orange-700 transition
                    disabled:bg-slate-500 disabled:cursor-not-allowed">
                Submit
            </button>
        </form>
    )
}