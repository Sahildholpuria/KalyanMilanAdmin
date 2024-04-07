import { useCallback, useEffect, useMemo, useState } from 'react';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from '../hooks/use-selection';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { CustomersTable } from '../sections/customer/customers-table';
import { CustomersSearch } from '../sections/customer/customers-search';
import { applyPagination } from '../utils/apply-pagination';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../contexts/firebase';

const UnApproved = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [users, setUsers] = useState(null);
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
    const handleRowSelect = (id) => {
        navigate(`/users/${id}`)
        // console.log(data)
        // router.push(`/user/${data.id}`);
    }
    const handleUsers = async () => {
        try {
            const q = query(collection(db, 'Users'), where('Betting', '==', false), where('Transfer', '==', false), where('Active', '==', false));
            await onSnapshot(q, (querySnapshot) => {
                setUsers(querySnapshot.docs.map(doc => ({
                    id: doc.ref._key.path.segments.slice(-1)[0],
                    avatar: '',
                    name: doc.data().name,
                    email: doc.data().email,
                    coins: doc.data().coins,
                    date: new Date(doc.data().date),
                    phone: doc.data().phone,
                    Betting: doc.data().Betting,
                    Transfer: doc.data().Transfer,
                    Active: doc.data().Active,
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
        document.title = 'Users | KalyanMatka Official';

        // Clean up the effect when the component unmounts
        return () => {
            document.title = 'KalyanMatka Official'; // Set a default title if needed
        };
    }, []);

    return (
        <>
            {/* <Head>
        <title>
          Customers | KalyanMatka Official
        </title>
      </Head> */}
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
                                    Un-Approved Users List
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
                                            <EyeIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                >
                                    Un-Approved Users List
                                </Button>
                            </div> */}
                        </Stack>
                        <CustomersSearch onSearch={handleSearch} />
                        <CustomersTable
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
        </>
    );
};

UnApproved.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default UnApproved;
