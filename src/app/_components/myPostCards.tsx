import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
export const dynamic = "force-dynamic";


async function MyPost() {
    // Fetch the user details to check their userId
    const user = await auth();
    console.log('This is user', user)
    // If the user is not authenticated, throw an error
    if (!user.userId) throw new UploadThingError("Unauthorized");

    // Fetch posts from the database for the authenticated user
    const posts = await db.query.posts.findMany({
        // Filter posts where the status is "Published" AND the userId matches the authenticated user
        where: (model) =>
            and(
                eq(model.status, "Published"), // Check if status is "Published"
                eq(model.userID, user.userId) // Check if userID matches
            ),
        orderBy: (model, { desc }) => desc(model.id),
    });
    console.log('This is post', posts);
    
    
    return (
        <div>
            {/* Map through the fetched posts and render each one */}
            {posts.map((post) => (
                <div
                    key={post.id} // Unique key for each post to help React with rendering
                    className="postCards mx-4 my-10 flex max-w-md rounded-lg bg-white shadow-lg md:mx-auto md:max-w-xl"
                >
                    <div className="items-start px-4 py-6">
                        <div className="flex">
                            {/* Display the user's avatar (currently using a placeholder image) */}
                            <img
                                className="mr-4 h-12 w-12 rounded-full object-cover shadow"
                                src={post.userImg || ""}
                                alt="avatar"
                            />
                            <div className="w-full">
                                {/* Post header with username and timeline text */}
                                <div className="flex items-center justify-between w-full">
                                    <h2 className="userName -mt-1 text-lg font-semibold">{post.userName}</h2>
                                    <button>X</button>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <p className="postContent mt-3 text-sm">
                                        {post.content}
                                    </p>
                                    <small className="timeline text-xs">
                                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "No date available"}
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* Display the post image if it exists */}
                            {post.imgURL && (
                                <img
                                    className="ms-0 w-full mt-5 rounded-lg"
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
            <SignedIn>
                <MyPost />
            </SignedIn>
        </>
    )
}