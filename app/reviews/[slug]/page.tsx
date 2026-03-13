import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReviewData, getSlugs } from "@/lib/reviews";

export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const review = await getReviewData(slug);
    return {
        title: review.title,
    }
}

export default async function ReviewPage({ params }) {
    const { slug } = await params;
    const reviewData = await getReviewData(slug);

    return (
        <>
            <Heading>
                {reviewData.title}
            </Heading>

            <div className="flex gap-3 items-baseline">
                <p
                    className="italic pb-2">{reviewData.date}
                </p>
                <ShareLinkButton />
            </div>

            <img
                src={reviewData.image}
                alt=""
                width={640} height={360} className="mb-2 rounded"
            />

            <article
                dangerouslySetInnerHTML={{ __html: reviewData.body }}
                className="max-w-screen-sm prose prose-slate"
            />

        </>
    );
}