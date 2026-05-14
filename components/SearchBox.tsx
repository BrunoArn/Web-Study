"use client";

import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBox({ reviews }) {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const filtered = reviews.filter((review) =>
        review.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // Limit to top 5 results

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
                <ComboboxOptions className="absolute bg-white w-full">
                    {filtered.map((review) => (
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
        </div>
    );
}
