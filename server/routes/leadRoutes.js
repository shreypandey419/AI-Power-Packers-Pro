import express from "express";
import Lead from "../models/Lead.js";
import auth from "../middleware/auth.js";
import ExcelJS from "exceljs";

const router = express.Router();

// Test Route
router.get("/test", (req, res) => {
  res.send("TEST WORKING");
});

// Create Lead
router.post("/", async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Protected Route - Get All Leads (Pagination)
router.get("/", auth, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;

const search = req.query.search || "";
const status = req.query.status || "";
const priority = req.query.priority || "";

const skip = (page - 1) * limit;

const query = {};

if (search) {
  query.$or = [
    {
      name: {
        $regex: search,
        $options: "i",
      },
    },
    {
      phone: {
        $regex: search,
        $options: "i",
      },
    },
    {
      email: {
        $regex: search,
        $options: "i",
      },
    },
  ];
}

if (status) {
  query.status = status;
}

if (priority) {
  query.priority = priority;
}

const total = await Lead.countDocuments(query);

const leads = await Lead.find(query)
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);

    res.json({
      success: true,
      leads,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Export Excel
router.get("/export/excel", async (req, res) => {
  try {
    console.log("✅ EXPORT ROUTE HIT");

    const leads = await Lead.find().sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Leads");

    worksheet.columns = [
      { header: "Name", key: "name", width: 25 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Moving From", key: "movingFrom", width: 20 },
      { header: "Moving To", key: "movingTo", width: 20 },
      { header: "Created At", key: "createdAt", width: 30 },
    ];

    leads.forEach((lead) => {
      worksheet.addRow({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        movingFrom: lead.movingFrom,
        movingTo: lead.movingTo,
        createdAt: new Date(lead.createdAt).toLocaleString(),
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Leads.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Protected Route - Get All Leads
router.get("/", auth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Update Lead Status
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      lead,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Update Complete Lead
router.put("/:id", auth, async (req, res) => {
  try {
    const {
      status,
      priority,
      notes,
      followUpDate,
    } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        status,
        priority,
        notes,
        followUpDate,
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Lead Updated Successfully",
      lead,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Protected Route - Delete Lead
router.delete("/:id", auth, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Lead Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;