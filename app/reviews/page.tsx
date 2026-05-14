import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading";
import PaginationBar from "@/components/PaginationBar";

import { getReviewsList } from "@/lib/reviews";
import SearchBox from "@/components/SearchBox";


export const metadata = {
    title: "Reviews", //override the default values and appendes the layout la
};

const PAGE_SIZE = 8;

export default async function ReviewsPage({ searchParams }) {
    const params = await searchParams;
    const page = parsePageParam(params.page);
    const { reviews, pageCount } = await getReviewsList(PAGE_SIZE, page);

    return (
        <>
            <Heading>Reviews</Heading>
            <div className="flex justify-between pb-3">
                <PaginationBar href="/reviews" page={page} pageCount={pageCount} />
                <SearchBox/>
            </div>
            <ul
                className="flex flex-row flex-wrap gap-3  overflow-hidden">
                {reviews.map((review, index) => (
                    <li
                        key={review.slug}
                        className="bg-white border w-80 rounded shadow hover:shadow-xl">
                        <Link
                            href={`/reviews/${review.slug}`}>
                            <Image
                                src={review.image}
                                alt=""
                                priority={index < 4} // Prioritize the first 4 images for faster loading
                                width={320}
                                height={180}
                                className="mb-2 rounded-t h-44 w-full object-cover"
                            />
                            <h2 className="font-semibold font-orbitron py-1 text-center">
                                {review.title}
                            </h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

function parsePageParam(paramValue) {
    if (paramValue) {
        const page = parseInt(paramValue);
        if (isFinite(page) && page > 0) {
            return page;
        }
    }
    return 1; // Default to page 1 if the parameter is missing or invalid
}