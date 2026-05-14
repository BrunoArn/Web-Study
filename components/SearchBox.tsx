"use client";

import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const reviewsTestData = [
    { slug: 'diablo-iv', title: 'Diablo IV' },
    { slug: 'clair-obscur-expedition-33', title: 'Clair Obscur: Expedition 33' },
    { slug: 'diablo-iii', title: 'Diablo III' },
    { slug: 'rogue-legacy-2', title: 'Rogue Legacy 2' },
    { slug: 'slay-the-spire', title: 'Slay the Spire' },
    { slug: 'rogue-legacy', title: 'Rogue Legacy' },
    { slug: 'dofus', title: 'Dofus' },
    { slug: 'slay-the-spire-2', title: 'Slay the Spire 2' }
]


export default function SearchBox() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const filtered = reviewsTestData.filter((review) => review.title.includes(query));
    
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
