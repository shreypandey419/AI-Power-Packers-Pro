import express from "express";
import auth from "../middleware/auth.js";

import {
  createQuotation,
  getLeadQuotations,
  deleteQuotation,
  getQuotation,
  emailQuotation,
} from "../controllers/quotationController.js";

const router = express.Router();

router.post("/", auth, createQuotation);

router.get(
  "/lead/:id",
  auth,
  getLeadQuotations
);

router.get(
  "/:id",
  auth,
  getQuotation
);

router.delete(
  "/:id",
  auth,
  deleteQuotation
);

router.post("/send-email", auth, emailQuotation);

router.post("/test-email", (req, res) => {
  console.log("TEST EMAIL ROUTE");
  console.log(req.body);

  res.json({
    success: true,
  });
});

export default router;