import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

// Components
import TopNav from "./_components/topNav";
import PostCards from "./_components/postCards";
import InputModal from "./_components/createPost";
// Clerk Components
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
// UploadT`hing Styles
import "@uploadthing/react/styles.css";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

export const metadata: Metadata = {
  title: "Pet Photos Sharing",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
        <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <TopNav />
          <SignedIn>
            <InputModal />
          </SignedIn>
          <PostCards />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
