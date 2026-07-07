import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {

    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      notifications,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const markAsRead = async (req, res) => {
  try {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.json({
      success: true,
      notification,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};