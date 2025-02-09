import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

// Clerk Components
import { ClerkProvider } from "@clerk/nextjs";

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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
