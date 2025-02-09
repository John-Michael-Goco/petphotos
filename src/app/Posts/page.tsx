import "~/styles/globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

// Components
import TopNav from "../_components/topNav";
import MyPostCards from "../_components/myPostCards";
import InputModal from "../_components/createPost";
// Clerk Components
import { SignedIn } from "@clerk/nextjs";
// UploadT`hing Styles
import "@uploadthing/react/styles.css";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";

export default function Posts() {
  return (
    <main className="">
        <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <TopNav />
          <SignedIn>
            <InputModal />
          </SignedIn>
          <MyPostCards />
    </main>
  );
}
