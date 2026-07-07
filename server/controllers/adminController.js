import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
  {
    id: admin._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

    res.json({
      success: true,
      token,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {

    const bookings = await Booking.find();

    const totalBookings = bookings.length;

    const totalCustomers = await User.countDocuments();

    const totalRevenue = bookings
      .filter((b) => b.paymentStatus === "Paid")
      .reduce((sum, b) => sum + b.estimatedPrice, 0);

    const pending = bookings.filter(
      (b) => b.bookingStatus === "Pending"
    ).length;

    const confirmed = bookings.filter(
      (b) => b.bookingStatus === "Confirmed"
    ).length;

    const assigned = bookings.filter(
      (b) => b.bookingStatus === "Assigned"
    ).length;

    const inTransit = bookings.filter(
      (b) => b.bookingStatus === "In Transit"
    ).length;

    const delivered = bookings.filter(
      (b) => b.bookingStatus === "Delivered"
    ).length;

    const cancelled = bookings.filter(
      (b) => b.bookingStatus === "Cancelled"
    ).length;

    const paidBookings = bookings.filter(
      (b) => b.paymentStatus === "Paid"
    ).length;

    const pendingPayments = bookings.filter(
      (b) => b.paymentStatus === "Pending"
    ).length;

    const recentBookings = await Booking.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,

      totalRevenue,
      totalBookings,
      totalCustomers,

      pending,
      confirmed,
      assigned,
      inTransit,
      delivered,
      cancelled,

      paidBookings,
      pendingPayments,

      recentBookings,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};