import "server-only";

import { db } from "./db";
import { eq } from "drizzle-orm";
import { posts } from "./db/schema";
import { redirect } from "next/dist/server/api-utils";
import { revalidatePath } from "next/cache";

export async function getPost() {
    // Fetch the posts from the database
    const posts = await db.query.posts.findMany({
        // where: (model) => eq(model.status, "Published"),
        orderBy: (model, { desc }) => desc(model.id),
});

return posts
}

export async function post(id: number, content: string) {
    await db
      .update(posts)
      .set({ content: content }) // Update the `content` field
      .where(eq(posts.id, id)); // Condition: update the post with the matching `id`
  }