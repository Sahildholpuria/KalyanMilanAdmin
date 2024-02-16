import { useCallback, useEffect, useMemo, useState } from 'react';
// import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Snackbar, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from '../hooks/use-selection';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { CustomersTable } from '../sections/customer/customers-table';
import { CustomersSearch } from '../sections/customer/customers-search';
import { applyPagination } from '../utils/apply-pagination';
import { useNavigate } from 'react-router-dom';
import { WithdrawTable } from '../sections/withdraw/withdraw-table';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../contexts/firebase';

const WalletManagement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  // const customers = useCustomers(page, rowsPerPage);
  // const customersIds = useCustomerIds(customers);
  // const customersSelection = useSelection(customersIds);
  const [searchQuery, setSearchQuery] = useState('');

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
  // Handle search logic in your custom search bar
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  // const handleRowSelect = (id) => {
  //   navigate(`/users/${id}`)
  //   // console.log(data)
  //   // router.push(`/user/${data.id}`);
  // }
  const handleUsers = async () => {
    try {
      const q = query(collection(db, 'Withdraw_List'));
      await onSnapshot(q, (querySnapshot) => {
        setUsers(querySnapshot.docs.map(doc => ({
          id: doc.ref._key.path.segments.slice(-1)[0],
          // avatar: '',
          name: doc.data().name,
          phone: doc.data().phone,
          date: new Date(doc.data().time),
          method: doc.data().method,
          amount: doc.data().amount,
          status: doc.data().status,
        })))
      })
    } catch (error) {
      console.log(error, 'error')
    }
  }
  useEffect(() => {
    handleUsers();
  }, [])
  useEffect(() => {
    // Dynamically set the document title
    document.title = 'Withdraw | KalyanMatka Official';

    // Clean up the effect when the component unmounts
    return () => {
      document.title = 'KalyanMatka Official'; // Set a default title if needed
    };
  }, []);
  const handleCloseSnackbar = () => {
    setSnackbarMessage(null);
  };
  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
  };
  return (
    <>
      {/* <Head>
        <title>
          Customers | KalyanMatka Official
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
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Withdraw Request Report
                </Typography>
                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              {/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div> */}
            </Stack>
            <CustomersSearch onSearch={handleSearch} />
            <WithdrawTable
              count={users?.length}
              items={users}
              // handleRowSelect={handleRowSelect}
              // onDeselectAll={customersSelection.handleDeselectAll}
              // onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              handleOpenSnackbar={handleOpenSnackbar}
              // onSelectAll={customersSelection.handleSelectAll}
              // onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              // selected={customersSelection.selected}
              searchQuery={searchQuery} // Pass the search query as a prop
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

WalletManagement.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default WalletManagement;
