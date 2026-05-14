"use client";

import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchBox() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 300);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (debouncedQuery.length > 0) {
            const controller = new AbortController();

            (async () => {
                try {
                    const url = `/api/search?query=${encodeURIComponent(query)}`
                    const response = await fetch(url, { signal: controller.signal });
                    const reviews = await response.json();
                    setReviews(reviews);

                } catch (error) {
                    if (error.name === "AbortError") return;
                    console.error("Failed to fetch search results:", error);
                }
            })();

            return () => controller.abort();
        } else {
            setReviews([]);
        }
    }, [debouncedQuery]);

    const handleChange = (review) => {
        if (!review) return;
        router.push(`/reviews/${review.slug}`);
    }

    return (
        <div className="relative w-48">
            <Combobox onChange={handleChange}>
                <ComboboxInput placeholder="Search..."
                    value={query} onChange={(event) => setQuery(event.target.value)}
                    className="border px-2 py-1 rounded"
                />
                <ComboboxOptions className="absolute bg-white py-1 w-full">
                    {reviews.map((review) => (
                        <ComboboxOption
                            key={review.slug}
                            value={review}
                            className="block truncate px-2 w-full data-focus:bg-orange-100"
                        >
                            {review.title}
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </div >
    );
}
