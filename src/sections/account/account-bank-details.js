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
    Typography
} from '@mui/material';
import nProgress from 'nprogress';

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

export const AccountBankDetails = ({ user }) => {
    const [values, setValues] = useState({
        // firstName: 'Anika',
        // lastName: 'Visser',
        // password: 'demo@123',
        // email: 'demo@devias.io',
        // coins: 1000,
        // phone: '8209555243',
        // state: 'los-angeles',
        // country: 'USA',
        phonepe: '',
        googlepay: '',
        paytm: '',
    });

    // const handleChange = useCallback(
    //     (event) => {
    //         setValues((prevState) => ({
    //             ...prevState,
    //             [event.target.name]: event.target.value
    //         }));
    //     },
    //     []
    // );

    // const handleSubmit = useCallback(
    //     (event) => {
    //         event.preventDefault();
    //         console.log(values, 'values')
    //     },
    //     []
    // );
    useEffect(() => {
        if (user) {
            try {
                nProgress.start();
                setValues((preValues) => ({
                    ...preValues,
                    phonepe: user?.phonepe,
                    googlepay: user?.googlepay,
                    paytm: user?.paytm,
                }));
            } catch (error) {
                console.log(error, 'error')
            } finally {
                setTimeout(() => {
                    nProgress.done();
                }, 500);
            }
        }
    }, [user])
    return (
        // <form
        //     autoComplete="off"
        //     noValidate
        //     onSubmit={handleSubmit}
        // >
        <Card sx={{border: '1px solid #556ee6'}}>
            <CardHeader
                sx={{ color: 'info.dark' }}
                // subheader="The information can be edited"
                title="Bank Details"
            />
            <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                    <Grid
                        container
                        spacing={3}
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <Typography
                                // gutterBottom
                                variant="subtitle1"
                            >
                                Phonepe :
                            </Typography>
                            <Typography
                                color='text.secondary'
                                variant='subtitle2'
                            >
                                {values.phonepe ? values.phonepe : 'N/A'}
                            </Typography>
                            {/* <TextField
                                    fullWidth
                                    // helperText="Please specify the first name"
                                    label="First name"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                    value={values.firstName}
                                /> */}
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <Typography
                                // gutterBottom
                                variant="subtitle1"
                            >
                                GooglePay :
                            </Typography>
                            <Typography
                                color='text.secondary'
                                variant='subtitle2'
                            >
                                {values.googlepay ? values.googlepay : 'N/A'}
                            </Typography>
                            {/* <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    onChange={handleChange}
                                    // required
                                    value={values.password}
                                /> */}
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <Typography
                                // gutterBottom
                                variant="subtitle1"
                            >
                                Paytm :
                            </Typography>
                            <Typography
                                color='text.secondary'
                                variant='subtitle2'
                            >
                                {values.paytm ? values.paytm : 'N/A'}
                            </Typography>
                            {/* <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    value={values.email}
                                /> */}
                        </Grid>
                        {/* <Grid
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
            {/* <Divider /> */}
            {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Save details
                    </Button>
                </CardActions> */}
        </Card>
        // </form>
    );
};
