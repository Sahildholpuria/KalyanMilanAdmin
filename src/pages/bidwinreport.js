// import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Snackbar } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { useCallback, useEffect, useState } from 'react';
import { WinningDetails } from '../sections/winning/winning-details';
import { WinTable } from '../sections/winning/winning-table';
import { BidWinDetails } from '../sections/bids/bidwindetails';
import { BidWinCard } from '../sections/bids/bid-win-card';

const BidWinReport = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    // const [users, setUsers] = useState(null);
    const [show, setShow] = useState(false);
    const [values, setValues] = useState(null);

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
    const handleValues = (values) => {
        setValues(values);
    }
    useEffect(() => {
        // Dynamically set the document title
        document.title = 'Bid Win | KalyanMatka Official';

        // Clean up the effect when the component unmounts
        return () => {
            document.title = 'KalyanMatka Official'; // Set a default title if needed
        };
    }, []);
    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };
    const handleOpenSnackbar = (message) => {
        setSnackbarMessage(message);
    };
    return (
        <>
            {/* <Head>
      <title>
        Account | Devias Kit
      </title>
    </Head> */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={!!snackbarMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
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
                                    Bid Win History
                                </Typography>
                            </Stack>
                            {/* <div>
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
                            </div> */}
                        </Stack>
                        <div>
                            <Grid
                                container
                                spacing={3}
                            >
                                {/* <Grid
                                    xs={12}
                                    md={6}
                                    lg={4}
                                >
                                    <AccountProfile />
                                </Grid> */}
                                <Grid
                                    xs={12}
                                    md={12}
                                    lg={12}
                                >
                                    <BidWinDetails handleValues={handleValues} setShow={setShow} />
                                </Grid>
                                {show && <Grid
                                    xs={12}
                                    md={12}
                                    lg={12}
                                >
                                    <BidWinCard values={values} handleOpenSnackbar={handleOpenSnackbar}/>
                                </Grid>}
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    )
};

BidWinReport.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default BidWinReport;
