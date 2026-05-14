import { NextResponse } from "next/server";
import { SearchReviews } from "@/lib/reviews";

export async function GET(request) {
    const query = request.nextUrl.searchParams.get("query");
    const reviews = await SearchReviews(query);
    return NextResponse.json(reviews);
}