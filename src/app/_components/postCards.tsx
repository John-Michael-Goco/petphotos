import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Post() {
    // Fetch the user details to check their userId
    const user = await auth();

    // If the user is not authenticated, throw an error
    if (!user.userId) throw new UploadThingError("Unauthorized");

    // Fetch posts from the database for the authenticated user
    const posts = await db.query.posts.findMany({
        // Filter posts where the status is "Published" AND the userId matches the authenticated user
        where: (model) =>
            eq(model.status, "Published") && eq(model.userID, user.userId), 
        orderBy: (model, { desc }) => desc(model.id),
    });

    return (
        <div>
            {/* Map through the fetched posts and render each one */}
            {posts.map((post) => (
                <div
                    key={post.id} // Unique key for each post to help React with rendering
                    className="postCards mx-4 my-10 flex max-w-md rounded-lg bg-white shadow-lg md:mx-auto md:max-w-xl"
                >
                    <div className="flex items-start px-4 py-6">
                        {/* Display the user's avatar (currently using a placeholder image) */}
                        <img
                            className="mr-4 h-12 w-12 rounded-full object-cover shadow"
                            src={post.userImg || "/path/to/fallback-image.jpg"}  // Use a fallback image
                            alt="avatar"
                        />
                        <div>
                            {/* Post header with username and creation date */}
                            <div className="flex items-center justify-between">
                                <h2 className="userName -mt-1 text-lg font-semibold">{post.userName}</h2>
                                <small className="timeline text-xs text-left">
                                    {/* Display the post creation date in a readable format */}
                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "No date available"}
                                </small>
                            </div>
                            {/* Post content */}
                            <p className="postContent mt-3 text-sm">
                                {post.content}
                            </p>
                            {/* Display the post image if it exists */}
                            {post.imgURL && (
                                <img
                                    className="mx-auto w-full object-contain mt-5 imageContent rounded-lg"
                                    src={post.imgURL}
                                    alt="Post Image"
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default async function PostCards() {
    return (
        <>
            <SignedOut>
                <div className="h-full w-full text-2x1 text-center py-10 text-2xl">Please Sign In Above</div>
            </SignedOut>
            <SignedIn>
                <Post />
            </SignedIn>
        </>
    )
}