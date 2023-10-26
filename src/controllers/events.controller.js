const { getEvents, createEvent, getFreeSlots } = require('../services/events.service');

async function getEventsController(req, res) {
    try {
        const {
            startdate: startDate,
            enddate: endDate,
        } = req.query;

        const events = await getEvents(startDate, endDate);

        res.status(200).send(events);
    } catch (err) {
        console.error(`Error while getting events ${err.message}`);
        res.status(500).send({message: `Error while getting event. ${err.message}`});
    }
}

async function createEventsController(req, res) {
    try {
        const event = req.body;

        const newEventResponse = await createEvent(event);
        let status = 200;
        if (newEventResponse.slotAlreadyBooked || newEventResponse.slotUnavailable) {
            status = 422;
        }
        res.status(status).send(newEventResponse);
    } catch (err) {
        console.error(`Error while creating event ${err.message}`);
        res.status(500).send({message: `Error while creating event. ${err.message}`});
    }
}

async function getFreeSlotsController(req, res) {
    try {
        let {
            date,
            timezone
        } = req.query;

        date = decodeURIComponent(date);
        timezone = decodeURIComponent(timezone);

        res.send(await getFreeSlots(date, timezone));
    } catch (err) {
        console.error(`Error while fetching free slots. ${err.message}`)
        res.send(500, {message: `Error while fetching free slots. ${err.message}`});
    }
}

module.exports = {
    getEventsController,
    createEventsController,
    getFreeSlotsController,
};
