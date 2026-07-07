import jsPDF from "jspdf";
import { buildQuotation } from "./quotationTemplate";
import autoTable from "jspdf-autotable";
import { COMPANY } from "./companyConfig";

export function generateQuotationPDF(lead, quotation) {
  const doc = new jsPDF();

  buildQuotation(doc, lead, quotation);

  doc.save(`Quotation-${lead.name}.pdf`);

  // Company Header
  doc.setFontSize(20);
  doc.text(COMPANY.name, 14, 18);

  doc.setFontSize(10);
  doc.text(COMPANY.address, 14, 25);
  doc.text(`Phone: ${COMPANY.phone}`, 14, 30);
  doc.text(`Email: ${COMPANY.email}`, 14, 35);
  doc.text(`GST: ${COMPANY.gst}`, 14, 40);

  // Title
  doc.setFontSize(18);
  doc.text("MOVING QUOTATION", 140, 20);

  // Customer Details
  doc.setFontSize(12);

  doc.text(`Customer : ${lead.name}`, 14, 55);
  doc.text(`Phone : ${lead.phone}`, 14, 62);
  doc.text(`Email : ${lead.email || "-"}`, 14, 69);

  doc.text(`Moving From : ${lead.movingFrom}`, 14, 80);
  doc.text(`Moving To : ${lead.movingTo}`, 14, 87);

  // Charges Table
  autoTable(doc, {
    startY: 100,

    head: [["Service", "Amount"]],

    body: [
      ["Packing", `₹ ${quotation.packing}`],
      ["Loading", `₹ ${quotation.loading}`],
      ["Transportation", `₹ ${quotation.transport}`],
      ["Insurance", `₹ ${quotation.insurance}`],
      ["Unpacking", `₹ ${quotation.unpacking}`],
    ],
  });

  const subtotal =
    Number(quotation.packing) +
    Number(quotation.loading) +
    Number(quotation.transport) +
    Number(quotation.insurance) +
    Number(quotation.unpacking);

  const gst = subtotal * 0.18;

  const total = subtotal + gst;

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,

    body: [
      ["Subtotal", `₹ ${subtotal.toFixed(2)}`],
      ["GST (18%)", `₹ ${gst.toFixed(2)}`],
      ["Grand Total", `₹ ${total.toFixed(2)}`],
    ],
  });

  doc.text(
    "Thank you for choosing us.",
    14,
    doc.lastAutoTable.finalY + 20
  );

  doc.save(`Quotation-${lead.name}.pdf`);
}