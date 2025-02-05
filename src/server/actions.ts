"use server";

import { lastID, post } from "~/server/queries";
import { redirect } from "next/navigation";

export async function posted(id: number, text: string) {
  // Perform the deletion (or any other action)
  await post(id, text);

  redirect("/");
}

export async function getLastID() {
  return await lastID();
}