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
import nProgress from 'nprogress';
import { updateUser } from '../../utils/get-single-user';

// const states = [
//   {
//     value: 'alabama',
//     label: 'Alabama'
//   },
//   {
//     value: 'new-york',
//     label: 'New York'
//   },
//   {
//     value: 'san-francisco',
//     label: 'San Francisco'
//   },
//   {
//     value: 'los-angeles',
//     label: 'Los Angeles'
//   }
// ];

export const AccountProfileDetails = ({ user, id }) => {
  const [formModified, setFormModified] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [values, setValues] = useState({
    name: '',
    // lastName: 'Visser',
    // password: '',
    email: '',
    coins: '',
    phone: '',
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formModified) {
      // Perform submit logic only if the form is modified
      if (!values.name || !values.coins || !values.email || !values.password || !values.phone) {
        setSnackbarMessage('All fields are required!')
        return;
      }
      // console.log(values, 'values');
      try {
        await updateUser(id, values);
        setSnackbarMessage('User data updated successfully!');
        setFormModified(false); // Reset form modification status
      } catch (error) {
        setSnackbarMessage('Error updating user data');
        console.error('Error updating user data:', error);
        // Handle the error (e.g., show a notification to the user)
      }
    }
  }

  useEffect(() => {
    if (user) {
      try {
        nProgress.start();
        setValues((preValues) => ({
          ...preValues,
          name: user?.name,
          password: user?.password,
          email: user?.email,
          coins: user?.coins,
          phone: user?.phone,
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
  const handleCloseSnackbar = () => {
    setSnackbarMessage(null);
  };
  // console.log(values, 'values')

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
            subheader="The information can be edited"
            title="Profile"
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
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                  />
                </Grid>
                {/* <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    required
                    value={values.password}
                  />
                </Grid> */}
                <Grid
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
                </Grid>
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
            <Button variant="contained" type='submit' onClick={handleSubmit} disabled={!formModified}>
              Save details
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};
