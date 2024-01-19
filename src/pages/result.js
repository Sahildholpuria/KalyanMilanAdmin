// import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Button, SvgIcon } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { GameProfileDetails } from '../sections/companies/game-profile-details';
import { useCallback, useState } from 'react';
import { ResultTable } from '../sections/results/result-table';
import { ResultDetails } from '../sections/results/result-details';
import { DeclareResultDetails } from '../sections/results/declare-result';

const DeclareResult = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState(null);
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
                                    Declare Result
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
                                    <ResultDetails setShow={setShow} handleValues={handleValues}/>
                                </Grid>
                                {show && (
                                    <Grid
                                        xs={12}
                                        md={12}
                                        lg={12}
                                    >
                                        <DeclareResultDetails />
                                    </Grid>)}
                                <Grid
                                    xs={12}
                                    md={12}
                                    lg={12}
                                >
                                    <ResultTable
                                        count={users?.length}
                                        items={users}
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
                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    )
};

DeclareResult.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default DeclareResult;
