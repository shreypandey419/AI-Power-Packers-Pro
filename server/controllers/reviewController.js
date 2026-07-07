import Review from "../models/Review.js";
import Booking from "../models/Booking.js";

export const createReview = async (req, res) => {
  try {

    console.log("Logged User:", req.user.id);
    console.log("Booking Id:", req.body.bookingId);

    const booking = await Booking.findOne({
      _id: req.body.bookingId,
    });

    console.log("Booking:", booking);
    console.log("Booking User:", booking?.user);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.bookingStatus !== "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Review can only be submitted after delivery.",
      });
    }

    const alreadyReviewed = await Review.findOne({
      booking: booking._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "Review already submitted.",
      });
    }

    const review = await Review.create({
      booking: booking._id,
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json({
      success: true,
      review,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const getReviews = async (req, res) => {
  try {

    const reviews = await Review.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const deleteReview = async (req, res) => {
  try {

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const getMyReview = async (req, res) => {
  try {

    const review = await Review.findOne({
      booking: req.params.bookingId,
      user: req.user.id,
    });

    res.json({
      success: true,
      review,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};