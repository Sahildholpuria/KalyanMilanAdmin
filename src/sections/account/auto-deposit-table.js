import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../contexts/firebase';
import nProgress from 'nprogress';
import { EditBidDialog } from '../../utils/bids-edit-dialog';
import { useEffect, useState } from 'react';
import { CustomSearch } from '../../utils/CustomSearch';

export const AutoDepositTable = (props) => {
    const {
        // count = 0,
        // items = [],
        valuesResult,
        // onDeselectAll,
        // onDeselectOne,
        onPageChange = () => { },
        onRowsPerPageChange,
        // onSelectAll,
        // onSelectOne,
        page = 0,
        rowsPerPage = 0,
        // selected = [],
        // handleRowSelect,
        // searchQuery = '', // Accept search query as a prop
        handleOpenSnackbar,
    } = props;
    const [resultData, setResultData] = useState([]);
    const [values, setValues] = useState({
        open_panna: '',
        open_digit: '',
        close_panna: '',
        close_digit: '',
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [count, setCount] = useState(0);
    const sortedDate = resultData?.sort((a, b) => b.open_date - a.open_date);
    const filteredItems = sortedDate?.filter((customer) =>
        customer.user_name.toLowerCase().includes(searchQuery.toLowerCase()) || customer.method.toLowerCase().includes(searchQuery.toLowerCase())
        // Add more fields as needed for search
    );
    // Apply pagination to the filtered results
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = filteredItems?.slice(start, end);

    const fetchData = async () => {
        try {
            nProgress.start();
            setLoading(true);
            // Replace this with the actual logic to fetch data from your source
            // For example, if you're using Firestore
            const formattedDate = new Date(valuesResult.date).toDateString();
            const by = valuesResult.money_type;
            const q = query(collection(db, 'AutoDeposit'), where('date', '==', formattedDate), where('by', '==', by));
            await onSnapshot(q, (querySnapshot) => {
                if (querySnapshot.empty) {
                    setResultData([]);
                    handleOpenSnackbar('No Deposit history available!')
                } else {
                    setResultData(querySnapshot.docs.map(doc => ({
                        id: doc.ref._key.path.segments.slice(-1)[0],
                        // avatar: '',
                        user_name: doc.data().name,
                        phone: doc.data().phone,
                        method: doc.data().method,
                        by: doc.data().by,
                        // session: doc.data().session ? doc.data().session : 'N/A',
                        date: new Date(doc.data().date),
                        // opendigit: doc.data().opendigit ? doc.data().opendigit : 'N/A',
                        // closedigit: doc.data().closedigit ? doc.data().closedigit : 'N/A',
                        // openpanna: doc.data().openpanna ? doc.data().openpanna : 'N/A',
                        // closepanna: doc.data().closepanna ? doc.data().closepanna : 'N/A',
                        amount: doc.data().amount,
                    })));
                    setCount(querySnapshot.size);
                }
            })
        } catch (error) {
            console.error('Error fetching result data:', error);
        } finally {
            nProgress.done();
            setLoading(false);
        }
    };
    // Function to handle the common action (in this case, console.log)
    // const handleCommonAction = async () => {
    //     try {
    //         handleCloseDialog();
    //         setLoading(true);
    //         // Replace "N/A" with ""
    //         const updatedValues = {
    //             openpanna: values.open_panna === 'N/A' ? '' : values.open_panna,
    //             opendigit: values.open_digit === 'N/A' ? '' : values.open_digit,
    //             closepanna: values.close_panna === 'N/A' ? '' : values.close_panna,
    //             closedigit: values.close_digit === 'N/A' ? '' : values.close_digit,
    //         };


    //         // Update the Firestore document with the updated values
    //         const bidDocRef = doc(db, 'User_Events', selectedCustomer.id);

    //         await updateDoc(bidDocRef, updatedValues);

    //         // Log success message
    //         console.log('Document updated successfully!');
    //         handleOpenSnackbar(`Bid updated successfully!`);

    //         // Close the dialog
    //     } catch (error) {
    //         handleOpenSnackbar(`Error updating bid!`);
    //         console.error('Error updating bid:', error);
    //     }
    //     setLoading(false);
    // };
    useEffect(() => {
        if (valuesResult?.date) {
            // Fetch data based on date
            fetchData();
        }
    }, [valuesResult]);
    // Function to handle opening the dialog
    // const handleOpenDialog = (customer) => {
    //     setSelectedCustomer(customer);
    //     setValues((prevState) => ({
    //         ...prevState,
    //         // updated_bid: bid, 
    //         open_panna: customer?.openpanna,
    //         open_digit: customer?.opendigit,
    //         close_panna: customer?.closepanna,
    //         close_digit: customer?.closedigit,
    //     }))
    //     setOpenDialog(true);
    // };
    // Function to handle closing the dialog
    // const handleCloseDialog = () => {
    //     setSelectedCustomer(null);
    //     setOpenDialog(false);
    // };
    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    return (
        <Card sx={{ border: '1px solid #556ee6' }}>
            <CardHeader
                // subheader="The information can be edited"
                title="Auto Deposit History List"
                action={<CustomSearch onSearch={handleSearch} />}
            />
            <Scrollbar sx={{ '.simplebar-placeholder': { display: 'none !important' } }}>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                                <TableCell>
                                    #
                                </TableCell>
                                <TableCell>
                                    User Name
                                </TableCell>
                                <TableCell>
                                    Method
                                </TableCell>
                                <TableCell>
                                    Deposited By
                                </TableCell>
                                <TableCell>
                                    Phone
                                </TableCell>
                                <TableCell>
                                    Amount
                                </TableCell>
                                <TableCell>
                                    Date
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedItems?.length === 0 ? ( // Check if there are no matching results
                                <TableRow>
                                    <TableCell colSpan={10} align="center">
                                        No user data
                                    </TableCell>
                                </TableRow>
                            ) : (paginatedItems?.map((customer, index) => {
                                // const isSelected = selected.includes(customer.id);
                                const date = format(customer.date, 'dd/MM/yyyy');
                                // const open_date = customer.open_date ? format(new Date(customer.open_date), 'dd MMM yyyy hh:mm a') : 'N/A';
                                // const close_date = customer.close_date !== 'N/A' ? format(new Date(customer.close_date), 'dd MMM yyyy hh:mm a') : 'N/A';

                                return (
                                    <TableRow
                                        hover
                                        key={customer.id}
                                    // selected={isSelected}
                                    // onClick={() => handleRowSelect(customer.id)}
                                    >
                                        {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell> */}
                                        {/* <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <Avatar src={customer.avatar}>
                                                    {getInitials(customer.name)}
                                                </Avatar>
                                                <Typography variant="subtitle2">
                                                    {customer.name}
                                                </Typography>
                                            </Stack>
                                        </TableCell> */}
                                        <TableCell>
                                            {index + 1 + page * rowsPerPage}
                                        </TableCell>
                                        <TableCell>
                                            {customer.user_name}
                                        </TableCell>
                                        <TableCell>
                                            {customer.method.toUpperCase()}
                                        </TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize'}}>
                                            {customer.by}
                                        </TableCell>
                                        <TableCell>
                                            {customer.phone}
                                        </TableCell>
                                        <TableCell>
                                            {customer.amount}
                                        </TableCell>
                                        <TableCell>
                                            {date}
                                        </TableCell>
                                        {/* <TableCell>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleOpenDialog(customer)}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell> */}
                                    </TableRow>
                                );
                            }))}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 25, 50, 75, 150, 200]}
            />
            {/* Alert Dialog for changing status */}
            {/* <EditBidDialog
                values={values}
                setValues={setValues}
                openDialog={openDialog}
                selectedCustomer={selectedCustomer}
                handleCloseDialog={handleCloseDialog}
                handleCommonAction={handleCommonAction}
                button1={'Update'}
                button2={'Cancel'}
            /> */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Card>
    );
};

AutoDepositTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
    searchQuery: PropTypes.string,
};
