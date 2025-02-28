const Event = require("../models/Event");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const newEvent = new Event({ title, date, description });
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", Event: newEvent });
  } catch (error) {
    res.status(500).json({ error: "Error Creating Event" });
  }
};

// Get event by date
exports.getEventByDate = async (req, res) => {
    try {
      const event = await Event.findOne({ date: req.params.date });
      if (!event) return res.status(404).json({ message: "No event found" });
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
