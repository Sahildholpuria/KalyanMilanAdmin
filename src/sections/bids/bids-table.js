import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Grid,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';
import { getInitials } from '../../utils/get-initials';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../contexts/firebase';
import nProgress from 'nprogress';
import { EditBidDialog } from '../../utils/bids-edit-dialog';
// import { useRouter } from 'next/router';

export const BidTable = (props) => {
    // const router = useRouter();
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
        searchQuery = '', // Accept search query as a prop
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
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [count, setCount] = useState(0);
    const sortedDate = resultData?.sort((a, b) => b.open_date - a.open_date);
    // const filteredItems = sortedDate?.filter((customer) =>
    //     customer.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     customer.session.toLowerCase().includes(searchQuery.toLowerCase())
    //     // Add more fields as needed for search
    // );
    // Apply pagination to the filtered results
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = sortedDate?.slice(start, end);

    const fetchData = async () => {
        try {
            nProgress.start();
            // Replace this with the actual logic to fetch data from your source
            // For example, if you're using Firestore
            const formattedDate = new Date(valuesResult.date).toDateString();
            const gameType = valuesResult.game_type !== 'All Type';
            const q = gameType ? query(collection(db, 'User_Events'), where('date', '==', formattedDate), where('event', '==', valuesResult.game_name), where('game', '==', valuesResult.game_type)) : query(collection(db, 'User_Events'), where('date', '==', formattedDate), where('event', '==', valuesResult.game_name));
            await onSnapshot(q, (querySnapshot) => {
                if (querySnapshot.empty) {
                    setResultData([]);
                    handleOpenSnackbar('No Bid history available!')
                } else {
                    setResultData(querySnapshot.docs.map(doc => ({
                        id: doc.ref._key.path.segments.slice(-1)[0],
                        // avatar: '',
                        user_name: doc.data().name,
                        game_name: doc.data().event,
                        game_type: doc.data().game,
                        session: doc.data().session ? doc.data().session : 'N/A',
                        date: new Date(doc.data().date),
                        opendigit: doc.data().opendigit ? doc.data().opendigit : 'N/A',
                        closedigit: doc.data().closedigit ? doc.data().closedigit : 'N/A',
                        openpanna: doc.data().openpanna ? doc.data().openpanna : 'N/A',
                        closepanna: doc.data().closepanna ? doc.data().closepanna : 'N/A',
                        points: doc.data().points,
                    })));
                    setCount(querySnapshot.size);
                }
            })
        } catch (error) {
            console.error('Error fetching result data:', error);
        } finally {
            setTimeout(() => {
                nProgress.done();
            }, 1000);
        }
    };
    // Function to handle the common action (in this case, console.log)
    const handleCommonAction = async () => {
        try {
            // Replace "N/A" with ""
            const updatedValues = {
                openpanna: values.open_panna === 'N/A' ? '' : values.open_panna,
                opendigit: values.open_digit === 'N/A' ? '' : values.open_digit,
                closepanna: values.close_panna === 'N/A' ? '' : values.close_panna,
                closedigit: values.close_digit === 'N/A' ? '' : values.close_digit,
            };


            // Update the Firestore document with the updated values
            const bidDocRef = doc(db, 'User_Events', selectedCustomer.id);

            await updateDoc(bidDocRef, updatedValues);

            // Log success message
            console.log('Document updated successfully!');
            handleOpenSnackbar(`Bid updated successfully!`);

            // Close the dialog
            handleCloseDialog();
        } catch (error) {
            handleOpenSnackbar(`Error updating bid!`);
            console.error('Error updating bid:', error);
        }
    };
    useEffect(() => {
        if (valuesResult?.date) {
            // Fetch data based on date
            fetchData();
        }
    }, [valuesResult]);
    // Function to handle opening the dialog
    const handleOpenDialog = (customer) => {
        setSelectedCustomer(customer);
        setValues((prevState)=>({
            ...prevState,
            // updated_bid: bid, 
            open_panna: customer?.openpanna,
            open_digit: customer?.opendigit,
            close_panna: customer?.closepanna,
            close_digit: customer?.closedigit,
        }))
        setOpenDialog(true);
    };
    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setSelectedCustomer(null);
        setOpenDialog(false);
    };
    return (
        <Card>
            <CardHeader
                // subheader="The information can be edited"
                title="Bid History List"
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
                                    User Name
                                </TableCell>
                                <TableCell>
                                    Game Name
                                </TableCell>
                                <TableCell>
                                    Game Type
                                </TableCell>
                                <TableCell>
                                    Session
                                </TableCell>
                                <TableCell>
                                    Open Panna
                                </TableCell>
                                <TableCell>
                                    Open Digit
                                </TableCell>
                                <TableCell>
                                    Close Panna
                                </TableCell>
                                <TableCell>
                                    Close Digit
                                </TableCell>
                                <TableCell>
                                    Points
                                </TableCell>
                                <TableCell>
                                    Date
                                </TableCell>
                                <TableCell>
                                    Action
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
                                            {customer.user_name}
                                        </TableCell>
                                        <TableCell>
                                            {customer.game_name.toUpperCase()}
                                        </TableCell>
                                        <TableCell>
                                            {customer.game_type}
                                        </TableCell>
                                        <TableCell>
                                            {customer.session}
                                        </TableCell>
                                        <TableCell>
                                            {customer.openpanna}
                                        </TableCell>
                                        <TableCell>
                                            {customer.opendigit}
                                        </TableCell>
                                        <TableCell>
                                            {customer.closepanna}
                                        </TableCell>
                                        <TableCell>
                                            {customer.closedigit}
                                        </TableCell>
                                        <TableCell>
                                            {customer.points}
                                        </TableCell>
                                        <TableCell>
                                            {date}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleOpenDialog(customer)}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
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
                rowsPerPageOptions={[5, 10, 25]}
            />
            {/* Alert Dialog for changing status */}
            <EditBidDialog
                values={values}
                setValues={setValues}
                openDialog={openDialog}
                selectedCustomer={selectedCustomer}
                handleCloseDialog={handleCloseDialog}
                handleCommonAction={handleCommonAction}
                button1={'Update'}
                button2={'Cancel'}
            />
        </Card>
    );
};

BidTable.propTypes = {
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
