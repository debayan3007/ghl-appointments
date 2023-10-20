const express = require('express');
const router = express.Router();

const EventsController = require('../controllers/events.controller');

const eventsController = new EventsController();

const { validateGetAllEvents } = require('../middlewares/dataValidation');

router.get('/', eventsController.getEventsController);
router.post('/', eventsController.createEventsController);
router.get('/freeslots', eventsController.getFreeSlotsController);

module.exports = router;
