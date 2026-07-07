import QuotationHistory from "./QuotationHistory";
export default function LeadDetailsDrawer({
  lead,
  open,
  onClose,
  onEdit,
  onQuote,
}) {
  if (!open || !lead) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

      <div className="bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto">

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold">
            Lead Details
          </h2>

          <button
            onClick={onClose}
            className="text-3xl"
          >
            ×
          </button>

        </div>

        <div className="p-6 space-y-5">
            <h1 className="text-red-600 text-2xl font-bold">
    DRAWER WORKING
  </h1>

          <Info title="Name" value={lead.name} />

          <Info title="Phone" value={lead.phone} />

          <Info title="Email" value={lead.email || "-"} />

          <Info
            title="Moving From"
            value={lead.movingFrom || "-"}
          />

          <Info
            title="Moving To"
            value={lead.movingTo || "-"}
          />

          <Info
            title="Status"
            value={lead.status}
          />

          <Info
            title="Priority"
            value={lead.priority}
          />

          <Info
            title="Follow Up"
            value={
              lead.followUpDate
                ? new Date(
                    lead.followUpDate
                  ).toLocaleDateString()
                : "-"
            }
          />

          <Info
            title="Notes"
            value={lead.notes || "-"}
          />
          <QuotationHistory leadId={lead._id} />

        </div>

        <div className="border-t p-6 flex gap-3">

          <button
            onClick={() => onEdit(lead)}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={() => onQuote(lead)}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg"
          >
            Quote
          </button>

        </div>

      </div>

    </div>
  );
}

function Info({ title, value }) {
  return (
    <div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="font-semibold mt-1">
        {value}
      </h3>

    </div>
  );
}