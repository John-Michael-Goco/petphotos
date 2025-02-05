import {
    ClerkProvider, // Provides authentication context for the app
    SignInButton, // Button to allow users to sign in
    SignedIn, // Component to render content only for signed-in users
    SignedOut, // Component to render content only for signed-out users
    UserButton // Button to display user profile and sign-out options
} from '@clerk/nextjs'; // Importing Clerk components for authentication

export default function TopNav() {
    return (
        // Navigation bar container
        <nav className="text-x1 flex items-center justify-between p-3 font-semibold shadow-lg sticky top-0 z-auto">
            {/* Left side of the navbar: App name or logo */}
            <div>Pet Photos</div>

            {/* Middle section of the navbar: Navigation links */}
            <div className="flex items-center justify-between">
                {/* Home link */}
                <a className="px-1" href='#'>Home</a>

                {/* Example of a conditional link for signed-in users (currently commented out) */}
                {/* <SignedIn>
                    <a className="px-5">Posts</a>
                </SignedIn> */}
            </div>
            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}