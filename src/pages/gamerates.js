import { useCallback, useMemo, useState } from 'react';
// import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { GameRatesDetails } from '../sections/companies/game-rates-details';

const GameRates = () => {
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Game Rates
                                </Typography>
                            </Stack>
                        </Stack>
                        <GameRatesDetails />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

GameRates.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default GameRates;
