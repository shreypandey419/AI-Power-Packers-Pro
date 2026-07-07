import Quotation from "../models/Quotation.js";
import { sendQuotationEmail } from "../utils/sendQuotationEmail.js";

export const createQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.create(req.body);

    res.status(201).json({
      success: true,
      quotation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getLeadQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find({
      lead: req.params.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      quotations,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteQuotation = async (req, res) => {
  try {
    await Quotation.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate("lead");

    res.json({
      success: true,
      quotation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const emailQuotation = async (req, res) => {
  console.log("EMAIL ROUTE HIT");
  console.log(req.body);
  try {
    const { email } = req.body;

    await sendQuotationEmail({
      to: email,
      subject: "Quotation - Shrey Movers & Packers",
      text: `Dear Customer,

Thank you for choosing Shrey Movers & Packers.

Please find your quotation attached.

Regards,
Shrey Movers & Packers`,
      attachmentPath: "./quotation.pdf",
    });

    res.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};