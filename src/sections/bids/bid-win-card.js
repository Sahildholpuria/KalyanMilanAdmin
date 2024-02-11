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
import { BidHistoryDialog } from '../../utils/bid-history';
import { useEffect, useState } from 'react';
import nProgress from 'nprogress';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../contexts/firebase';

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

export const BidWinCard = ({ values, handleOpenSnackbar }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openDialog, setOpenDialog] = useState(false);
    const [win, setWin] = useState(false);
    const [totalBid, setTotalBid] = useState(0);
    const [totalWin, setTotalWin] = useState(0);
    const [profit, setProfit] = useState(0);
    const handleOpenDialog = (name) => {
        if(name === 'Bid'){
        }else{
            setWin(true);
        }
      setOpenDialog(true);
    }
    
    const handleCloseDialog = () => {
        setWin(false);
      setOpenDialog(false);
    }
    const fetchData = async () => {
        try {
            nProgress.start();
            // Replace this with the actual logic to fetch data from your source
            // For example, if you're using Firestore
            const formattedDate = new Date(values.result_date).toDateString();
            const q = query(collection(db, 'User_Events'), where('date', '==', formattedDate), where('event', '==', values.game_name), orderBy('won', 'asc'));
            await onSnapshot(q, (querySnapshot) => {
                if (querySnapshot.empty) {
                    // setResultData([]);
                    handleOpenSnackbar('No Data available!')
                } else {
                    let total = 0; // Initialize total points
                    querySnapshot.forEach(doc => {
                        const data = doc.data();
                        total += Number(data.won); // Add points from each document to the total
                    });
                    setTotalWin(total);
                    handleOpenDialog('Data Fetched Successfully!')
                }
            })
        } catch (error) {
            console.error('Error fetching result data:', error);
        }
        try {
            nProgress.start();
            // Replace this with the actual logic to fetch data from your source
            // For example, if you're using Firestore
            const formattedDate = new Date(values.result_date).toDateString();
            const q = query(collection(db, 'User_Events'), where('date', '==', formattedDate), where('event', '==', values.game_name));
            await onSnapshot(q, (querySnapshot) => {
                if (querySnapshot.empty) {
                    // setResultData([]);
                    handleOpenSnackbar('No Data available!')
                } else {
                    let total = 0; // Initialize total points
                    querySnapshot.forEach(doc => {
                        const data = doc.data();
                        total += Number(data.points); // Add points from each document to the total
                    });
                    setTotalBid(total); // Set the total bid amount
                    handleOpenDialog('Data Fetched Successfully!')
                }
            })
        } catch (error) {
            console.error('Error fetching result data:', error);
        } finally {
            setTimeout(() => {
                nProgress.done();
            }, 1000);
        }
    };
    const calculateProfit = (bid, win) => {
        if (bid > win) {
            setProfit(bid - win);
        } else {
            setProfit(0);
        }
    };
    useEffect(() => {
        // if (valuesResult?.date) {
        // Fetch data based on date
        fetchData();
        // }
    }, [values]);
    useEffect(() => {
        calculateProfit(totalBid, totalWin);
    }, [totalBid, totalWin])
    
    return (
        <Card sx={{ border: '1px solid #556ee6' }}>
            <CardContent sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Grid xs={12} md={12} sx={{ width: isMobile ? '100%' : '50%', display: 'flex', gap: "15px", flexDirection: 'column' }}>
                    <Grid
                        xs={12}
                        sm={6}
                        lg={6}
                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', border: '1px dashed rgb(85 110 230 / 0.32)', padding: '10px', alignItems: 'center' }}
                    >
                        <Typography variant='h5' color='info.main'>Total Bid Amount</Typography>
                        <Typography variant='h5' color='info.main'>{totalBid}</Typography>
                        <Button
                            variant="outlined"
                            onClick={() => handleOpenDialog('Bid')}
                        >
                            View
                        </Button>
                    </Grid>
                    <Grid
                        xs={12}
                        sm={6}
                        lg={6}
                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', border: '1px dashed rgb(85 110 230 / 0.32)', padding: '10px', alignItems: 'center' }}
                    >
                        <Typography variant='h5' color='info.dark'>Total Win Amount</Typography>
                        <Typography variant='h5' color='info.dark'>{totalWin}</Typography>
                        <Button
                            variant="outlined"
                            onClick={() => handleOpenDialog('Win')}
                        >
                            View
                        </Button>
                    </Grid>
                    <Grid
                        xs={12}
                        sm={6}
                        lg={6}
                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'success.light', padding: '10px' }}
                    >
                        <Typography variant='h5' color='white'>Total Profit Amount</Typography>
                        <Typography variant='h5' color='white'>{profit}</Typography>
                    </Grid>
                </Grid>
                <Grid xs={12} md={6} sx={{ width: '50%', display: isMobile ? 'none' : 'block' }}>
                    {/* <img src={logo} alt='profile' style={{ maxWidth: '100%', height: 'auto' }} /> */}
                </Grid>
            </CardContent>
            <Divider />
            <BidHistoryDialog 
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                values={values}
                win={win}
            />
        </Card>
    )
};
