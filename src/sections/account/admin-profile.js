import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { format } from 'date-fns';
import logo from '../../components/profile-img.png';

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

export const AdminProfile = ({ user }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
            <CardContent sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Grid xs={12} md={6} sx={{width: isMobile ? '100%' : '50%'}}>
                    <Grid
                        xs={12}
                        sm={6}
                        lg={6}
                        sx={{ marginBottom: '20px', textAlign: 'center' }}
                    >
                        <Typography variant='h5' color='white'>Welcome to Kalyan Matkka Offical!</Typography>
                    </Grid>
                    <Grid
                        xs={12}
                        sm={6}
                        lg={6}
                        sx={{ marginBottom: '20px', textAlign: 'center' }}
                    >
                        <Typography variant='h5' color='white'>Admin dashboard</Typography>
                    </Grid>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            width: isMobile ? '100%' : '100%',
                        }}
                    >
                        <Avatar
                            src={user?.avatar}
                            sx={{
                                height: 100,
                                mb: 2,
                                width: 100,
                            }}
                        >
                            {getInitials(user?.name)}
                        </Avatar>
                        <Typography
                            gutterBottom
                            variant="h3"
                        >
                            {user?.name}
                        </Typography>
                        <Typography
                            color="text.primary"
                            variant="h6"
                        >
                            {user?.email}
                        </Typography>
                        {/* <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {formatDate(user?.date)}
                    </Typography> */}
                        {/* <Typography
                        color="text.primary"
                        variant="body2"
                    >
                        Available Balance : {user?.coins}
                    </Typography> */}
                    </Box>
                </Grid>
                <Grid xs={12} md={6} sx={{ width: '50%', display: isMobile ? 'none' : 'block' }}>
                    <img src={logo} alt='profile' style={{maxWidth: '100%', height: 'auto'}} />
                </Grid>
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
