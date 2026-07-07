export default function Pagination({
  page,
  totalPages,
  setPage,
}) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Previous
      </button>

      <span className="font-semibold text-gray-700">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Next
      </button>

    </div>
  );
}