import Image from "next/image";
import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReviewData, getSlugs } from "@/lib/reviews";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/20/solid";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";


export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const review = await getReviewData(slug);
    if (!review) {
        notFound();
    }
    return {
        title: review.title,
    }
}

export default async function ReviewPage({ params }) {
    const { slug } = await params;
    const reviewData = await getReviewData(slug);
    if (!reviewData) {
        notFound();
    }

    return (
        <>
            <Heading>
                {reviewData.title}
            </Heading>
            <p className="font-semibold pb-3">
                {reviewData.subtitle}
            </p>

            <div
                className="flex gap-3 items-baseline">
                <p
                    className="italic pb-2">{reviewData.date}
                </p>
                <ShareLinkButton />
            </div>

            <Image
                src={reviewData.image}
                alt=""
                priority
                width={640} height={360} className="mb-2 rounded"
            />

            <article
                dangerouslySetInnerHTML={{ __html: reviewData.body }}
                className="max-w-screen-sm prose prose-slate"
            />
            <section className="border-dashed border-t max-w-screen-sm mt-3 py-3">
                <h2 className="font-bold flex gap-2 items-center text-xl">
                    <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
                    Comments
                </h2>
                <CommentForm title={reviewData.title} />
                <CommentList />
            </section>
        </>
    );
}