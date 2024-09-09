export default function PaginationComponents({ paginationData }) {
    const {
        first_page_url,
        prev_page_url,
        current_page,
        next_page_url,
        last_page_url,
        last_page,
    } = paginationData;

    return (
        <div className="py-4">
            <nav className="flex justify-center space-x-2">
                <a
                    href={first_page_url}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        current_page === 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    aria-disabled={current_page === 1}
                >
                    First
                </a>
                <a
                    href={prev_page_url}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        current_page === 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    aria-disabled={current_page === 1}
                >
                    Previous
                </a>
                <span className="px-4 py-2 text-sm font-medium text-gray-700">
                    Page {current_page} of {last_page}
                </span>
                <a
                    href={next_page_url}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        current_page === last_page
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    aria-disabled={current_page === last_page}
                >
                    Next
                </a>
                <a
                    href={last_page_url}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        current_page === last_page
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    aria-disabled={current_page === last_page}
                >
                    Last
                </a>
            </nav>
        </div>
    );
}