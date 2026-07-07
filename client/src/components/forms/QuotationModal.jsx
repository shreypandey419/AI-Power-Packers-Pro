import { useState } from "react";
import { generateQuotationPDF } from "../../utils/pdf/generateQuotationPDF";
import { saveQuotation } from "../../services/quotationService";
import { sendQuotationEmail } from "../../services/quotationService";
import toast from "react-hot-toast";

export default function QuotationModal({
  lead,
  onClose,
}) {
  const [packing, setPacking] = useState(3000);
  const [transport, setTransport] = useState(7000);
  const [labour, setLabour] = useState(1500);
  const [gst, setGst] = useState(18);
  const [discount, setDiscount] = useState(0);

  const subtotal =
    Number(packing) +
    Number(transport) +
    Number(labour);

  const gstAmount = (subtotal * gst) / 100;

  const total =
    subtotal +
    gstAmount -
    Number(discount);

  const generatePDF = async () => {
  const subtotal =
    Number(packing) +
    Number(labour) +
    Number(transport);

  const gstAmount = subtotal * 0.18;

  const total = subtotal + gstAmount;

  const quotation = {
    lead: lead._id,
    quoteNo: `QT-${Date.now()}`,

    packing: Number(packing),
    loading: Number(labour),
    transport: Number(transport),
    insurance: 0,
    unpacking: 0,

    subtotal,
    gst: gstAmount,
    total,
  };

  try {
    await saveQuotation(quotation);

    generateQuotationPDF(lead, quotation);

    if (lead.email) {
      try {
        await sendQuotationEmail(lead.email);
        toast.success("Quotation emailed successfully");
      } catch (err) {
        console.log(err);
        toast.error("Failed to send email");
      }
    }

    onClose();
  } catch (err) {
    console.log(err);
    toast.error("Failed to save quotation");
  }
};
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          Generate Quotation
        </h2>

        <input
          type="number"
          value={packing}
          onChange={(e) =>
            setPacking(e.target.value)
          }
          className="border p-3 w-full mb-3 rounded"
          placeholder="Packing Charge"
        />

        <input
          type="number"
          value={transport}
          onChange={(e) =>
            setTransport(e.target.value)
          }
          className="border p-3 w-full mb-3 rounded"
          placeholder="Transport Charge"
        />

        <input
          type="number"
          value={labour}
          onChange={(e) =>
            setLabour(e.target.value)
          }
          className="border p-3 w-full mb-3 rounded"
          placeholder="Labour Charge"
        />

        <input
          type="number"
          value={gst}
          onChange={(e) =>
            setGst(e.target.value)
          }
          className="border p-3 w-full mb-3 rounded"
          placeholder="GST %"
        />

        <input
          type="number"
          value={discount}
          onChange={(e) =>
            setDiscount(e.target.value)
          }
          className="border p-3 w-full mb-5 rounded"
          placeholder="Discount"
        />

        <div className="mb-5 font-semibold">
          Grand Total : ₹{total.toFixed(2)}
        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Generate PDF
          </button>

        </div>

      </div>

    </div>
  );
}