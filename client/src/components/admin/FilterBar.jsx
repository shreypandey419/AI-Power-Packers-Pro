export default function FilterBar({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  sort,
  setSort,
  setPage,
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">

      <input
        type="text"
        placeholder="Search Name, Phone, Email..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border rounded-lg px-4 py-2 w-72"
      />

      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setPage(1);
        }}
        className="border rounded-lg px-4 py-2"
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        value={priority}
        onChange={(e) => {
          setPriority(e.target.value);
          setPage(1);
        }}
        className="border rounded-lg px-4 py-2"
      >
        <option value="">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          setPage(1);
        }}
        className="border rounded-lg px-4 py-2"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="nameAsc">Name A-Z</option>
        <option value="nameDesc">Name Z-A</option>
      </select>

    </div>
  );
}