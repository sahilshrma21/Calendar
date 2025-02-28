const express = require('express');
const router = express.Router();
const { createEvent, getEventByDate } = require('../controllers/EventController');

router.post("/",createEvent);
router.get("/:date",getEventByDate);

module.exports = router;