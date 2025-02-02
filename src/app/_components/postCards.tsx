export default function PostCards() {
    return (
    <div className="postCards mx-4 my-10 flex max-w-md rounded-lg bg-white shadow-lg md:mx-auto md:max-w-2xl">
        <div className="flex items-start px-4 py-6">
            <img
            className="mr-4 h-12 w-12 rounded-full object-cover shadow"
            src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="avatar"
            />
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="-mt-1 text-lg font-semibold text-gray-900">
                        Brad Adams
                    </h2>
                    <small className="text-sm text-gray-700">22h ago</small>
                </div>
                <p className="text-gray-700">Joined 12 SEP 2012.</p>
                <p className="mt-3 text-sm text-gray-700">
                    Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit
                    amet!
                </p>
            </div>
        </div>
    </div>
);
}
