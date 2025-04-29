const Pagination = ({ total, size, limit, page, setPage }: { total: number, size: number, limit: number, page: number, setPage: (page: number) => void }) => {
    if (!total) {
        return <></>;
    }

    const totalPages = Math.ceil(total / size);
    const currentGroup = Math.ceil(page / limit);
    const startPage = (currentGroup - 1) * limit + 1;
    const endPage = Math.min(startPage + limit - 1, totalPages);

    const hasPrevGroup = currentGroup > 1;
    const hasNextGroup = currentGroup * limit < totalPages;

    return <>
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
            <div className="w-full">
                <nav className="flex justify-center relative z-0 inline-flex rounded-md -space-x-px w-full" aria-label="Pagination">
                    {
                        hasPrevGroup ? (
                            <a href="#" onClick={() => setPage(currentGroup * limit - limit)} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                </svg>
                            </a>
                        ) : ''
                    }
                    {
                        Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((p) => (
                            <a href="#" key={p} onClick={() => setPage(p)} aria-current="page"
                                className={`${page === p ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'}`}>
                                {p}
                            </a>
                        ))
                    }
                    {
                        hasNextGroup ? (
                            <a href="#" onClick={() => setPage(currentGroup * limit + 1)} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </a>
                        ) : ''
                    }
                </nav>
            </div>
        </div>
    </>;
}

export default Pagination;