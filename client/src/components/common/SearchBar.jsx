export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="Search by Name or Phone..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-3 rounded-lg w-full mb-6"
    />
  );
}