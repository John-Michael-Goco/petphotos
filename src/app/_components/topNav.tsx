export default function TopNav() {
    return(
        <nav className="text-x1 flex items-center justify-between p-3 font-semibold shadow-lg sticky top-0 z-auto">
            <div>Pet Photos</div>
            <div className="flex items-center justify-between">
                <div className="px-1">Home</div>
                <div className="px-5">Posts</div>
            </div>
            <div>Login</div>
        </nav>
    )
}