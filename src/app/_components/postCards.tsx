import { eq } from "drizzle-orm"; 
import { db } from "~/server/db";

export const dynamic = "force-dynamic"; 

export default async function PostCards() {
    // Fetch the posts from the database
    const posts = await db.query.posts.findMany({
        // Filter posts where the status is "Published"
        where: (model) => eq(model.status, "Published"),
        // Order posts by their ID in descending order (newest first)
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
                        {/* <img
                            className="mr-4 h-12 w-12 rounded-full object-cover shadow"
                            src={"https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
                            alt="avatar"
                        /> */}
                        <div>
                            {/* Post header with username and creation date */}
                            <div className="flex items-center justify-between">
                                <h2 className="userName -mt-1 text-lg font-semibold">{post.userName}</h2>
                                <small className="timeline text-xs">
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