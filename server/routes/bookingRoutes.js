import express from "express";
import auth from "../middleware/auth.js";

import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  createPaymentOrder,
  getBookingById,
  cancelBooking,
  verifyPayment,
  exportBookingsExcel,
} from "../controllers/bookingController.js";

const router = express.Router();

// Customer
router.post("/", auth, createBooking);
router.get("/my", auth, getMyBookings);
router.get("/:id", auth, getBookingById);
router.post("/:id/create-order", auth, createPaymentOrder);
router.post("/verify-payment", auth, verifyPayment);
router.put("/:id/cancel", auth, cancelBooking);
router.get("/export/excel", auth, exportBookingsExcel);

// Admin
router.get("/", auth, getAllBookings);
router.put("/:id", auth, updateBookingStatus);

export default router;