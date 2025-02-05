"use server"; // Marks this file as a Server Actions file, enabling server-side logic.

import { lastID, post } from "~/server/queries"; // Import server-side functions for database operations.
import { redirect } from "next/navigation"; // Import the redirect function for client-side navigation.

// Server action to handle posting content
export async function posted(id: number, text: string) {
  // Call the `post` function to update the database with the new post content.
  await post(id, text);

  // Redirect the user to the homepage after the post is successfully created/updated.
  redirect("/");
}

// Server action to fetch the last post ID
export async function getLastID() {
  // Call the `lastID` function to fetch the ID of the most recent uploaded image from the database.
  return await lastID();
}