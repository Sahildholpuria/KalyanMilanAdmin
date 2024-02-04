import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    CircularProgress,
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
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../contexts/firebase';
import { ResultActionDialog } from '../../utils/result-action-dialog';
import { RemoveWinningHistory } from '../../utils/winning-points';
// import { useRouter } from 'next/router';

export const ResultTable = (props) => {
    // const router = useRouter();
    const {
        // count = 0,
        // items = [],
        valuesResult,
        fetch = false,
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
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [values, setValues] = useState({
        result_date: dayjs().format('YYYY-MM-DD'),
    });
    const sortedDate = resultData?.sort((a, b) => b.open_date - a.open_date);
    const filteredItems = sortedDate?.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
        // Add more fields as needed for search
    );
    // Apply pagination to the filtered results
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = filteredItems?.slice(start, end);
    // const selectedSome = (selected.length > 0) && (selected.length < items.length);
    // const selectedAll = (items.length > 0) && (selected.length === items.length);
    const handleOpenDialog = (customer) => {
        setSelectedCustomer(customer);
        setOpenDialog(true);
    };
    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setSelectedCustomer(null);
        setOpenDialog(false);
    };
    const handleAction = async () => {
        try {
            handleCloseDialog();
            setLoading(true);
            // Delete document from the 'Result' collection
            await deleteDoc(doc(db, 'Result', selectedCustomer.id));
            const date = new Date();
            const currentDate = date.toDateString();
            if(selectedCustomer.result_date === currentDate){
                // Update subtitle in the 'Events' collection
                const eventsQuery = query(collection(db, 'Events'), where('title', '==', selectedCustomer.name));
                const eventsSnapshot = await getDocs(eventsQuery);
                
                if (!eventsSnapshot.empty) {
                    const eventDoc = eventsSnapshot.docs[0];
                    const eventId = eventDoc.ref._key.path.segments.slice(-1)[0];
                    
                    await updateDoc(doc(db, 'Events', eventId), {
                        subtitle: '***-**-***',
                    });
                }
            }
            RemoveWinningHistory(selectedCustomer)
            handleOpenSnackbar('Result Deleted Successfully');
            // Close the dialog after successful deletion and update
        } catch (error) {
            console.error('Error performing delete and update:', error);
            // Handle errors or show an error message to the user
            handleOpenSnackbar('Error deleting result!');
        }
        setLoading(false);
    }

    const fetchData = async () => {
        try {
            // Replace this with the actual logic to fetch data from your source
            // For example, if you're using Firestore
            const formattedDate = new Date(values.result_date).toDateString();
            const q = query(collection(db, 'Result'), where('result_date', '==', formattedDate));
            await onSnapshot(q, (querySnapshot) => {
                setResultData(querySnapshot.docs.map(doc => ({
                    id: doc.ref._key.path.segments.slice(-1)[0],
                    // avatar: '',
                    name: doc.data().game_name,
                    result_date: new Date(doc.data().result_date).toDateString(),
                    open_date: new Date(doc.data().open_date),
                    close_date: doc.data().close_date ? new Date(doc.data().close_date) : 'N/A',
                    open: doc.data().open,
                    close: doc.data().close,
                })));
                setCount(querySnapshot.size);
            })
        } catch (error) {
            console.error('Error fetching result data:', error);
        }
    };
    useEffect(() => {
        // Fetch data based on result_date
        fetchData();
    }, [values.result_date, fetch]);
    useEffect(() => {
        if(valuesResult?.result_date || fetch){
            setValues((prevState) => ({
                ...prevState,
                result_date: valuesResult?.result_date,
            }));
        }
    }, [valuesResult?.result_date, fetch])
    
    return (
        <Card sx={{border: '1px solid #556ee6'}}>
            <CardHeader
                // subheader="The information can be edited"
                title="Game Result History"
            />
            <Grid
                xs={12}
                md={6}
                lg={6}
            >
                <CardContent sx={{ p: 6 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={6}
                                lg={6}
                            >
                                <Stack sx={{
                                    '& .css-4jnixx-MuiStack-root': {
                                        padding: '2px'
                                    }
                                }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker
                                                label="Select Result Date"
                                                value={dayjs(values.result_date)}
                                                onChange={(newValue) => {
                                                    setValues((prevState) => ({
                                                        ...prevState,
                                                        result_date: newValue.format('YYYY-MM-DD'),
                                                    }));
                                                }}
                                                textField={(props) => (
                                                    <TextField fullWidth label="Result Date" {...props} sx={{ width: '100%' }} />
                                                )}
                                                slotProps={{
                                                    textField: {
                                                        helperText: 'MM/DD/YYYY',
                                                    },
                                                }}
                                                maxDate={dayjs()} // Disable future dates
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Grid>
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
                                    Game Name
                                </TableCell>
                                <TableCell>
                                    Result Date
                                </TableCell>
                                <TableCell>
                                    Open Declare Date
                                </TableCell>
                                <TableCell>
                                    Close Declare Date
                                </TableCell>
                                <TableCell>
                                    Open Panna
                                </TableCell>
                                <TableCell>
                                    Close Panna
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedItems?.length === 0 ? ( // Check if there are no matching results
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        No user data
                                    </TableCell>
                                </TableRow>
                            ) : (paginatedItems?.map((customer, index) => {
                                // const isSelected = selected.includes(customer.id);
                                const result_date = format(new Date(customer.result_date), 'dd MMM yyyy');
                                const open_date = customer.open_date ? format(new Date(customer.open_date), 'dd MMM yyyy hh:mm a') : 'N/A';
                                const close_date = customer.close_date !== 'N/A' ? format(new Date(customer.close_date), 'dd MMM yyyy hh:mm a') : 'N/A';

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
                                        <TableCell>
                                            {index + 1 + page * rowsPerPage}
                                        </TableCell>
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
                                            {customer.name.toUpperCase()}
                                        </TableCell>
                                        <TableCell>
                                            {result_date}
                                        </TableCell>
                                        <TableCell>
                                            {open_date}
                                        </TableCell>
                                        <TableCell>
                                            {close_date}
                                        </TableCell>
                                        <TableCell>
                                            {customer.open}
                                        </TableCell>
                                        <TableCell>
                                            {customer.close}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                sx={{color: 'error.main'}}
                                                onClick={() => handleOpenDialog(customer)}
                                            >
                                                Delete
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
            <ResultActionDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleCommonAction={handleAction}
                content={'Do you want to delete this result?'}
                button1={'Confirm'}
                button2={'Cancel'}
            />
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

ResultTable.propTypes = {
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
