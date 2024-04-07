// import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Snackbar } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { useCallback, useEffect, useState } from 'react';
import { BidDetails } from '../sections/bids/bid-details';
import { BidTable } from '../sections/bids/bids-table';

const BidHistory = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    // const [users, setUsers] = useState(null);
    // const [show, setShow] = useState(false);
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
        document.title = 'Bids | KalyanMatka Official';

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
                                    Bid History
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
                                    <BidDetails handleValues={handleValues} />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={12}
                                    lg={12}
                                >
                                    <BidTable
                                        // count={users?.length}
                                        // items={users}
                                        valuesResult={values}
                                        // handleRowSelect={handleRowSelect}
                                        // onDeselectAll={customersSelection.handleDeselectAll}
                                        // onDeselectOne={customersSelection.handleDeselectOne}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                        handleOpenSnackbar={handleOpenSnackbar}
                                        // onSelectAll={customersSelection.handleSelectAll}
                                        // onSelectOne={customersSelection.handleSelectOne}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                    // selected={customersSelection.selected}
                                    // searchQuery={searchQuery} // Pass the search query as a prop
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    )
};

BidHistory.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default BidHistory;
