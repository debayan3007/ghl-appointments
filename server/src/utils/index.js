const moment = require('moment');
const {
    START_HOURS,
    END_HOURS,
    TIMEZONE
} = require('../configs/general.config');

const getLocalDate = (dateString, time, timezone = TIMEZONE) => {
    try {
        if (!moment(dateString, 'DD/MM/YYYY').isValid()) {
            return;
        }
        return moment.tz(`${moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD')} ${time}`, timezone).tz(TIMEZONE);
    } catch(e) {
        console.error(e);
    }
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

module.exports = {
    getLocalDate,
    getHourNumber,
    ifWithinWorkHours,
}
