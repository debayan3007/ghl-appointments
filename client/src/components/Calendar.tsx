import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar(setDate: Function) {
    // const [date, setDate] = useState(null);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
            onChange={(newValue) => {
                console.log({newValue}, );
                setDate(newValue);
            }}
        />
        </LocalizationProvider>
    );
}