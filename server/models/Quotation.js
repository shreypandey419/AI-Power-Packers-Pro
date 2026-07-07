import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    quoteNo: {
      type: String,
      required: true,
      unique: true,
    },

    packing: Number,
    loading: Number,
    transport: Number,
    insurance: Number,
    unpacking: Number,

    subtotal: Number,
    gst: Number,
    total: Number,

    status: {
      type: String,
      default: "Generated",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Quotation",
  quotationSchema
);