"use server";
import { addCommentForReview } from "@/lib/comments";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function CreateCommentAction(formData: FormData) {
    
    const data = {
        slug: formData.get("slug"),
        user: formData.get("user"),
        message: formData.get("message")
    };

    const error = validate(data);
    if (error) {
        return {isError: true, message: error};
    }

    const message = await addCommentForReview(data);
    console.log("Created comment", message);

    revalidatePath("/reviews/" + data.slug);
    //redirect("/reviews/" + data.slug);
    return { sucess : true };
}

function validate(data) {
    if(!data.user) {
        return { isError: true, message: "User name is required" };
    }
    if(data.user.length > 50) {
        return { isError: true, message: "User name is too long" };
    }
    if(!data.message) {
        return { isError: true, message: "Comment is required" };
    }
    if(data.message.length > 500) {
        return { isError: true, message: "Comment is too long" };
    }

}