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

export const SettingDetails = () => {
    const [values, setValues] = useState({
        upi: 'merchant730938.augp@aubank',
        message: 'This is Kalyan Sattta app Please share: https://www.bytenexttechnologies.in/',
        // password: 'demo@123',
        // email: 'demo@devias.io',
        // coins: 1000,
        // phone: '8209555243',
        // state: 'los-angeles',
        // country: 'USA'
    });

    const handleChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            setValues((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );
    console.log(values, 'values')

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        >
            <Card>
                <CardHeader
                    subheader="You can edit App settings here"
                    title="Edit App"
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
                                    label="Share Message"
                                    name="message"
                                    onChange={handleChange}
                                    required
                                    value={values.message}
                                    rows={10}
                                    multiline
                                />
                            </Grid>
                            {/* <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    value={values.email}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    onChange={handleChange}
                                    type="number"
                                    required
                                    value={values.phone}
                                />
                            </Grid>
                            <Grid
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
                    <Button variant="contained" type='submit'>
                        Save details
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
