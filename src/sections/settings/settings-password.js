import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Snackbar,
  Stack,
  TextField
} from '@mui/material';
import { updateAdminSettings } from '../../utils/set-settings';
import { useAuth } from '../../hooks/use-auth';

export const SettingsPassword = () => {
  const [formModified, setFormModified] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });
  const auth = useAuth()
  const { admin } = auth;
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform submit logic only if the form is modified
    if (values.password !== values.confirm) {
      setSnackbarMessage('Passwords do not match');
      return; // Exit the function if passwords don't match
    }
    // console.log(values, 'values');
    try {
      await updateAdminSettings(values, admin);
      setSnackbarMessage('Admin settings updated successfully!');
      setFormModified(false); // Reset form modification status
    } catch (error) {
      setSnackbarMessage('Error updating admin settings');
      console.error('Error updating user data:', error);
      // Handle the error (e.g., show a notification to the user)
    }
  }
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
        <Card sx={{ border: '1px solid #556ee6' }}>
          <CardHeader
            subheader="Update password"
            title="Password"
          />
          <Divider />
          <CardContent>
            <Stack
              spacing={3}
              sx={{ maxWidth: 400 }}
            >
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password}
              />
              <TextField
                fullWidth
                label="Password (Confirm)"
                name="confirm"
                onChange={handleChange}
                type="password"
                value={values.confirm}
              />
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type='submit' onClick={handleSubmit}>
              Update
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};
