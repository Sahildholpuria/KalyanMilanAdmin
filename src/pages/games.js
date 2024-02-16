import { useCallback, useEffect, useMemo, useState } from 'react';
// import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { GameRatesDetails } from '../sections/companies/game-rates-details';
import { GamesDetails } from '../sections/companies/games-detals';
import { useParams } from 'react-router-dom';

const Games = () => {
    const params = useParams();
    useEffect(() => {
        // Dynamically set the document title
        document.title = 'Game | KalyanMatka Official';

        // Clean up the effect when the component unmounts
        return () => {
            document.title = 'KalyanMatka Official'; // Set a default title if needed
        };
    }, []);
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
                        {/* <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Game Rates
                                </Typography>
                            </Stack>
                        </Stack> */}
                        <GamesDetails game={params.game} />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Games.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Games;
