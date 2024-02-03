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
    Snackbar,
    Typography
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Stack } from '@mui/system';
import dayjs from 'dayjs';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../contexts/firebase';
import { formatUserCount } from '../../utils/format-count';
import nProgress from 'nprogress';

const session = [
    {
        value: '',
        label: ''
    },
    {
        value: 'All Type',
        label: 'All Type'
    },
    {
        value: 'Single Digit',
        label: 'Single Digit'
    },
    {
        value: 'Jodi Digit',
        label: 'Jodi Digit'
    },
    {
        value: 'Single Panna',
        label: 'Single Panna'
    },
    {
        value: 'Double Panna',
        label: 'Double Panna'
    },
    {
        value: 'Triple Panna',
        label: 'Triple Panna'
    },
    {
        value: 'Half Sangam',
        label: 'Half Sangam'
    },
    {
        value: 'Full Sangam',
        label: 'Full Sangam'
    },
];

export const MarketBidDetails = () => {
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [values, setValues] = useState({
        game_name: '',
    });
    // State to hold game titles
    const [gameTitles, setGameTitles] = useState([
        {
            value: '',
            label: '',
        },
    ]);
    const [totalBids, setTotalBids] = useState(0);
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
    const handleValues = async () => {
        try {
            nProgress.start();
            const currentDate = new Date().toDateString();
            const q = query(collection(db, 'User_Events'), where('date', '==', currentDate), where('event', '==', values.game_name));
    
            onSnapshot(q, (querySnapshot) => {
                let totalPoints = 0;
    
                querySnapshot.forEach((doc) => {
                    const points = Number(doc.data().points);
                    totalPoints += points;
                });
    
                setTotalBids(totalPoints);
            });
            nProgress.done();
        } catch (error) {
            setSnackbarMessage('Error fetching Market Bids')
        }
    }
    
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Other form submission logic
    //     if (!values.game_name) {
    //         setSnackbarMessage('Please Fill all fields!');
    //         return;
    //     }
    //     // If the form is successfully submitted, call the callback function
    //     handleValues();
    // };
    useEffect(() => {
        fetchGameTitles();
    }, [])
    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };
    useEffect(() => {
      handleValues();
    }, [values.game_name])
    
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
                // onSubmit={handleSubmit}
            >
                <Card sx={{border: '1px solid'}}>
                    <CardHeader
                        // subheader="The information can be edited"
                        title="Market Bid Details"
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
                                                    label="Date"
                                                    value={dayjs(values.date)}
                                                    onChange={(newValue) => {
                                                        setValues((prevState) => ({
                                                            ...prevState,
                                                            date: newValue.format('YYYY-MM-DD'),
                                                        }));
                                                    }}
                                                    textField={(props) => (
                                                        <TextField fullWidth label="Date" {...props} sx={{ width: '100%' }} />
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
                                    md={6}
                                    sx={{textAlign: 'end'}}
                                >
                                    <Typography
                                        color="text.secondary"
                                        variant="overline"
                                    >
                                        Market Amount
                                    </Typography>
                                    <Typography variant="h4">
                                        ₹{formatUserCount(totalBids)}
                                    </Typography>
                                </Grid>
                                {/* <Grid
                                    xs={12}
                                    md={3}
                                >
                                    <TextField
                                        fullWidth
                                        label="Select Game Type"
                                        name="game_type"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.game_type}
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
                                </Grid> */}
                            </Grid>
                        </Box>
                    </CardContent>
                    {/* <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </CardActions> */}
                </Card>
            </form>
        </>
    );
};
