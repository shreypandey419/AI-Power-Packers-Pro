import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generateInvoice(booking) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(22);
  doc.setTextColor(37, 99, 235);
  doc.text("PackersPro Invoice", 14, 20);

  // Company Details
  doc.setFontSize(11);
  doc.setTextColor(80);

  doc.text("PackersPro", 14, 30);
  doc.text("India", 14, 36);
  doc.text("support@packerspro.com", 14, 42);

  // Invoice Info
  doc.setTextColor(0);

  doc.text(`Invoice ID: ${booking._id}`, 14, 56);
  doc.text(
    `Date: ${new Date().toLocaleDateString()}`,
    14,
    63
  );

  autoTable(doc, {
    startY: 75,

    head: [["Field", "Value"]],

    body: [
      ["Moving From", booking.movingFrom],
      ["Moving To", booking.movingTo],
      ["House Type", booking.houseType],
      [
        "Shifting Date",
        new Date(booking.shiftingDate).toLocaleDateString(),
      ],
      ["Packing", booking.packing ? "Yes" : "No"],
      ["Insurance", booking.insurance ? "Yes" : "No"],
      ["Estimated Price", `₹ ${booking.estimatedPrice}`],
      ["Payment", booking.paymentStatus],
      ["Booking Status", booking.bookingStatus],
    ],
  });

  doc.setFontSize(12);

  doc.text(
    "Thank you for choosing PackersPro!",
    14,
    doc.lastAutoTable.finalY + 20
  );

  doc.save(`Invoice-${booking._id}.pdf`);
}