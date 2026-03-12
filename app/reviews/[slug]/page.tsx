import Heading from "@/components/Heading";
import { getReviewData } from "@/lib/reviews";

export default async function ReviewPage({ params }) {
    const { slug } = await params;
    const reviewData = await getReviewData(slug);
    
    return (
        <>
            <Heading>{reviewData.title}</Heading>
            <p className="italic pb-2">{reviewData.date} </p>
            <img src={reviewData.image}
                alt=""
                width={640} height={360} className="mb-2 rounded"
            />
            <article dangerouslySetInnerHTML={{ __html: reviewData.body }}
                className="max-w-screen-sm prose prose-slate"
            />
        </>
    );
}