import { useEffect, useState, useCallback } from "react";
import {
  getLeadQuotations,
  deleteQuotation,
} from "../../services/quotationService";
import { getQuotation } from "../../services/quotationService";
import { generateQuotationPDF } from "../../utils/pdf/generateQuotationPDF";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function QuotationHistory({ leadId }) {
  const [quotations, setQuotations] = useState([]);

  const loadQuotations = useCallback(async () => {
    try {
      const data = await getLeadQuotations(leadId);
      setQuotations(data.quotations);
    } catch (err) {
      console.log(err);
    }
  }, [leadId]);

  useEffect(() => {
    if (leadId) {
      loadQuotations();
    }
  }, [leadId, loadQuotations]);

  const removeQuotation = async (id) => {
    const result = await Swal.fire({
      title: "Delete Quotation?",
      text: "This quotation will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteQuotation(id);

      toast.success("Quotation Deleted");

      loadQuotations();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete quotation");
    }
  };

  const downloadQuotation = async (id) => {
  try {
    const data = await getQuotation(id);

    const { lead, ...quotation } = data.quotation;

    generateQuotationPDF(lead, quotation);
  } catch (err) {
    console.log(err);
    toast.error("Failed to download quotation");
  }
};

  return (
    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Quotation History
      </h2>

      {quotations.length === 0 ? (
        <div className="bg-gray-50 border rounded-xl p-8 text-center">

        <h3 className="text-lg font-semibold">
          No Quotations Available
        </h3>

        <p className="text-gray-500 mt-2">
          Create a quotation to see the history here.
        </p>

      </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-[650px] w-full border">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3">Quote No</th>
                <th className="p-3">Total</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>

            </thead>

            <tbody>

              {quotations.map((q) => (
                <tr
                  key={q._id}
                  className="border-t"
                >
                  <td className="p-3">
                    {q.quoteNo}
                  </td>

                  <td className="p-3">
                    Rs. {q.total.toLocaleString()}
                  </td>

                  <td className="p-3">
                    {new Date(
                      q.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                      <div className="flex gap-2">

                          <button
                              onClick={() => downloadQuotation(q._id)}
                              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                                  Download
                          </button>

                          <button
                              onClick={() => removeQuotation(q._id)}
                              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">
                                  Delete
                          </button>

                      </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}