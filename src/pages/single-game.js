// import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Button, SvgIcon } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { AccountProfile } from '../sections/account/account-profile';
import { AccountProfileDetails } from '../sections/account/account-profile-details';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowUturnLeftIcon from '@heroicons/react/24/solid/ArrowUturnLeftIcon';
import { AccountBankDetails } from '../sections/account/account-bank-details';
import { useParams } from 'react-router-dom';
import { GameProfileDetails } from '../sections/companies/game-profile-details';
import { fetchGameData } from '../utils/get-single-game';
import { useEffect, useState } from 'react';

const Game = () => {
    const params = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (params.id) {
            fetchGameData(params.id, setUser);
        }
    }, [params.id]);
    console.log(user, 'params')
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
                                    Game
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
                                    <GameProfileDetails games={user} id={params?.id}/>
                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    )
};

Game.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Game;
