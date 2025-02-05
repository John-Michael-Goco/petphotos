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
        }
      ).then((res) => res.json());

      const userName = `${clerkUser.first_name} ${clerkUser.last_name}`;
      const metaImgUrl = clerkUser.profile_image_url; // Assuming the URL is stored under profile_image_url

      return { userId: user.userId, userName, metaImgUrl };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Log the upload completion
      console.log("Upload complete for userId:", metadata.userId);

      // Insert the post into the database
      await db.insert(posts).values({
        userID: metadata.userId,
        userName: metadata.userName, // Dynamically use the fetched userName
        imgURL: file.url,
        status: "Pending",
        userImg: metadata.metaImgUrl, // Include the meta image URL in the insert
      });

      // Log the file URL
      console.log("file url", file.url);

      // Return metadata to the client-side
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
