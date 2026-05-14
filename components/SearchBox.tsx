"use client";

import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function SearchBox() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (query.length > 0) {
            (async () => {
                const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
                const reviews = await response.json();
                setReviews(reviews);
            })();
        } else {
            setReviews([]);
        }
    }, [query]);

    const handleChange = (review) => {
        router.push(`/reviews/${review.slug}`);
        console.log("Selected review:", review);
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
