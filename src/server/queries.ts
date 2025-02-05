import "server-only";

import { db } from "./db";
import { eq } from "drizzle-orm";
import { posts } from "./db/schema";

// Function to fetch all published posts from the database
export async function getPost() {
    // Fetch posts with the status "Published" and order them by ID in descending order
    const posts = await db.query.posts.findMany({
        where: (model) => eq(model.status, "Published"), // Filter for published posts
        orderBy: (model, { desc }) => desc(model.id), // Order by ID in descending order
    });

    return posts; // Return the fetched posts
}

// Function to update a post's content and status in the database
export async function post(id: number, content: string) {
    await db
        .update(posts) // Update the `posts` table
        .set({
            content: content, // Set the new content
            status: "Published", // Set the status to "Published"
        })
        .where(eq(posts.id, id)); // Filter by the post ID
}

// Function to fetch the ID of the latest post
export async function lastID() {
    // Fetch the latest post from the database
    const latestPost = await db.query.posts.findFirst({
        orderBy: (model, { desc }) => desc(model.id), // Order by ID in descending order
    });

    if (latestPost) {
        return latestPost.id; // Return the latest post ID
    } else {
        return null; // Return null if no posts exist
    }
}