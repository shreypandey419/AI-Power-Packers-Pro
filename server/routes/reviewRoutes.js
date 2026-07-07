import express from "express";
import auth from "../middleware/auth.js";


import {
  createReview,
  getReviews,
  deleteReview,
  getMyReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", auth, createReview);

router.get("/", getReviews);

router.get("/booking/:bookingId",auth,getMyReview);

router.delete("/:id", auth, deleteReview);

export default router;