import autoTable from "jspdf-autotable";
import { COMPANY } from "./companyConfig";

export function buildQuotation(doc, lead, quotation) {

    const formatCurrency = (amount) =>
  `Rs. ${Number(amount).toLocaleString("en-IN")}`;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text(COMPANY.name, 14, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text(COMPANY.address, 14, 25);
  doc.text(`Phone: ${COMPANY.phone}`, 14, 30);
  doc.text(`Email: ${COMPANY.email}`, 14, 35);
  doc.text(`GST: ${COMPANY.gst}`, 14, 40);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("MOVING QUOTATION", 135, 20);

  const quoteNo = `QT-${Date.now().toString().slice(-6)}`;
  const quoteDate = new Date().toLocaleDateString();
  
  const validTill = new Date(
  Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString();
    doc.setFontSize(10);
    
    doc.text(`Quote No : ${quoteNo}`, 135, 28);
    doc.text(`Date : ${quoteDate}`, 135, 34);
    doc.text(`Valid Till : ${validTill}`, 135, 40);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  // Customer Information
doc.setDrawColor(180);

doc.roundedRect(14, 50, 85, 45, 3, 3);

doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text("Customer Information", 18, 58);

doc.setFont("helvetica", "normal");
doc.setFontSize(10);

doc.text(`Name : ${lead.name}`, 18, 66);
doc.text(`Phone : ${lead.phone}`, 18, 73);
doc.text(`Email : ${lead.email || "-"}`, 18, 80);

// Moving Information
doc.roundedRect(110, 50, 85, 45, 3, 3);

doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text("Moving Details", 114, 58);

doc.setFont("helvetica", "normal");
doc.setFontSize(10);

doc.text(`From : ${lead.movingFrom || "-"}`, 114, 66);
doc.text(`To : ${lead.movingTo || "-"}`, 114, 73);
doc.text(`Status : ${lead.status}`, 114, 80);

  autoTable(doc, {
  startY: 105,

  head: [["Service", "Amount (₹)"]],

  body: [
  ["Packing", formatCurrency(quotation.packing)],
  ["Loading", formatCurrency(quotation.loading)],
  ["Transportation", formatCurrency(quotation.transport)],
  ["Insurance", formatCurrency(quotation.insurance)],
  ["Unpacking", formatCurrency(quotation.unpacking)],
],

  theme: "grid",

  headStyles: {
    fillColor: [37, 99, 235],
    textColor: 255,
    fontStyle: "bold",
    halign: "center",
  },

  bodyStyles: {
    fontSize: 10,
  },

  columnStyles: {
    1: {
      halign: "right",
    },
  },
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
  startY: doc.lastAutoTable.finalY + 8,

  body: [
  ["Subtotal", formatCurrency(subtotal)],
  ["GST (18%)", formatCurrency(gst)],
  ["Grand Total", formatCurrency(total)],
],

  theme: "grid",

  bodyStyles: {
    fontSize: 11,
  },

  columnStyles: {
    1: {
      halign: "right",
    },
  },

  didParseCell(data) {
    if (data.row.index === 2) {
      data.cell.styles.fillColor = [22, 163, 74];
      data.cell.styles.textColor = 255;
      data.cell.styles.fontStyle = "bold";
    }
  },
});

  const y = doc.lastAutoTable.finalY + 20;

doc.setFont("helvetica", "bold");
doc.setFontSize(12);

doc.text("Terms & Conditions", 14, y);

doc.setFont("helvetica", "normal");
doc.setFontSize(10);

doc.text(
  "- Quotation is valid for 7 days.",
  14,
  y + 8
);

doc.text(
  "- GST is included where applicable.",
  14,
  y + 15
);

doc.text(
  "- Payment before shifting.",
  14,
  y + 22
);

doc.line(135, y + 30, 190, y + 30);

doc.setFont("helvetica", "bold");
doc.text(
  "Authorized Signature",
  140,
  y + 38
);
}