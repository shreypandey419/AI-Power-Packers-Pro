import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    status: {
        type: String,
        enum: ["New", "Contacted", "Completed"],
        default: "New",
    },

    email: {
      type: String,
      default: "",
    },

    movingFrom: {
      type: String,
      default: "",
    },

    movingTo: {
      type: String,
      default: "",
    },

priority: {
  type: String,
  enum: ["High", "Medium", "Low"],
  default: "Medium",
},

notes: {
  type: String,
  default: "",
},

followUpDate: {
  type: Date,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Lead", leadSchema);