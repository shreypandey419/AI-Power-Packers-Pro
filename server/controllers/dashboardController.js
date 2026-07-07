import Lead from "../models/Lead.js";
import Booking from "../models/Booking.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();

    const newLeads = await Lead.countDocuments({
      status: "New",
    });

    const contactedLeads = await Lead.countDocuments({
      status: "Contacted",
    });

    const completedLeads = await Lead.countDocuments({
      status: "Completed",
    });

    const highPriority = await Lead.countDocuments({
      priority: "High",
    });

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todayFollowUps = await Lead.countDocuments({
      followUpDate: {
        $gte: today,
      },
    });

    const conversionRate =
      totalLeads === 0
        ? 0
        : (
            (completedLeads / totalLeads) *
            100
          ).toFixed(1);

    res.json({
      success: true,

      totalLeads,
      newLeads,
      contactedLeads,
      completedLeads,
      highPriority,
      todayFollowUps,
      conversionRate,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const getRevenueChart = async (req, res) => {
  try {

    const bookings = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          revenue: {
            $sum: "$estimatedPrice",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const chart = bookings.map((item) => ({
      month: months[item._id.month - 1],
      revenue: item.revenue,
    }));

    res.json({
      success: true,
      chart,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const getDashboardOverview = async (req, res) => {
  try {
    const recentLeads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayFollowUps = await Lead.find({
      followUpDate: {
        $gte: today,
        $lt: tomorrow,
      },
    }).sort({ followUpDate: 1 });

    const recentBookings = await Booking.find()
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      recentLeads,
      todayFollowUps,
      recentBookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};