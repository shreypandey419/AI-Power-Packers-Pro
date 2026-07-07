export default function LeadTable({
  leads,
  updateStatus,
  openDrawer,
  openEditModal,
  openQuoteModal,
  deleteLead,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto mt-6 w-full">

      <table className="min-w-[1200px] w-full">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="p-4">Name</th>

            <th className="p-4">Phone</th>

            <th className="p-4">Email</th>

            <th className="p-4">From</th>

            <th className="p-4">To</th>

            <th className="p-4">Status</th>

            <th className="p-4">Priority</th>

            <th className="p-4">Follow Up</th>

            <th className="p-4">Notes</th>

            <th className="p-4">Date</th>

            <th className="p-4">Action</th>

          </tr>

        </thead>

        <tbody>

          {leads.length === 0 ? (

            <tr>

              <td
                colSpan="11"
                className="text-center py-10 text-gray-500"
              >
                No Leads Found
              </td>

            </tr>

          ) : (

            leads.map((lead) => (

              <tr
                key={lead._id}
                className="border-b text-center hover:bg-gray-50"
              >

                <td className="p-3 whitespace-nowrap">
                  {lead.name}
                </td>

                <td className="p-3 whitespace-nowrap">
                  {lead.phone}
                </td>

                <td className="p-3 whitespace-nowrap">
                  {lead.email}
                </td>

                <td className="p-3 whitespace-nowrap">
                  {lead.movingFrom}
                </td>

                <td className="p-3 whitespace-nowrap">
                  {lead.movingTo}
                </td>

                <td className="p-3">

                  <select
                    value={lead.status || "New"}
                    onChange={(e) =>
                      updateStatus(
                        lead._id,
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1 whitespace-nowrap"
                  >
                    <option value="New">
                      New
                    </option>

                    <option value="Contacted">
                      Contacted
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                  </select>

                </td>

                <td className="p-3">
                  {lead.priority || "Medium"}
                </td>

                <td className="p-3">

                  {lead.followUpDate
                    ? new Date(
                        lead.followUpDate
                      ).toLocaleDateString()
                    : "-"}

                </td>

                <td className="p-3 max-w-[220px] truncate">

                  {lead.notes || "-"}

                </td>

                <td className="p-3">

                  {new Date(
                    lead.createdAt
                  ).toLocaleDateString()}

                </td>

                <td className="p-3">

                  <div className="flex flex-wrap justify-center gap-2 min-w-[260px]">
                    <button onClick={() => openDrawer(lead)}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded whitespace-nowrap">
                      View
                    </button> 
                                      
                    <button
                      onClick={() => openEditModal(lead)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded whitespace-nowrap"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openQuoteModal(lead)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded whitespace-nowrap"
                    >
                      Quote
                    </button>

                    <button
                      onClick={() => deleteLead(lead._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded whitespace-nowrap"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}