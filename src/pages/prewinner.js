// import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Button, SvgIcon, Snackbar } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { GameProfileDetails } from '../sections/companies/game-profile-details';
import { useCallback, useEffect, useState } from 'react';
import { ResultTable } from '../sections/results/result-table';
import { ResultDetails } from '../sections/results/result-details';
import { DeclareResultDetails } from '../sections/results/declare-result';
import { SendResultNotification } from '../utils/send-result-notification';
import { PreWinDetails } from '../sections/winning/pre-winner-details';
import { PreWinnerTable } from '../sections/winning/pre-winner-table';
import WalletIcon from '@heroicons/react/24/solid/WalletIcon';
import ScaleIcon from '@heroicons/react/24/solid/ScaleIcon';

const PreWinner = () => {
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [tableData, setTableData] = useState([]);
    const handleValues = (values) => {
        setTableData(values);
    }
    const calculateTotalAmounts = () => {
        let totalBidAmount = 0;
        let totalWinningAmount = 0;

        tableData.forEach((item) => {
            totalBidAmount += parseInt(item.points, 10) || 0;
            totalWinningAmount += parseInt(item.won, 10) || 0;
        });

        return { totalBidAmount, totalWinningAmount };
    };

    const total = tableData.length > 0 && calculateTotalAmounts();
    useEffect(() => {
        // Dynamically set the document title
        document.title = 'PreWinner | KalyanMatka Official';

        // Clean up the effect when the component unmounts
        return () => {
            document.title = 'KalyanMatka Official'; // Set a default title if needed
        };
    }, []);
    const handleOpenSnackbar = (message) => {
        setSnackbarMessage(message);
    };
    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
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
                                    Winning Prediction
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
                                    <PreWinDetails handleValues={handleValues} />
                                </Grid>
                                {/* {show && (
                                    <Grid
                                        xs={12}
                                        md={12}
                                        lg={12}
                                    >
                                        <DeclareResultDetails game={values} setFetch={setFetch} setShow={setShow} handleOpenSnackbar={handleOpenSnackbar} />
                                    </Grid>)}
                                <Grid
                                    xs={12}
                                    md={12}
                                    lg={12}
                                >
                                    <ResultTable
                                        // count={users?.length}
                                        // items={users}
                                        fetch={fetch}
                                        valuesResult={values}
                                        handleOpenSnackbar={handleOpenSnackbar}
                                        // handleRowSelect={handleRowSelect}
                                        // onDeselectAll={customersSelection.handleDeselectAll}
                                        // onDeselectOne={customersSelection.handleDeselectOne}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                        // onSelectAll={customersSelection.handleSelectAll}
                                        // onSelectOne={customersSelection.handleSelectOne}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                    // selected={customersSelection.selected}
                                    // searchQuery={searchQuery} // Pass the search query as a prop
                                    />
                                </Grid> */}
                                <Grid
                                    xs={12}
                                    md={12}
                                    lg={12}
                                >
                                    <Stack spacing={3}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            spacing={4}
                                        >
                                            <Stack spacing={1} sx={{ flexDirection: 'row', alignItems: 'flex-end', gap: 1 }}>
                                                <SvgIcon fontSize="small" mt={1}>
                                                    {/* Add icon for subgame2 */}
                                                    <ScaleIcon />
                                                </SvgIcon>
                                                <Typography variant="h6">
                                                    Total Bid Amount : {total?.totalBidAmount ? total.totalBidAmount : 0}
                                                </Typography>
                                            </Stack>
                                            <Stack spacing={1} sx={{ flexDirection: 'row', alignItems: 'flex-end', gap: 1 }}>
                                                <SvgIcon fontSize="small">
                                                    <WalletIcon />
                                                </SvgIcon>
                                                <Typography variant="h6">
                                                    Total Winning Amount : {total?.totalWinningAmount ? total.totalWinningAmount : 0}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <PreWinnerTable valuesResult={tableData} handleOpenSnackbar={handleOpenSnackbar} setTableData={setTableData} />
                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    )
};

PreWinner.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default PreWinner;
