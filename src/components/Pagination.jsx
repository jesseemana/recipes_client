const Pagination = ({pages, currentPage, setCurrentPage}) => {
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    const pageLinks = []
  
    for (let i = 1; i <= pages; i++) {
      pageLinks.push(
        <li key={i}>
          <button
            type="button"
            className={`px-3 py-1 rounded-sm ${
              currentPage === i
                ? 'bg-gray-700 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      )
    }

    return (
        <nav className="flex justify-center p-1 bg-gray-300 rounded-sm">
            <ul className="flex space-x-1">
                <li>
                    <button
                        type="button"
                        className={`px-3 py-1 rounded-sm ${
                        currentPage === 1
                            ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-700'
                        }`}
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        prev
                    </button>
                </li>
                    {pageLinks}
                <li>
                    <button
                        type="button"
                        className={`px-3 py-1 rounded-sm ${
                        currentPage === pages
                            ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-blue-700'
                        }`}
                        disabled={currentPage === pages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        next
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination