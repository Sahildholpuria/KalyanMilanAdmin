import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { format } from 'date-fns';

// const user = {
//   avatar: '/assets/avatars/avatar-anika-visser.png',
//   city: 'Los Angeles',
//   email: 'demo@devias.io',
//   date: 'Thu Jan 11 2024',
//   coins: 1000,
//   country: 'USA',
//   jobTitle: 'Senior Developer',
//   name: 'Anika Visser',
//   timezone: 'GTM-7'
// };

export const AccountProfile = ({ user }) => {
  console.log(user)
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'EEE, MMM d, yyyy h:mm a');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };
  return (
    <Card sx={{ backgroundColor: '#403e57' }}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user?.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          >
            {getInitials(user?.name)}
          </Avatar>
          <Typography
            gutterBottom
            variant="h5"
            color='success.main'
          >
            {user?.name}
          </Typography>
          <Typography
            color="warning.light"
            variant="body2"
          >
            {user?.email}
          </Typography>
          <Typography
            color="warning.main"
            variant="body2"
          >
            {formatDate(user?.date)}
          </Typography>
          <Typography
            color="success.light"
            variant="body2"
          >
            Available Balance : {user?.coins}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      {/* <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions> */}
    </Card>
  )
};
