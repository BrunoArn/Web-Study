import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviewsList } from "@/lib/reviews";

export default async function ReviewsPage() {
    const reviews = await getReviewsList();

    return (
        <>
            <Heading>Reviews</Heading>
            <p>
                Tem review pra caramba, mano! Tem review de tudo quanto é jogo indie, desde os mais famosos até os mais obscuros. Se você quer saber se um jogo é bom ou não, é só dar uma olhada aqui!
            </p>
            <ul className="flex flex-row flex-wrap gap-3">
                {reviews.map((review) => (
                    <li key={review.slug}
                        className="bg-white border w-80 rounded shadow hover:shadow-xl">
                        <Link href={`/reviews/${review.slug}`}>
                            <img src={review.image}
                                alt=""
                                width={320} height={180} className="mb-2 rounded-t"
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