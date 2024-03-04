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

export const SupportDetails = () => {
    const [formModified, setFormModified] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [values, setValues] = useState({
        phone_number: '',
        whatsapp: '',
        telegram: '',
        youtube: '',
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
            if (!values.phone_number || !values.whatsapp || !values.telegram) {
                setSnackbarMessage('All fields are required!')
                return;
            }
            if (values.phone_number.length > 10 || values.whatsapp.length > 10){
                setSnackbarMessage('Number must be 10 digit!')
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
                    phone_number: adminData.phone_number || '',
                    whatsapp: adminData.whatsapp || '',
                    telegram: adminData?.telegram || '',
                    youtube: adminData?.youtube || '',
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
                <Card sx={{border: '1px solid #556ee6'}}>
                    <CardHeader
                        subheader="You can edit Support settings here"
                        title="Add Support"
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
                                        label="Mobile Number"
                                        name="phone_number"
                                        onChange={handleChange}
                                        required
                                        value={values.phone_number}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="WhatsApp Number"
                                        name="whatsapp"
                                        onChange={handleChange}
                                        required
                                        value={values.whatsapp}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Telegram Link"
                                        name="telegram"
                                        onChange={handleChange}
                                        required
                                        value={values.telegram}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Youtube Link"
                                        name="youtube"
                                        onChange={handleChange}
                                        // required
                                        value={values.youtube}
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
