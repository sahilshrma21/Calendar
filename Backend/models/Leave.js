const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to student/staff
  name: { type: String, required: true }, // Name of the person
  role: { type: String, enum: ["student", "teacher", "staff"], required: true }, // Role type
  date: { type: Date, required: true }, // Leave date
  reason: { type: String, required: true }, // Reason for leave
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  }, // Approval status
});

module.exports = mongoose.model("Leave", leaveSchema);
