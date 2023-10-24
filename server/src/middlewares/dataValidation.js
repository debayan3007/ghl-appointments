const { Request, Response, NextFunction } = require("express");
const moment = require('moment');

const validateGetAllEvents = (context) => {
    return (req, res, next) => {
        const {
            startdate: startDate,
            enddate: endDate,
        } = req.query;
        console.log("validating");
        if (!moment(startDate, "MM/DD/YYYY").isValid()) {
            res.status(403).send({ error: 'startdate is invalid' });
        }
        if (!moment(endDate, "MM/DD/YYYY").isValid()) {
            res.status(403).send({ error: 'enddate is invalid' });
        }
        next();
    };
};

module.exports = {
    validateGetAllEvents
};
