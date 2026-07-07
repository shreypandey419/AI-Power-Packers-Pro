import express from "express";
import auth from "../middleware/auth.js";

import {
  getDashboardStats,
  getDashboardOverview,
  getRevenueChart,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", auth, getDashboardStats);

router.get("/overview", auth, getDashboardOverview);

router.get("/revenue-chart", auth, getRevenueChart);

export default router;