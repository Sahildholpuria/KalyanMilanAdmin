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
    Switch,
    Typography
} from '@mui/material';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../contexts/firebase';
import { updateAdminSettings } from '../../utils/set-settings';

export const Maintainence = () => {
    const [formModified, setFormModified] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [values, setValues] = useState({
        app_maintainence: false,
        app_maintainence_text: '',
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
    const handleRadioChange = (event) => {
        setValues((prevState) => ({
            ...prevState,
            app_maintainence: event.target.checked,
        }));
        setFormModified(true);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formModified) {
            // Perform submit logic only if the form is modified
            if (!values.app_maintainence_text) {
                setSnackbarMessage('All fields are required!')
                return;
            }
            console.log(values, 'values');
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
                    app_maintainence: adminData.app_maintainence || false,
                    app_maintainence_text: adminData.app_maintainence_text || '',
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
                        subheader="You can edit App Maintainence settings here"
                        title="App Maintainence"
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
                                    sx={{display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center'}}
                                >
                                    <Switch
                                        checked={values.app_maintainence}
                                        onChange={handleRadioChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        color='warning'
                                    />
                                    <Typography variant='body1'>Show Message (On/Off)</Typography>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Share Message"
                                        name="app_maintainence_text"
                                        onChange={handleChange}
                                        required
                                        value={values.app_maintainence_text}
                                        rows={10}
                                        multiline
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained" type='submit' disabled={!formModified}>
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </>
    );
};
