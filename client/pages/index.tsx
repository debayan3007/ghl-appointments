import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import {
    Box,
    Divider,
    FormControl,
    Grid,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Typography,
    Link,
}  from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import axios, { AxiosResponse } from 'axios';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ConfirmDialog from '../src/components/ConfirmDialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Container = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    lineHeight: '60px',
    width: "50%",
    alignSelf: "center",
    elevation: "24",
    padding: "24px"
}));

export default function ButtonUsage() {
    const [date, setDate] = useState('-');
    const [timezone, setTimezone] = useState("Asia/Kolkata");
    const [freeSlots, setFreeslots] = useState([]);
    const [slot, setSlot] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setFreeslots([]);
      setDate('-');
      setOpen(false);
    };

    const bookEvent = (slot: string) => {
        console.log(`Booking event with ${date} and ${slot}`);

        console.log({
            date,
            time: slot,
            timezone: timezone,
        });

        axios.post('/api/events', {
            date,
            time: slot,
            timezone: timezone,
        }).then(function (response) {
            console.log(JSON.stringify(response.data));
            setSlot(slot);
            handleClickOpen();
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    useEffect(() => {
        axios.get('/api/events/freeslots', {
            params: {
                date,
                timezone
            }
        }).then((response: AxiosResponse) => {
            setFreeslots(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })

    }, [date, timezone])

    const handleTimezoneChange = (event: SelectChangeEvent) => {
        setTimezone(event.target.value);
    }
    
    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box>
                            <ListItem>
                                <HourglassEmptyIcon />
                                <ListItemText primary="DURATION" />
                            </ListItem>
                            <Typography marginLeft={"24px"} variant="h6">30 mins</Typography>
                            <Divider />
                            <ListItem>
                                <CalendarMonthIcon />
                                <ListItemText primary="DATE & TIME" />
                            </ListItem>
                            <Typography marginLeft={"24px"} variant="h6">{date}</Typography>
                            <Divider />
                            <ListItem>
                                <LanguageIcon />
                                <ListItemText primary="TIMEZONE" />
                            </ListItem>
                            <Typography marginLeft={"24px"} variant="h6">{timezone}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <FormControl fullWidth>
                            <Typography variant="h5" gutterBottom>
                                Select Date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                    disablePast={true}
                                    onChange={(value: any) => {
                                        setDate(value.format('DD/MM/YYYY'));
                                    }}
                                />
                            </LocalizationProvider>
                            <br/>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={timezone}
                                label="Select Timezone"
                                onChange={handleTimezoneChange}
                            >
                                <MenuItem value={"America/Los_Angeles"}>America/Los_Angeles</MenuItem>
                                <MenuItem value={"Asia/Kolkata"}>Asia/Kolkata</MenuItem>
                                <MenuItem value={"Australia/Sydney"}>Australia/Sydney</MenuItem>
                                <MenuItem value={"Australia/Sydney"}>Europe/Belgrade</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h5" gutterBottom>
                            Available Slots
                        </Typography>
                        <List sx={{overflow: 'auto',maxHeight: 300}}>
                            {freeSlots.map((slot, i) => (
                                <ListItem key={`slot-${i}`} sx={{overflow: 'auto'}}>
                                    <Button
                                        onClick={bookEvent.bind(null, slot)}
                                        variant="outlined"
                                    >
                                        {slot}
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
                <Link href="/appointments.html">Booked Events</Link>
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Appointment created"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Appointment is created at ${date} ${slot}.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}