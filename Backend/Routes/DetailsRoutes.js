const express = require("express");
const EventModel = require("../models/Event");
const LeaveModel = require("../models/Leave");

const router = express.Router();

router.get("/:date", async (req, res) => {
  const { date } = req.params;

  try {
    const event = await EventModel.findOne({ date });
    const leave = await LeaveModel.findOne({ date });

    res.json({ event, leave }); // Send both event and leave
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
