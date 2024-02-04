import { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
    Snackbar
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Stack } from '@mui/system';
import dayjs from 'dayjs';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../contexts/firebase';
import { format } from 'date-fns';
import nProgress from 'nprogress';

const session = [
    {
        value: '',
        label: ''
    },
    {
        value: 'Open',
        label: 'Open'
    },
    {
        value: 'Close',
        label: 'Close'
    },
];

export const SingleAnkDetails = ({ ankData, setAnkData }) => {
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [values, setValues] = useState({
        game_name: '',
        session: '',
    });
    const date = new Date();
    const currentDateFormatted = format(date, 'dd MMM yyyy');
    // State to hold game titles
    const [gameTitles, setGameTitles] = useState([
        {
            value: '',
            label: '',
        },
    ]);
    // Function to fetch game titles from Firebase
    const fetchGameTitles = async () => {
        try {
            // Replace this with the actual logic to fetch game titles from Firebase
            // For example, if you're using Firestore
            const eventsCollection = collection(db, 'Events');
            const eventsSnapshot = await getDocs(eventsCollection);

            const titles = eventsSnapshot.docs.map(doc => ({
                value: doc.data().title, // Keep original casing as label
                label: `${doc.data().title.toUpperCase()} (${doc.data().open} - ${doc.data().close})`, // Set value to lowercase
            }));

            // Update the gameTitles state by merging the existing titles with the new ones
            setGameTitles((prevTitles) => [...prevTitles, ...titles]);
        } catch (error) {
            console.error('Error fetching game titles:', error);
        }
    };
    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );
    const handleValues = () => {
        try {
            nProgress.start();
            const currentDate = new Date().toDateString();
            const q = query(collection(db, 'User_Events'), where('game', '==', 'Single Digit'), where('session', '==', values.session), where('date', '==', currentDate));

            onSnapshot(q, (querySnapshot) => {

                // Process the query snapshot
                querySnapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    const digit = values.session === 'Open' ? Number(data?.opendigit) : Number(data?.closedigit);
                    const ank = digit;
                    
                    // Accumulate total points and total bids for each Ank
                    ankData[ank].totalPoints += Number(data.points);
                    ankData[ank].totalBids += 1;
                });

                // Set the calculated data
                setAnkData(ankData);
            });
        } catch (error) {
            console.error(`Error fetching count for ${'User_Events'}`, error);
        } finally {
            setTimeout(() => {
                nProgress.done();
            }, 1000);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Other form submission logic
        if (!values.game_name || !values.session) {
            setSnackbarMessage('Please Fill all fields!');
            return;
        }
        // If the form is successfully submitted, call the callback function
        handleValues();
    };
    useEffect(() => {
        fetchGameTitles();
    }, [])
    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={!!snackbarMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
            <form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
            >
                <Card sx={{ border: '1px solid #556ee6' }}>
                    <CardHeader
                        // subheader="The information can be edited"
                        title={`Total Bids On Single Ank Of Date ${currentDateFormatted}`}
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
                                {/* <Grid
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
                                    </Stack> */}
                                {/* <TextField
                                    fullWidth
                                    label="Open Time"
                                    name="open"
                                    type='timepicker'
                                    onChange={handleChange}
                                    required
                                    value={values.open}
                                /> */}
                                {/* </Grid> */}
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
                                        {gameTitles.map((option, index) => (
                                            <option
                                                key={index}
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
        </>
    );
};
