const Leave = require("../models/Leave");

// Apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const { userId, name, role, date, reason } = req.body;
    const newLeave = new Leave({ userId, name, role, date, reason });
    await newLeave.save();
    res.status(201).json({ message: "Leave applied successfully", leave: newLeave });
  } catch (error) {
    res.status(500).json({ error: "Error applying for leave" });
  }
};

// Get all leave records
exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leaves" });
  }
};

// Update leave status (approve/reject)
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!leave) return res.status(404).json({ error: "Leave not found" });
    res.json({ message: "Leave status updated", leave });
  } catch (error) {
    res.status(500).json({ error: "Error updating leave status" });
  }
};
