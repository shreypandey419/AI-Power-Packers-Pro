import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      pincode,
      profileImage,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        phone,
        dob,
        gender,
        address,
        city,
        state,
        pincode,
        profileImage,
      },
      {
        new: true,
      }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};