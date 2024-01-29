import { useEffect } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { SendNotification } from '../sections/settings/send-notification';

const Notification = () => {
    useEffect(() => {
        // Dynamically set the document title
        document.title = 'Notification | KalyanMatka Official';

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
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Send Notification
                                </Typography>
                            </Stack>
                        </Stack>
                        <SendNotification />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Notification.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Notification;
