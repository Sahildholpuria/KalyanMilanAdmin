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
    Unstable_Grid2 as Grid,
    Snackbar
} from '@mui/material';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../contexts/firebase';
import { updateAdminSettings } from '../../utils/set-settings';
import { SendRandomNotification } from '../../utils/send-result-notification';

export const SendNotification = () => {
    const [formModified, setFormModified] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [values, setValues] = useState({
        title: '',
        content: '',
    });

    const handleChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            setValues((prevState) => ({
                ...prevState,
                [name]: value,
            }));
            setFormModified(true); // Set form as modified when any field changes
        },
        []
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formModified) {
            // Perform submit logic only if the form is modified
            if (!values.title || !values.content) {
                setSnackbarMessage('All fields are required!')
                return;
            }
            // console.log(values, 'values');
            try {
                await SendRandomNotification(values.title, values.content);
                setSnackbarMessage('Notification Sent Successfully!');
                setFormModified(false); // Reset form modification status
                setValues((prevState) => ({
                    ...prevState,
                    title: '',
                    content: '',
                }));
            } catch (error) {
                setSnackbarMessage('Error Sending Notification');
                console.error('Error updating user data:', error);
                // Handle the error (e.g., show a notification to the user)
            }
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };
    console.log(values)
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
                        subheader="You can send notification from here"
                        title="Notification"
                    />
                    <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                            <Grid
                                container
                                spacing={3}
                                sx={{ alignContent: 'center', flexDirection: 'column'}}
                            >
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Notification Title"
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
                                        label="Notification Content"
                                        name="content"
                                        onChange={handleChange}
                                        required
                                        value={values.content}
                                        rows={5}
                                        multiline
                                    />
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
