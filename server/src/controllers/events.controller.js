const { getEvents, createEvent, getFreeSlots } = require('../services/events.service');

async function getEventsController(req, res, next) {
    try {
        const {
            startdate: startDate,
            enddate: endDate,
        } = req.query;
        res.json(await getEvents(startDate, endDate));
    } catch (err) {
        console.error(`Error while getting events`, err.message);
        throw new Error(err);
    }
}

async function createEventsController(req, res, next) {
    try {
        const event = req.body;
        res.json(await createEvent(event));
    } catch (err) {
        console.error(`Error while creating event`, err.message);
        throw new Error(err);
    }
}

async function getFreeSlotsController(req, res, next) {
    try {
        let {
            date,
            timezone
        } = req.query;

        date = decodeURIComponent(date);
        timezone = decodeURIComponent(timezone);

        res.json(await getFreeSlots(date, timezone));

    } catch (err) {
        console.error(`Error while fetching free slots`, err.message)
        throw new Error(err);
    }
}

module.exports = {
    getEventsController,
    createEventsController,
    getFreeSlotsController,
};
