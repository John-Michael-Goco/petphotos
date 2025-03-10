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
        <nav className="text-x1 flex items-center justify-between p-3 font-semibold shadow-lg sticky top-0 z-auto h-[7vh] bg-neutral-800 text-neutral-300">
            {/* Left side of the navbar: App name or logo */}
            <div>PET Photos</div>

            <div className='items-center flex justify-center'>
                <a className="px-2" href='/'>Home</a>
                <div className='px-2 flex justify-center items-center '>
                    <SignedOut>
                        <SignInButton mode='modal' />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}