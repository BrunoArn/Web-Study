"use server";
import { addCommentForReview } from "@/lib/comments";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function CreateCommentAction(formData: FormData) {


    if (!formData.get("user")) {
        return { isError: true, message: "User name is required" };
    }

    const data = {
        slug: formData.get("slug"),
        user: formData.get("user"),
        message: formData.get("message")
    };
    const message = await addCommentForReview(data);

    console.log("[action] message:", message);
    revalidatePath("/reviews/" + data.slug);
    redirect("/reviews/" + data.slug);
}