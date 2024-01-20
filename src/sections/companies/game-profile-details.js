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
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Stack } from '@mui/system';
import dayjs from 'dayjs';
import nProgress from 'nprogress';
import { updateGame } from '../../utils/get-single-game';

export const GameProfileDetails = ({ games, id }) => {
    const [formModified, setFormModified] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [values, setValues] = useState({
        title: '',
        isActive: '',
        // subtitle: '***-**-***',
        // password: 'demo@123',
        open: '',
        close: '',
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
            // Capitalize the isActive value
            const capitalizedIsActive = values.isActive.toLowerCase() === 'yes' ? 'Yes' : 'No';

            console.log(values, 'values');
            try {
                // Update the isActive value in the form values
                setValues((prevState) => ({
                    ...prevState,
                    isActive: capitalizedIsActive,
                }));
                await updateGame(id, {
                    ...values,
                    isActive: capitalizedIsActive,
                });
                setSnackbarMessage('Game data updated successfully!');
                setFormModified(false); // Reset form modification status
            } catch (error) {
                setSnackbarMessage('Error updating game data');
                console.error('Error updating user data:', error);
                // Handle the error (e.g., show a notification to the user)
            }
        }
    }
    useEffect(() => {
        if (games) {
            try {
                nProgress.start();
                setValues((preValues) => ({
                    ...preValues,
                    title: games?.title,
                    isActive: games?.isActive,
                    open: games?.open,
                    close: games?.close,
                }));
            } catch (error) {
                console.log(error, 'error')
            } finally {
                setTimeout(() => {
                    nProgress.done();
                }, 500);
            }
        }
    }, [games])
    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };

    console.log(values, 'values')
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
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title="Details"
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
                                        name="isActive"
                                        onChange={handleChange}
                                        required
                                        value={values.isActive}
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
                                                    label="Open Time"
                                                    value={dayjs(values.open, 'hh:mm A')}
                                                    onChange={(newValue) => handleTimeChange('open', newValue)}
                                                    textField={(props) => (
                                                        <TextField
                                                            fullWidth
                                                            label="Open Time"
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
                                </Grid>
                                {/* <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Coins"
                                    name="coins"
                                    type='number'
                                    onChange={handleChange}
                                    required
                                    value={values.coins}
                                />
                            </Grid> */}
                                {/* <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
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
              </Grid> */}
                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Save details
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </>
    );
};
