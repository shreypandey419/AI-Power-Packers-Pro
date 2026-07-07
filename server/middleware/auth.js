import jwt from "jsonwebtoken";

export default function auth(req, res, next) {

  console.log("Authorization Header:");
  console.log(req.headers.authorization);

  const token = req.headers.authorization?.split(" ")[1];

  console.log("Token:");
  console.log(token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {

    console.log("JWT_SECRET:");
    console.log(process.env.JWT_SECRET);

    console.log("Token Received:");
    console.log(token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded JWT:");
    console.log(decoded);

    req.user = decoded;
    req.admin = decoded;

    next();

  } catch (err) {

    console.log("JWT VERIFY ERROR:");
    console.log(err);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }
}