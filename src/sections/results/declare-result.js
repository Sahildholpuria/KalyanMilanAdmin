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

export const DeclareResultDetails = () => {
    const [values, setValues] = useState({
        panna: '',
        digit: '',
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

    const handleSubmit = (event) => {
        event.preventDefault();
        // Other form submission logic

        // If the form is successfully submitted, call the callback function
        // setShow(true);
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
                    title="Declare Result"
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
                                    label="Select Panna"
                                    name="panna"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.panna}
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
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Digit"
                                    name="open"
                                    type='number'
                                    onChange={handleChange}
                                    // required
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={values.digit}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Declare
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
