const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events.controller');

router.get('/', eventsController.getEventsController);
router.post('/', eventsController.createEventsController);
router.get('/freeslots', eventsController.getFreeSlotsController);

module.exports = router;
