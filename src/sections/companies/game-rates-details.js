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
import { updateGameRates } from '../../utils/set-game-rates';
const fields = [
    { label: 'Single Digit Value 1', name: 'singleDigitValue1' },
    { label: 'Single Digit Value 2', name: 'singleDigitValue2' },
    { label: 'Jodi Digit Value 1', name: 'jodiDigitValue1' },
    { label: 'Jodi Digit Value 2', name: 'jodiDigitValue2' },
    { label: 'Single Panna Value 1', name: 'singlePannaValue1' },
    { label: 'Single Panna Value 2', name: 'singlePannaValue2' },
    { label: 'Double Panna Value 1', name: 'doublePannaValue1' },
    { label: 'Double Panna Value 2', name: 'doublePannaValue2' },
    { label: 'Triple Panna Value 1', name: 'triplePannaValue1' },
    { label: 'Triple Panna Value 2', name: 'triplePannaValue2' },
    { label: 'Half Sangam Value 1', name: 'halfSangamValue1' },
    { label: 'Half Sangam Value 2', name: 'halfSangamValue2' },
    { label: 'Full Sangam Value 1', name: 'fullSangamValue1' },
    { label: 'Full Sangam Value 2', name: 'fullSangamValue2' },
];
export const GameRatesDetails = () => {
    const [formModified, setFormModified] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [values, setValues] = useState({
        singleDigitValue1: '',
        singleDigitValue2: '',
        jodiDigitValue1: '',
        jodiDigitValue2: '',
        singlePannaValue1: '',
        singlePannaValue2: '',
        doublePannaValue1: '',
        doublePannaValue2: '',
        triplePannaValue1: '',
        triplePannaValue2: '',
        halfSangamValue1: '',
        halfSangamValue2: '',
        fullSangamValue1: '',
        fullSangamValue2: '',
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
            if (!values.singleDigitValue1 || !values.singleDigitValue2 || !values.jodiDigitValue1 || !values.jodiDigitValue2 || !values.singlePannaValue1 || !values.singlePannaValue2 || !values.doublePannaValue1 || !values.doublePannaValue2 || !values.triplePannaValue1 || !values.triplePannaValue2 || !values.halfSangamValue1 || !values.halfSangamValue2 || !values.fullSangamValue1 || !values.fullSangamValue2) {
                setSnackbarMessage('All fields are required!')
                return;
            }
            // console.log(values, 'values');
            try {
                await updateGameRates(values);
                setSnackbarMessage('Game Rates updated successfully!');
                setFormModified(false); // Reset form modification status
            } catch (error) {
                setSnackbarMessage('Error updating Game Rates');
                console.error('Error updating user data:', error);
                // Handle the error (e.g., show a notification to the user)
            }
        }
    }
    const handleSettings = async () => {
        try {
            const q = query(collection(db, 'admin'), where('name', '==', 'GameRates'));
            await onSnapshot(q, (querySnapshot) => {
                // Assuming there is only one document for 'admin'
                const adminData = querySnapshot.docs[0].data();
                setValues({
                    singleDigitValue1: adminData?.singleDigitValue1 || '',
                    singleDigitValue2: adminData?.singleDigitValue2 || '',
                    jodiDigitValue1: adminData?.jodiDigitValue1 || '',
                    jodiDigitValue2: adminData?.jodiDigitValue2 || '',
                    singlePannaValue1: adminData?.singlePannaValue1 || '',
                    singlePannaValue2: adminData?.singlePannaValue2 || '',
                    doublePannaValue1: adminData?.doublePannaValue1 || '',
                    doublePannaValue2: adminData?.doublePannaValue2 || '',
                    triplePannaValue1: adminData?.triplePannaValue1 || '',
                    triplePannaValue2: adminData?.triplePannaValue2 || '',
                    halfSangamValue1: adminData?.halfSangamValue1 || '',
                    halfSangamValue2: adminData?.halfSangamValue2 || '',
                    fullSangamValue1: adminData?.fullSangamValue1 || '',
                    fullSangamValue2: adminData?.fullSangamValue2 || '',
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
                        subheader="You can edit game rates here"
                        title="Add Game Rates"
                    />
                    <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                            <Grid
                                container
                                spacing={3}
                            >
                                {fields.map((field) => (
                                    <Grid xs={12} md={6} key={field.name}>
                                        <TextField
                                            fullWidth
                                            label={field.label}
                                            name={field.name}
                                            onChange={handleChange}
                                            required
                                            value={values[field.name]}
                                        />
                                    </Grid>
                                ))}
                                {/* <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Single Digit Value 2"
                                        name="singleDigitValue2"
                                        onChange={handleChange}
                                        required
                                        value={values.singleDigitValue2}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Jodi Digit Value 1"
                                        name="jodiDigitValue1"
                                        onChange={handleChange}
                                        required
                                        value={values.jodiDigitValue1}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Jodi Digit Value 2"
                                        name="jodiDigitValue2"
                                        onChange={handleChange}
                                        required
                                        value={values.jodiDigitValue2}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Single Panna Value 1"
                                        name="singlePannaValue1"
                                        onChange={handleChange}
                                        required
                                        value={values.singlePannaValue1}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Single Panna Value 2"
                                        name="singlePannaValue2"
                                        onChange={handleChange}
                                        required
                                        value={values.singlePannaValue2}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Double Panna Value 1"
                                        name="doublePannaValue1"
                                        onChange={handleChange}
                                        required
                                        value={values.doublePannaValue1}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Double Panna Value 2"
                                        name="doublePannaValue2"
                                        onChange={handleChange}
                                        required
                                        value={values.doublePannaValue2}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Triple Panna Value 1"
                                        name="triplePannaValue1"
                                        onChange={handleChange}
                                        required
                                        value={values.triplePannaValue1}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Triple Panna Value 2"
                                        name="triplePannaValue2"
                                        onChange={handleChange}
                                        required
                                        value={values.triplePannaValue2}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Marchent ID"
                                        name="halfSangamValue1"
                                        onChange={handleChange}
                                        required
                                        value={values.halfSangamValue1}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Marchent ID"
                                        name="upi"
                                        onChange={handleChange}
                                        required
                                        value={values.upi}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Marchent ID"
                                        name="upi"
                                        onChange={handleChange}
                                        required
                                        value={values.upi}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="Marchent ID"
                                        name="upi"
                                        onChange={handleChange}
                                        required
                                        value={values.upi}
                                    />
                                </Grid> */}
                                
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
