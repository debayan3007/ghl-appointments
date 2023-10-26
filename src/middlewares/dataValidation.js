const { Request, Response, NextFunction } = require("express");
const moment = require('moment');

const validateDate = (date) => moment(date, "DD/MM/YYYY").isValid();
const validateTime24Format = (time) => !!time.match(/([0-1]\d|2[0-3]):([0-5]\d)/igm);

const validateGetAllEvents = () => {
    return (req, res, next) => {
        const {
            startdate: startDate,
            enddate: endDate,
        } = req.query;
        if (!validateDate(startDate)) {
                res.status(403).send({ error: 'startdate is invalid' });
            return;
        }
        if (!validateDate(endDate)) { 
            res.status(403).send({ error: 'enddate is invalid' });
            return;
        }
        next();
    };
};

const validateCreateEvent = () => {
    return (req, res, next) => {
        const {
            date,
            time,
            timezone,
          } = req.body;
        
        // date
        if (!validateDate(date)) {
            res.status(403).send({ error: 'date is invalid' });
            return;
        }

        // time
        if (!validateTime24Format(time)) {
            res.status(403).send({ error: 'time is invalid' });
            return;
        }

        if (!moment.tz.zone(timezone)) {
            res.status(403).send({ error: 'timezone is invalid' })
        }

        next();
    }
};

const validateFreeSlots = () => {
    return (req, res, next) => {
        const {
            date,
            timezone,
        } = req.query;

        if (!validateDate(date)) {
            res.status(403).send({ error: 'date is invalid' });
            return;
        }

        if (!moment.tz.zone(timezone)) {
            res.status(403).send({ error: 'timezone is invalid' });
            return;
        }

        next();
    }
}

module.exports = {
    validateGetAllEvents,
    validateCreateEvent,
    validateFreeSlots,
};
