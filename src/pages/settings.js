// import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from '../sections/settings/settings-notifications';
import { SettingsPassword } from '../sections/settings/settings-password';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { SettingDetails } from '../sections/settings/settings-details';
import { useEffect } from 'react';

const Settings = () => {
  useEffect(() => {
    // Dynamically set the document title
    document.title = 'Settings | KalyanMatka Official';

    // Clean up the effect when the component unmounts
    return () => {
      document.title = 'KalyanMatka Official'; // Set a default title if needed
    };
  }, []);
  return (
  <>
    {/* <Head>
      <title>
        Settings | Devias Kit
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
          <Typography variant="h4">
            Settings
          </Typography>
          <SettingDetails />
          {/* <SettingsNotifications /> */}
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
);
}
Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;
