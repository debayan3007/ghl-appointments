const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events.controller');
const dataValidation = require('../middlewares/dataValidation');

router.get('/', [dataValidation.validateGetAllEvents()] ,eventsController.getEventsController);
router.post('/', [dataValidation.validateCreateEvent()], eventsController.createEventsController);
router.get('/freeslots', [dataValidation.validateFreeSlots()], eventsController.getFreeSlotsController);

module.exports = router;
