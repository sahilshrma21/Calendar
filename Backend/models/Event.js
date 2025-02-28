const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Name of the person
  description: { type: String, required: true }, // Reason for leave
  date: { type: String, required: true }, // Leave date
});

module.exports = mongoose.model("Event", EventSchema);
