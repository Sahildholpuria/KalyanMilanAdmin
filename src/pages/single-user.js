// import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Button, SvgIcon } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { AccountProfile } from '../sections/account/account-profile';
import { AccountProfileDetails } from '../sections/account/account-profile-details';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowUturnLeftIcon from '@heroicons/react/24/solid/ArrowUturnLeftIcon';
import { AccountBankDetails } from '../sections/account/account-bank-details';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { fetchUserData } from '../utils/get-single-user';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../contexts/firebase';
import { SingleUserWithdrawTable } from '../sections/withdraw/single-user-withdraw-table';
import { SingleUserBidTable } from '../sections/bids/single-user-bid-table';
import { getRandomAvatar } from '../utils/get-initials';
import { SingleUserWinTable } from '../sections/winning/single-user-winning-table';

const User = () => {
    const params = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [bidpage, setBidPage] = useState(0);
    const [bidrowsPerPage, setBidRowsPerPage] = useState(5);
    const [winpage, setWinPage] = useState(0);
    const [winrowsPerPage, setWinRowsPerPage] = useState(5);
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
        },
        []
    );

    const handleRowsPerPageChange = useCallback(
        (event) => {
            setRowsPerPage(event.target.value);
        },
        []
    );
    const handleBidPageChange = useCallback(
        (event, value) => {
            setBidPage(value);
        },
        []
    );

    const handleBidRowsPerPageChange = useCallback(
        (event) => {
            setBidRowsPerPage(event.target.value);
        },
        []
    );
    const handleWinPageChange = useCallback(
        (event, value) => {
            setWinPage(value);
        },
        []
    );

    const handleWinRowsPerPageChange = useCallback(
        (event) => {
            setWinRowsPerPage(event.target.value);
        },
        []
    );
    const handleUsers = async () => {
        try {
            const q = query(collection(db, 'Withdraw_List'), where('phone', '==', user?.phone));
            await onSnapshot(q, (querySnapshot) => {
                setItems(querySnapshot.docs.map(doc => ({
                    id: doc.ref._key.path.segments.slice(-1)[0],
                    name: doc.data().name,
                    phone: doc.data().phone,
                    date: new Date(doc.data().time),
                    method: doc.data().method,
                    amount: doc.data().amount,
                    status: doc.data().status,
                })))
            })
        } catch (error) {
            console.log(error, 'error')
        }
    }
    useEffect(() => {
        if (user) {
            handleUsers();
        }
    }, [user])
    useEffect(() => {
        if (params.id) {
            fetchUserData(params.id, setUser);
        }
    }, [params.id]);
    // console.log(user, 'params')
    return (
        <>
            {/* <Head>
      <title>
        Account | Devias Kit
      </title>
    </Head> */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    User
                                </Typography>
                            </Stack>
                            <div>
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <ArrowUturnLeftIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    onClick={() => window.history.back()}
                                >
                                    Back
                                </Button>
                            </div>
                        </Stack>
                        <div>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={4}
                                >
                                    <AccountProfile user={user} />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    <AccountProfileDetails user={user} id={params?.id} />
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    xs={12}
                                    md={12}
                                    lg={12}
                                >
                                    <AccountBankDetails user={user} />
                                </Grid>
                            </Grid>
                        </div>
                        <SingleUserWithdrawTable
                            items={items}
                            count={items?.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                        <SingleUserBidTable
                            // count={users?.length}
                            // items={users}
                            valuesResult={user}
                            // handleRowSelect={handleRowSelect}
                            // onDeselectAll={customersSelection.handleDeselectAll}
                            // onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={handleBidPageChange}
                            onRowsPerPageChange={handleBidRowsPerPageChange}
                            // handleOpen
                            // handleOpenSnackbar={handleOpenSnackbar}
                            // onSelectAll={customersSelection.handleSelectAll}
                            // onSelectOne={customersSelection.handleSelectOne}
                            page={bidpage}
                            rowsPerPage={bidrowsPerPage}
                        // selected={customersSelection.selected}
                        // searchQuery={searchQuery} // Pass the search query as a prop
                        />
                        <SingleUserWinTable
                            // count={users?.length}
                            // items={users}
                            valuesResult={user}
                            // handleRowSelect={handleRowSelect}
                            // onDeselectAll={customersSelection.handleDeselectAll}
                            // onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={handleWinPageChange}
                            onRowsPerPageChange={handleWinRowsPerPageChange}
                            // handleOpenSnackbar={handleOpenSnackbar}
                            // onSelectAll={customersSelection.handleSelectAll}
                            // onSelectOne={customersSelection.handleSelectOne}
                            page={winpage}
                            rowsPerPage={winrowsPerPage}
                        // selected={customersSelection.selected}
                        // searchQuery={searchQuery} // Pass the search query as a prop
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    )
};

User.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default User;
