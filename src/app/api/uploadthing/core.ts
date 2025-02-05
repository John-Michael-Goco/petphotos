import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

const f = createUploadthing();


export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // Authenticate the user
      const user = await auth();

      // Throw an error if the user is not authenticated
      if (!user) throw new UploadThingError("Unauthorized");

      // Fetch the user's metadata from Clerk
      const clerkUser = await fetch(
        `https://api.clerk.com/v1/users/${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        },
      ).then((res) => res.json());
      
      // Extract the user's name from the metadata
      const userName = clerkUser.firstName
        ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
        : "John Michael Goco";

      // Return metadata including the user's ID and name
      return { userId: user.userId, userName };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Log the upload completion
      console.log("Upload complete for userId:", metadata.userId);

      // Insert the post into the database
      await db.insert(posts).values({
        userID: metadata.userId,
        userName: metadata.userName, // Use the user's name from metadata
        imgURL: file.url,
        status: "Pending",
      });

      // Log the file URL
      console.log("file url", file.url);

      // Return metadata to the client-side
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;