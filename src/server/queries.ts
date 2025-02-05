import "server-only";

import { db } from "./db";
import { eq, and } from "drizzle-orm";
import { posts } from "./db/schema";


export async function getPost() {
    // Fetch the posts from the database
    const posts = await db.query.posts.findMany({
        where: (model) => eq(model.status, "Published"),
        orderBy: (model, { desc }) => desc(model.id),
});

return posts
}

export async function post(id: number, content: string) {
    await db
      .update(posts)
      .set({
        content: content,
        status: "Published"
      })
      .where(eq(posts.id, id));
  }

  export async function lastID() {
    // Fetch the latest post ID from the database
    const latestPost = await db.query.posts.findFirst({
      orderBy: (model, { desc }) => desc(model.id),
    });
  
    if (latestPost) {
      return latestPost.id; // Return the latest post ID
    } else {
      return null; // Return null if no posts exist
    }
  }