import Booking from "../models/Booking.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Notification from "../models/Notification.js";
import ExcelJS from "exceljs";

export const createBooking = async (req, res) => {
  try {
    let estimatedPrice;

    switch (req.body.houseType) {
      case "1 BHK":
        estimatedPrice = 3500;
        break;

      case "2 BHK":
        estimatedPrice = 6000;
        break;

      case "3 BHK":
        estimatedPrice = 9000;
        break;

      case "4 BHK":
        estimatedPrice = 12000;
        break;

      case "Villa":
        estimatedPrice = 18000;
        break;

      default:
        estimatedPrice = 3500;
    }

    if (req.body.packing) {
      estimatedPrice += 1500;
    }

    if (req.body.insurance) {
      estimatedPrice += 1000;
    }
    const booking = await Booking.create({
      
      user: req.user.id,

      movingFrom: req.body.movingFrom,
      movingTo: req.body.movingTo,
      houseType: req.body.houseType,
      shiftingDate: req.body.shiftingDate,

      packing: req.body.packing,
      insurance: req.body.insurance,

      estimatedPrice,
    });

    await Notification.create({
      title: "New Booking",
      message: `New booking received from ${req.user.id}`,
      type: "booking",
    });

    res.status(201).json({
      success: true,
      booking,
    });

  }  catch (err) {

  console.log("BOOKING ERROR");
  console.log(err);

  res.status(500).json({
    success: false,
    message: err.message,
  });

}
};

export const getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      bookings,
    });

  } catch (err) {

  console.log("GET BOOKINGS ERROR");
  console.log(err);

  res.status(500).json({
    success: false,
    message: err.message,
  });

}
};

export const getAllBookings = async (req, res) => {
  try {

    const {
      status,
      search,
      fromDate,
      toDate,
    } = req.query;

    const filter = {};

    if (status) {
      filter.bookingStatus = status;
    }

    if (search) {
      filter.$or = [
        {
          movingFrom: {
            $regex: search,
            $options: "i",
          },
        },
        {
          movingTo: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (fromDate || toDate) {
      filter.shiftingDate = {};

      if (fromDate) {
        filter.shiftingDate.$gte = new Date(fromDate);
      }

      if (toDate) {
        filter.shiftingDate.$lte = new Date(toDate);
      }
    }

    const bookings = await Booking.find(filter)
      .populate("user")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      bookings,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const updateBookingStatus = async (req, res) => {
  try {

    console.log("REQ BODY:", req.body);
    
    const booking = await Booking.findById(req.params.id);

    console.log("Booking:", booking);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const {
      bookingStatus,
      driverName,
      driverPhone,
      vehicleNumber,
      vehicleType,
    } = req.body;

    if (bookingStatus) booking.bookingStatus = bookingStatus;
    if (driverName !== undefined) booking.driverName = driverName;
    if (driverPhone !== undefined) booking.driverPhone = driverPhone;
    if (vehicleNumber !== undefined) booking.vehicleNumber = vehicleNumber;
    if (vehicleType !== undefined) booking.vehicleType = vehicleType;

    await booking.save();

    res.json({
      success: true,
      booking,
      message: "Booking updated successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const getBookingById = async (req, res) => {
  try {

    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

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

    console.log("GET BOOKING ERROR");
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const createPaymentOrder = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id, });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const options = {
      amount: booking.estimatedPrice * 100,
      currency: "INR",
      receipt: booking._id.toString(),
    };

    const order = await razorpay.orders.create(options);

    booking.razorpayOrderId = order.id;
    await booking.save();

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      booking.bookingStatus !== "Pending" &&
      booking.bookingStatus !== "Confirmed"
    ) {
      return res.status(400).json({
        success: false,
        message: "Booking cannot be cancelled",
      });
    }

    booking.bookingStatus = "Cancelled";
    await booking.save();

    await Notification.create({
      title: "Booking Cancelled",
      message: `Booking ${booking._id} has been cancelled.`,
      type: "cancel",
    });

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id + "|" + razorpay_payment_id
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const booking = await Booking.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (booking.paymentStatus === "Paid") {
      return res.json({
        success: true,
        message: "Payment already verified",
        booking,
      });
    }

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.paymentStatus = "Paid";
    booking.bookingStatus = "Confirmed";
    booking.razorpayPaymentId = razorpay_payment_id;
    booking.razorpaySignature = razorpay_signature;

    await booking.save();

    await Notification.create({
      title: "Payment Received",
      message: `Payment of ₹${booking.estimatedPrice} received.`,
      type: "payment",
    });

    const updated = await Booking.findById(booking._id);

    console.log("Payment:", updated.paymentStatus);
    console.log("Status:", updated.bookingStatus);

    res.json({
      success: true,
      message: "Payment successful",
      booking,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const exportBookingsExcel = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("user")
      .sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("Bookings");

    sheet.columns = [
      { header: "Customer", key: "customer", width: 25 },
      { header: "From", key: "from", width: 20 },
      { header: "To", key: "to", width: 20 },
      { header: "House Type", key: "houseType", width: 15 },
      { header: "Shifting Date", key: "date", width: 18 },
      { header: "Price", key: "price", width: 15 },
      { header: "Payment", key: "payment", width: 15 },
      { header: "Status", key: "status", width: 18 },
      { header: "Driver", key: "driver", width: 20 },
      { header: "Vehicle", key: "vehicle", width: 20 },
    ];

    bookings.forEach((booking) => {
      sheet.addRow({
        customer: booking.user?.name || "",
        from: booking.movingFrom,
        to: booking.movingTo,
        houseType: booking.houseType,
        date: new Date(booking.shiftingDate).toLocaleDateString(),
        price: booking.estimatedPrice,
        payment: booking.paymentStatus,
        status: booking.bookingStatus,
        driver: booking.driverName || "-",
        vehicle: booking.vehicleNumber || "-",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Bookings.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};