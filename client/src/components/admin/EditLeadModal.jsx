import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import QuotationHistory from "./QuotationHistory";

export default function EditLeadModal({
  lead,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState(() => ({
    status: lead?.status || "New",
    priority: lead?.priority || "Medium",
    notes: lead?.notes || "",
    followUpDate: lead?.followUpDate
      ? lead.followUpDate.substring(0, 10)
      : "",
  }));

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.put(
        `http://localhost:5001/api/leads/${lead._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Lead Updated");

      onUpdated();

      onClose();
    } catch (err) {
      console.log(err);

      toast.error("Update Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[900px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-5">
          Edit Lead
        </h2>

        <label>Status</label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Completed</option>
        </select>

        <label>Priority</label>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <label>Follow Up Date</label>

        <input
          type="date"
          name="followUpDate"
          value={form.followUpDate}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <label>Notes</label>

        <textarea
          name="notes"
          rows="4"
          value={form.notes}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-5"
        />

        <hr className="my-6" />
        <QuotationHistory leadId={lead._id} />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}