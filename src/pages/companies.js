// import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Backdrop,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { CompanyCard } from '../sections/companies/company-card';
import { CompaniesSearch } from '../sections/companies/companies-search';
import { subDays, subHours } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { GamesTable } from '../sections/companies/games-table';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../contexts/firebase';
import AddGameDialog from '../utils/add-game-dialog';
import dayjs from 'dayjs';


const GameManagement = () => {
  const currentDate = dayjs();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [users, setUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [values, setValues] = useState({
    title: '',
    isActive: '',
    open: '',
    close: '',
    isPlay: "Yes",
    subtitle: "***-**-***",
  });

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
  const handleRowSelect = (id) => {
    navigate(`/games/${id}`)
    // console.log(data)
    // router.push(`/user/${data.id}`);
  }
  const handleUsers = async () => {
    try {
      const q = query(collection(db, 'Events'));
      await onSnapshot(q, (querySnapshot) => {
        setUsers(querySnapshot.docs.map(doc => ({
          id: doc.ref._key.path.segments.slice(-1)[0],
          // avatar: '',
          title: doc.data().title,
          isActive: doc.data().isActive,
          open: doc.data().open,
          close: doc.data().close,
        })))
      })
    } catch (error) {
      console.log(error, 'error')
    }
  }
  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleReset = () => {
    let time = currentDate.format('hh:mm A');
    setValues((prevState)=>({
      ...prevState,
      title: '',
      isActive: '',
      open: time,
      close: time,
    }))
  }
  
  useEffect(() => {
    let time = currentDate.format('hh:mm A');
    handleUsers();
    setValues((prevState)=>({
      ...prevState,
      open: time,
      close: time,
    }))
  }, [])
  const handleCommonAction = async () => {
    try {
      if(!values.title || !values.open || !values.close || !values.isActive){
        handleOpenSnackbar('All fields are required!')
        return;
      }
      handleCloseDialog();
      setLoading(true);
      // Add the data to the Events table in Firebase
      await addDoc(collection(db, 'Events'), values);

      // Log success message
      console.log('Event added successfully!');
      handleOpenSnackbar('Event added successfully!');

      // Close the dialog
      handleCloseDialog();
    } catch (error) {
      handleOpenSnackbar(`Error updating bid!`);
      console.error('Error updating bid:', error);
    }
    setLoading(false);
  };
  useEffect(() => {
    // Dynamically set the document title
    document.title = 'Games | KalyanMatka Official';

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
                  Games Management
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
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={() => setOpenDialog(true)}
                >
                  Add Game
                </Button>
              </div>
            </Stack>
            <CompaniesSearch onSearch={handleSearch} />
            <GamesTable
              count={users?.length}
              items={users}
              handleRowSelect={handleRowSelect}
              // onDeselectAll={customersSelection.handleDeselectAll}
              // onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
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
      {/* Alert Dialog for changing status */}
      <AddGameDialog
        values={values}
        setValues={setValues}
        openDialog={openDialog}
        // selectedCustomer={selectedCustomer}
        handleCloseDialog={handleCloseDialog}
        handleCommonAction={handleCommonAction}
        handleReset={handleReset}
        button1={'Submit'}
        button2={'Reset'}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

GameManagement.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default GameManagement;
