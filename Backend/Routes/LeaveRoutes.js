const express = require("express");
const { applyLeave, getLeaves, updateLeaveStatus } = require("../controllers/LeaveController");

const router = express.Router();

router.post("/apply", applyLeave); // Apply for leave
router.get("/", getLeaves); // Get all leaves
router.put("/:id/status", updateLeaveStatus); // Update leave status

module.exports = router;
