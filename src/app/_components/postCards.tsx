export default function PostCards() {
    return (
        <div className="postCards mx-4 my-10 flex max-w-md rounded-lg bg-white shadow-lg md:mx-auto md:max-w-xl">
            <div className="flex items-start px-4 py-6">
                <img
                className="mr-4 h-12 w-12 rounded-full object-cover shadow"
                src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                />
                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="userName -mt-1 text-lg font-semibold">User</h2>
                        <small className="timeline text-xs">22h ago</small>
                    </div>
                    <p className="postContent mt-3 text-sm">
                        Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit
                        amet!
                    </p>
                    <img
                        className="w-full object-contain max-h-96 mt-5 imageContent rounded-lg"
                        src="https://lkp5mmomjt.ufs.sh/f/HfOOWlx6fXnm37OJdQry7OKeSEaWYwiv8XbBIuPN5VjokCZd"
                        alt="Post Image"
                    />
                </div>
            </div>
        </div>
    );
}
