import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadImage = async (req, res) => {
  console.log("UPLOAD ROUTE HIT");
  console.log(req.file);
  console.log(req.user);

  try {

    if (!req.file) {
      return res.status(400).json({
        success:false,
        message:"No image selected"
      });
    }

    const upload = () =>
      new Promise((resolve,reject)=>{

        const stream =
          cloudinary.uploader.upload_stream(

            {
              folder:"packerspro/profile"
            },

            (err,result)=>{

              if(err) reject(err);
              else resolve(result);

            }

          );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);

      });

    const result = await upload();

    const user = await User.findByIdAndUpdate(

      req.user.id,

      {
        profileImage: result.secure_url
      },

      {
        new:true
      }

    );

    res.json({

      success:true,
      image:result.secure_url,
      user

    });

  }

  catch (err) {
  console.log("============== UPLOAD ERROR ==============");
  console.log(err);
  console.log(err.message);

  if (err.response) {
    console.log(err.response);
  }

  res.status(500).json({
    success: false,
    message: err.message,
  });
}

};