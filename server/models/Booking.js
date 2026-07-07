import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movingFrom: {
      type: String,
      required: true,
    },

    movingTo: {
      type: String,
      required: true,
    },

    houseType: {
      type: String,
      required: true,
    },

    shiftingDate: {
      type: Date,
      required: true,
    },

    packing: {
      type: Boolean,
      default: false,
    },

    insurance: {
      type: Boolean,
      default: false,
    },

    estimatedPrice: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    razorpayOrderId: {
      type: String,
    },

    razorpayPaymentId: {
      type: String,
    },

    razorpaySignature: {
      type: String,
    },

    driverName: {
  type: String,
  default: "",
},

driverPhone: {
  type: String,
  default: "",
},

vehicleNumber: {
  type: String,
  default: "",
},

vehicleType: {
  type: String,
  default: "",
},

    bookingStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Assigned",
        "In Transit",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);