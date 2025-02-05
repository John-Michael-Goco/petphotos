import { eq } from "drizzle-orm";
import { db } from "~/server/db";

export const dynamic = "force-dynamic"

export default async function PostCards() {
    // Fetch the posts from the database
    const posts = await db.query.posts.findMany({
        where: (model) => eq(model.status, "Published"),
        orderBy: (model, { desc }) => desc(model.id),
    });
    
    return (
        <div>
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="postCards mx-4 my-10 flex max-w-md rounded-lg bg-white shadow-lg md:mx-auto md:max-w-xl"
                >
                    <div className="flex items-start px-4 py-6">
                        <img
                            className="mr-4 h-12 w-12 rounded-full object-cover shadow"
                            src={"https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
                            alt="avatar"
                        />
                        <div>
                            <div className="flex items-center justify-between">
                                <h2 className="userName -mt-1 text-lg font-semibold">{post.userID}</h2>
                                <small className="timeline text-xs">
                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "No date available"}
                                </small>
                            </div>
                            <p className="postContent mt-3 text-sm">
                                {post.content}
                            </p>
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
