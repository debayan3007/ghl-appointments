const { addData, readData, readSingleData } = require('./db.service');
const {
    START_HOURS,
    END_HOURS,
    SLOT_DURATION,
    TIMEZONE
} = require('../configs/general.config');
const moment = require('moment');
require('moment-timezone');

const getLocalDate = (dateString, time, timezone = TIMEZONE) => {
    return moment.tz(moment(dateString, 'DD/MM/YYYY').format(`YYYY-MM-DD ${time}`), timezone).tz(TIMEZONE);
}

const getHourNumber = (date) => {
    return moment(date, "HH:mm").get('hours') + (moment(date, "HH:mm").get('minute') / 60);
}

const ifWithinWorkHours = (date) => {
    const startTime = getLocalDate(date, START_HOURS);
    const endTime = getLocalDate(date, END_HOURS);

    if (startTime <= moment(date) && moment(date) <= endTime) {
        return true;
    }
}

async function getEvents(startDate, endDate, timezone = TIMEZONE) {
    if (typeof startDate === 'string') {
        startDate = getLocalDate(startDate, "00:00", timezone);
    }
    if (typeof endDate === 'string') {
        endDate = getLocalDate(endDate, "23:59", timezone);
    }
    const eventList = await readData('events');

    const filteredEvents = eventList.filter(event => {
        const eventDate = getLocalDate(event.date, event.time);
        if (startDate <= eventDate && eventDate <= endDate) {
            return true;
        }
    })

    return filteredEvents;
}

async function getEvent(path) {
    return await readSingleData('events', path);
}

async function createEvent(eventPayload) {
    const {
        timezone,
        time,
        date,
    } = eventPayload;

    const localDate = getLocalDate(date, time, timezone);
    const path = localDate.format('DDMMYYYY-HHmm');

    // check if the local time is within working hours
    if (!ifWithinWorkHours(localDate)) {
        return {
            message: "The slot is outside work hours"
        }
    }

    // get event with same path ie DDMMYYYY-HHmm
    const existingEvent = await getEvent(path);
    if (existingEvent.exists) {
        return {
            message: "Event slot already booked"
        }
    }
    eventPayload.date = localDate.format("DD/MM/YYYY");
    eventPayload.time = localDate.format("HH:mm");
    return addData('events', path, path, eventPayload);
}

async function getFreeSlots(date, timezone) {
    const startTime = getLocalDate(date, "00:00", timezone);
    const endTime = moment(startTime).add(1, "days");
    console.log({startTime, endTime})

    const shiftStartHourLocal = getHourNumber(START_HOURS);
    const shiftEndHourLocal = getHourNumber(END_HOURS);
    console.log({shiftStartHourLocal, shiftEndHourLocal});
   
    const events = await getEvents(startTime, endTime, timezone);
  
    const eventTimes = events.map(eventDetail => {
        return eventDetail.time;
    });

    const slots = [];
    let currentSlot = moment(startTime);

    while(currentSlot < endTime) {
        console.log("iteration")
        let currentHour = getHourNumber(currentSlot.tz(TIMEZONE));
        console.log({
            currentHour,
            shiftStartHourLocal,
            shiftEndHourLocal,
            condition: currentHour < shiftStartHourLocal || currentHour > shiftEndHourLocal
        })
        if (currentHour < shiftStartHourLocal || currentHour > shiftEndHourLocal) {
            currentSlot.add(...SLOT_DURATION);
            continue;
        }
        
        const ifSlotBooked = eventTimes.every(eventTime => {
            console.log("slot booked iteration")
            console.log({eventTime, currentTime: currentSlot.format("HH:mm"), })
            if (eventTime === currentSlot.format("HH:mm")) {
                return true;
            }
            return false;
        });

        if (eventTimes.length > 0 && ifSlotBooked) {
            currentSlot.add(...SLOT_DURATION);
            continue;
        }
        slots.push(currentSlot.tz(timezone).format("HH:mm"));
        currentSlot.add(...SLOT_DURATION);
    }
    console.log(slots)
    return slots;
}

module.exports = {
    getEvents,
    createEvent,
    getFreeSlots,
};
 