// import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsPassword } from '../sections/settings/settings-password';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { SettingDetails } from '../sections/settings/settings-details';
import { useEffect } from 'react';
import { SettingApp } from '../sections/settings/settings-app';
import { SupportDetails } from '../sections/settings/support-details';
import { Maintainence } from '../sections/settings/setting-mentainance';
import SliderData from '../sections/settings/slider-data';
import SubAdminData from '../sections/settings/subadmin-data';
import { useAuth } from '../hooks/use-auth';

const Settings = () => {
  const auth = useAuth();
  const { admin } = auth;
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
            {admin[0]?.name === 'Admin' &&
              <SettingsPassword />
            }
            <SettingApp />
            <SupportDetails />
            <Maintainence />
            <SliderData />
            {admin[0]?.name === 'Admin' &&
              <SubAdminData />
            }
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
