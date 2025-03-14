import "~/styles/globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

// Components
import PostCards from "./_components/postCards";
import InputModal from "./_components/createPost";
// Clerk Components
import { SignedIn } from "@clerk/nextjs";
// UploadT`hing Styles
import "@uploadthing/react/styles.css";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

export default function HomePage() {
  return (
    <main className="">
          <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <SignedIn>
            <InputModal />
          </SignedIn>
          <PostCards />
    </main>
  );
}
