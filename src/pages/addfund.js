// import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Button, SvgIcon, Snackbar, Backdrop, CircularProgress } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { GameProfileDetails } from '../sections/companies/game-profile-details';
import { useCallback, useEffect, useState } from 'react';
import { ResultTable } from '../sections/results/result-table';
import { ResultDetails } from '../sections/results/result-details';
import { DeclareResultDetails } from '../sections/results/declare-result';
import { SendResultNotification } from '../utils/send-result-notification';
import { AddFundDetails } from '../sections/account/add-fund-details';

const AddFund = () => {
    const [loading, setLoading] = useState(false);
    return (
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
                                Add Fund (User Wallet)
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
                                <AddFundDetails setLoading={setLoading}/>
                            </Grid>
                        </Grid>
                    </div>
                </Stack>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container>
        </Box>
    )
};

AddFund.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default AddFund;
