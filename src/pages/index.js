// import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid, Tooltip, Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { OverviewBudget } from '../sections/overview/overview-budget';
import { OverviewLatestOrders } from '../sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from '../sections/overview/overview-latest-products';
import { OverviewSales } from '../sections/overview/overview-sales';
import { OverviewTasksProgress } from '../sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from '../sections/overview/overview-total-customers';
import { OverviewTotalProfit } from '../sections/overview/overview-total-profit';
import { OverviewTraffic } from '../sections/overview/overview-traffic';
import { useEffect, useState } from 'react';
import { formatUserCount } from '../utils/format-count';
import { db } from '../contexts/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import nProgress from 'nprogress';
import { AdminProfile } from '../sections/account/admin-profile';
import { useAuth } from '../hooks/use-auth';
import { OverviewTotalBid } from '../sections/overview/overview-bids';
import { MarketBidDetails } from '../sections/overview/market-bid-details';
import { SingleAnkDetails } from '../sections/overview/single-ank-details';
import { OverviewSingleAnk } from '../sections/overview/single-ank-card';
import { getAnkColor } from '../utils/ank-colors';
import { OverviewTotalDeposit } from '../sections/overview/overview-daily-deposit';

const now = new Date();

const Home = () => {
  const auth = useAuth();
  const [usersCount, setUsersCount] = useState(0);
  const [gamesCount, setGamesCount] = useState(0);
  const [profitCount, setProfitCount] = useState(0);
  const [withdrawReqCount, setWithdrawReqCount] = useState(0);
  const [totalBids, setTotalBids] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const adminData = auth.admin;
  const [ankData, setAnkData] = useState([]);
  useEffect(() => {
    // Dynamically set the document title
    document.title = 'Home | KalyanMatka Official';

    // Clean up the effect when the component unmounts
    return () => {
      document.title = 'KalyanMatka Official'; // Set a default title if needed
    };
  }, []);
  useEffect(() => {
    const fetchDocumentCount = async (collectionName, setCountFunction) => {
      try {
        nProgress.start();
        if (collectionName === 'AddMoney') {
          const q = query(collection(db, collectionName), where('name', '==', 'admin'));
          onSnapshot(q, (querySnapshot) => {
            const count = querySnapshot?.docs[0]?.data()?.earnings;
            setCountFunction(count);
          });
        } else if (collectionName === 'User_Events') {
          const currentDate = new Date().toDateString();
          const q = query(collection(db, collectionName), where('date', '==', currentDate));

          onSnapshot(q, (querySnapshot) => {
            let totalPoints = 0;

            querySnapshot.forEach((doc) => {
              const points = Number(doc.data().points);
              totalPoints += points;
            });

            setCountFunction(totalPoints);
          });
        } else if (collectionName === 'AutoDeposit') {
          const currentDate = new Date().toDateString();
          const q = query(collection(db, collectionName), where('date', '==', currentDate));

          onSnapshot(q, (querySnapshot) => {
            let totalPoints = 0;

            querySnapshot.forEach((doc) => {
              const points = Number(doc.data().amount);
              totalPoints += points;
            });

            setCountFunction(totalPoints);
          });
        } else if (collectionName === 'Withdraw_List') {
          const q = query(collection(db, collectionName), where('status', '==', 'pending'));
          onSnapshot(q, (querySnapshot) => {
            const count = querySnapshot?.size;
            setCountFunction(count);
          });
        } else {
          const q = query(collection(db, collectionName));
          onSnapshot(q, (querySnapshot) => {
            const count = querySnapshot?.size;
            setCountFunction(count);
          });
        }
      } catch (error) {
        console.error(`Error fetching count for ${collectionName}`, error);
      } finally {
        setTimeout(() => {
          nProgress.done();
        }, 1000);
      }
    };
    const ank = Array.from({ length: 10 }, (_, ank) => ({ ank, totalPoints: 0, totalBids: 0, color: getAnkColor(ank), }))
    setAnkData(ank);
    // Assuming you have collections named 'Users', 'Events', 'admin', 'Withdraw_List'
    fetchDocumentCount('Users', setUsersCount);
    fetchDocumentCount('Events', setGamesCount);
    fetchDocumentCount('AddMoney', setProfitCount);
    fetchDocumentCount('Withdraw_List', setWithdrawReqCount);
    fetchDocumentCount('User_Events', setTotalBids);
    fetchDocumentCount('AutoDeposit', setTotalDeposit);
  }, []);
  return (
    <>
      {/* <Head>
      <title>
        Overview | KalyanMatka Official
      </title>
    </Head> */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="xl">
          <Grid
            xs={12}
            sm={6}
            lg={6}
            sx={{ marginBottom: '20px' }}
          >
            <AdminProfile user={adminData[0]} />
          </Grid>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalCustomers
                // difference={16}
                // positive={false}
                sx={{ height: '100%', cursor: 'pointer', border: '1px solid #556ee6' }}
                value={formatUserCount(usersCount)}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewBudget
                // difference={12}
                // positive
                sx={{ height: '100%', cursor: 'pointer', border: '1px solid #556ee6' }}
                value={formatUserCount(gamesCount)}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalProfit
                sx={{ height: '100%', border: '1px solid #556ee6' }}
                value={formatUserCount(profitCount)}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTasksProgress
                // difference={12}
                // positive
                sx={{ height: '100%', cursor: 'pointer', border: '1px solid #556ee6' }}
                value={formatUserCount(withdrawReqCount)}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalBid
                sx={{ height: '100%', border: '1px solid #556ee6' }}
                value={formatUserCount(totalBids)}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalDeposit
                sx={{ height: '100%', border: '1px solid #556ee6' }}
                value={formatUserCount(totalDeposit)}
              />
            </Grid>
            {/* <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Healthcare Erbology',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Makeup Lancome Rouge',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Skincare Soja CO',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Makeup Lipstick',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Healthcare Ritual',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestOrders
              orders={[
                {
                  id: 'f69f88012978187a6c12897f',
                  ref: 'DEV1049',
                  amount: 30.5,
                  customer: {
                    name: 'Ekaterina Tankova'
                  },
                  createdAt: 1555016400000,
                  status: 'pending'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  ref: 'DEV1048',
                  amount: 25.1,
                  customer: {
                    name: 'Cao Yu'
                  },
                  createdAt: 1555016400000,
                  status: 'delivered'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  ref: 'DEV1047',
                  amount: 10.99,
                  customer: {
                    name: 'Alexa Richardson'
                  },
                  createdAt: 1554930000000,
                  status: 'refunded'
                },
                {
                  id: '1f4e1bd0a87cea23cdb83d18',
                  ref: 'DEV1046',
                  amount: 96.43,
                  customer: {
                    name: 'Anje Keizer'
                  },
                  createdAt: 1554757200000,
                  status: 'pending'
                },
                {
                  id: '9f974f239d29ede969367103',
                  ref: 'DEV1045',
                  amount: 32.54,
                  customer: {
                    name: 'Clarke Gillebert'
                  },
                  createdAt: 1554670800000,
                  status: 'delivered'
                },
                {
                  id: 'ffc83c1560ec2f66a1c05596',
                  ref: 'DEV1044',
                  amount: 16.76,
                  customer: {
                    name: 'Adam Denisov'
                  },
                  createdAt: 1554670800000,
                  status: 'delivered'
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid> */}
          </Grid>
          <Grid xs={12} md={6} lg={6} sm={12} sx={{ mt: 3 }}>
            <MarketBidDetails />
          </Grid>
          <Grid xs={12} md={6} lg={6} sm={12} sx={{ mt: 3 }}>
            <SingleAnkDetails ankData={ankData} setAnkData={setAnkData} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{ mt: 2 }}
          >
            {ankData && ankData.map((data) => <Grid
              xs={12}
              sm={6}
              lg={3}
              md={3}
              key={data.ank}
            >
              <OverviewSingleAnk
                // difference={16}
                // positive={false}
                color={data.color}
                sx={{ height: '100%', border: `1px solid ${data.color}` }}
                value={data}
              />
            </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>)
};

Home.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Home;
