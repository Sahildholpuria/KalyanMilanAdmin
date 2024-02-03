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
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../contexts/firebase';
import { updateAdminSettings } from '../../utils/set-settings';
import { Stack } from '@mui/system';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const SettingApp = () => {
    const [formModified, setFormModified] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [values, setValues] = useState({
        min_withdraw_amount: '',
        max_withdraw_amount: '',
        min_add_amount: '',
        max_add_amount: '',
        welcome_bonus: '',
        withdraw_close_time: '',
        withdraw_open_time: '',
    });

    const handleChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            setValues((prevState) => ({
                ...prevState,
                [name]: Number(value),
            }));
            setFormModified(true); // Set form as modified when any field changes
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
            setFormModified(true); // Set form as modified when any field changes
        },
        []
    );
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formModified) {
            // Perform submit logic only if the form is modified
            if (!values.min_add_amount || !values.max_add_amount || !values.min_withdraw_amount || !values.max_withdraw_amount || !values.withdraw_open_time || !values.withdraw_close_time) {
                setSnackbarMessage('All fields are required!')
                return;
            }
            // console.log(values, 'values');
            try {
                await updateAdminSettings(values);
                setSnackbarMessage('Admin settings updated successfully!');
                setFormModified(false); // Reset form modification status
            } catch (error) {
                setSnackbarMessage('Error updating admin settings');
                console.error('Error updating user data:', error);
                // Handle the error (e.g., show a notification to the user)
            }
        }
    }
    const handleSettings = async () => {
        try {
            const q = query(collection(db, 'admin'), where('name', '==', 'admin'));
            await onSnapshot(q, (querySnapshot) => {
                // Assuming there is only one document for 'admin'
                const adminData = querySnapshot.docs[0].data();
                setValues({
                    min_withdraw_amount: adminData.min_withdraw_amount || 0,
                    max_withdraw_amount: adminData.max_withdraw_amount || 0,
                    min_add_amount: adminData.min_add_amount || 0,
                    max_add_amount: adminData.max_add_amount || 0,
                    welcome_bonus: adminData.welcome_bonus || 0,
                    withdraw_close_time: adminData.withdraw_close_time || '',
                    withdraw_open_time: adminData.withdraw_open_time || '',
                });
            })
        } catch (error) {
            console.log(error, 'error')
        }
    }
    useEffect(() => {
        handleSettings();
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
                <Card sx={{border: '1px solid'}}>
                    <CardHeader
                        subheader="You can edit values settings here"
                        title="Add Values"
                    />
                    <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Minimum Deposit"
                                        name="min_add_amount"
                                        onChange={handleChange}
                                        required
                                        value={values.min_add_amount}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Maximum Deposit"
                                        name="max_add_amount"
                                        onChange={handleChange}
                                        required
                                        value={values.max_add_amount}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Minimum Withdrawal"
                                        name="min_withdraw_amount"
                                        onChange={handleChange}
                                        required
                                        value={values.min_withdraw_amount}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Maximum Withdrawal"
                                        name="max_withdraw_amount"
                                        onChange={handleChange}
                                        required
                                        value={values.max_withdraw_amount}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Welcome Bonus"
                                        name="welcome_bonus"
                                        onChange={handleChange}
                                        required
                                        value={values.welcome_bonus}
                                    />
                                </Grid>
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
                                            <DemoContainer components={['TimePicker']}>
                                                <TimePicker
                                                    label="Withdraw Open Time"
                                                    value={dayjs(values.withdraw_open_time, 'hh:mm A')}
                                                    onChange={(newValue) => handleTimeChange('withdraw_open_time', newValue)}
                                                    textField={(props) => (
                                                        <TextField
                                                            fullWidth
                                                            label="Withdraw Open Time"
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
                                </Grid>
                                <Grid
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
                                                    label="Withdraw Close Time"
                                                    value={dayjs(values.withdraw_close_time, 'hh:mm A')}
                                                    onChange={(newValue) => handleTimeChange('withdraw_close_time', newValue)}
                                                    textField={(props) => (
                                                        <TextField
                                                            fullWidth
                                                            label="Withdraw Close Time"
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
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained" type='submit' disabled={!formModified}>
                            Save details
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </>
    );
};
