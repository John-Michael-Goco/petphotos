import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import TopNav from "./_components/topNav";
import PostCards from "./_components/postCards";
import InputModal from "./_components/createPost";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

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
