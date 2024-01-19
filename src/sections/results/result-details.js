import { useCallback, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Stack } from '@mui/system';
import dayjs from 'dayjs';

const states = [
    {
        value: '',
        label: ''
    },
    {
        value: 'alabama',
        label: 'Alabama'
    },
    {
        value: 'new-york',
        label: 'New York'
    },
    {
        value: 'san-francisco',
        label: 'San Francisco'
    },
    {
        value: 'los-angeles',
        label: 'Los Angeles'
    }
];
const session = [
    {
        value: '',
        label: ''
    },
    {
        value: 'open',
        label: 'Open'
    },
    {
        value: 'close',
        label: 'Close'
    },
];

export const ResultDetails = ({ setShow, handleValues }) => {
    const [values, setValues] = useState({
        result_date: dayjs().format('YYYY-MM-DD'),
        game_name: '',
        // subtitle: '***-**-***',
        // password: 'demo@123',
        session: '',
        // close: '10:45 PM',
        // coins: 1000,
        // phone: '8209555243',
        // state: 'los-angeles',
        // country: 'USA'
    });

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );
    const handleTimeChange = useCallback(
        (name, newValue) => {
            // Ensure that newValue is a Date object
            // const selectedTime = newValue instanceof Date ? newValue : new Date();

            // Extract the time portion
            const timeValue = newValue.format('hh:mm A');

            // Update the state
            setValues((prevState) => ({
                ...prevState,
                [name]: timeValue,
            }));
        },
        []
    );
    const handleSubmit = (event) => {
        event.preventDefault();
        // Other form submission logic

        // If the form is successfully submitted, call the callback function
        setShow(true);
        handleValues(values);
    };

    console.log(values, 'values')
    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        >
            <Card>
                <CardHeader
                    // subheader="The information can be edited"
                    title="Select Game"
                />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            {/* <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    // helperText="Please specify the first name"
                                    label="Game Title"
                                    name="title"
                                    onChange={handleChange}
                                    required
                                    value={values.title}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Please specify the Yes or No"
                                    label="Active status"
                                    name="isPlay"
                                    onChange={handleChange}
                                    required
                                    value={values.isPlay}
                                />
                            </Grid> */}
                            <Grid
                                xs={12}
                                md={6}
                                lg={6}
                            >
                                <Stack sx={{
                                    '& .css-4jnixx-MuiStack-root': {
                                        padding: '2px'
                                    }
                                }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker
                                                label="Result Date"
                                                value={dayjs(values.result_date)}
                                                onChange={(newValue) => {
                                                    setValues((prevState) => ({
                                                        ...prevState,
                                                        result_date: newValue.format('YYYY-MM-DD'),
                                                    }));
                                                }}
                                                textField={(props) => (
                                                    <TextField fullWidth label="Result Date" {...props} sx={{ width: '100%' }} />
                                                )}
                                                slotProps={{
                                                    textField: {
                                                        helperText: 'MM/DD/YYYY',
                                                    },
                                                }}
                                                maxDate={dayjs()} // Disable future dates
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Stack>
                                {/* <TextField
                                    fullWidth
                                    label="Open Time"
                                    name="open"
                                    type='timepicker'
                                    onChange={handleChange}
                                    required
                                    value={values.open}
                                /> */}
                            </Grid>
                            {/* <Grid
                                xs={12}
                                md={6}
                            >
                                <Stack sx={{
                                    '& .css-4jnixx-MuiStack-root': {
                                        padding: '2px'
                                    }
                                }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker']}>
                                            <TimePicker
                                                label="Close Time"
                                                value={dayjs(values.close, 'hh:mm A')}
                                                onChange={(newValue) => handleTimeChange('close', newValue)}
                                                textField={(props) => (
                                                    <TextField
                                                        fullWidth
                                                        label="Close Time"
                                                        {...props}
                                                        sx={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                )}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Stack>
                            </Grid> */}
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Select Game Name"
                                    name="game_name"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.game_name}
                                >
                                    {states.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid
                                xs={12}
                                md={3}
                            >
                                <TextField
                                    fullWidth
                                    label="Select Session"
                                    name="session"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.session}
                                >
                                    {session.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Go
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
