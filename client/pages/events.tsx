import React from 'react';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Box, Button, Paper, Link, Stack } from '@mui/material';
import EventsTable from '../src/components/EventsTable';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


export default function Home() {
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(1, 'day'));
    const [events, setEvents] = useState([]);

    const Container = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        lineHeight: '60px',
        width: "50%",
        alignSelf: "center",
        elevation: "24",
        padding: "24px"
    }));

    const getEvents = () => {
        axios.get('http://localhost:2020/events', {
            params: {
                startdate: startDate.format('DD/MM/YYYY'),
                enddate: endDate.format('DD/MM/YYYY'),
            }
        }).then((response: AxiosResponse) => {
            setEvents(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    return (
        <Container>
            <Stack spacing={2} direction="row">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        format='DD/MM/YYYY'
                        label='Start date' value={startDate}
                        slotProps={{
                            textField: {
                            helperText: 'DD/MM/YYYY',
                            },
                        }}
                        onChange={(value) => {
                            if (!value) return;
                            setStartDate(value);
                            if (value > endDate) {
                                console.log('changing end date')
                                setEndDate(dayjs(value).add(1, 'days'));
                            }
                        }}
                    />
                    <DatePicker
                        format='DD/MM/YYYY'
                        label='End Date' value={endDate}
                        minDate={dayjs(startDate).add(1, 'days')}
                        slotProps={{
                            textField: {
                            helperText: 'DD/MM/YYYY',
                            },
                        }}
                        onChange={(value) => {
                            if (!value) return;
                            setEndDate(value);
                        }}
                    />
                </LocalizationProvider>
                <Button onClick={getEvents} variant="outlined">Get Events</Button>
                <Link href="/booking">Book Event</Link>
            </Stack>
            {events.length > 0 &&
                <EventsTable
                    headers={['clientName', 'date', 'timezone', 'time']}
                    rows={events}
                />
            }
        </Container>
    )
}
