import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
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
import { BidRevertDialog } from '../../utils/bid-revert-dialog';
import { updateCoinsAndDelete } from '../../utils/bid-revert';

export const BidRevertTable = (props) => {
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
        show,
    } = props;
    const [resultData, setResultData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const sortedDate = resultData?.sort((a, b) => b.open_date - a.open_date);
    const filteredItems = sortedDate?.filter((customer) =>
        customer?.user_name.toLowerCase().includes(searchQuery.toLowerCase())
        // Add more fields as needed for search
    );
    // Apply pagination to the filtered results
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = filteredItems?.slice(start, end);

    const fetchData = async () => {
        try {
            nProgress.start();
            // Replace this with the actual logic to fetch data from your source
            // For example, if you're using Firestore
            const formattedDate = new Date(valuesResult.result_date).toDateString();
            const q = query(collection(db, 'User_Events'), where('date', '==', formattedDate), where('event', '==', valuesResult.game_name));
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
                        phone: doc.data().phone,
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
            handleCloseDialog();
            setLoading(true);
            for (const resultDoc of resultData) {
                await updateCoinsAndDelete(resultDoc)
            }
            // Log success message
            console.log('Document updated successfully!');
            handleOpenSnackbar(`All Bid reverted successfully!`);
            // Close the dialog
        } catch (error) {
            handleOpenSnackbar(`Error updating bid!`);
            console.error('Error updating bid:', error);
        }
        setLoading(false);
    };
    useEffect(() => {
        if (valuesResult?.date || show) {
            // Fetch data based on date
            fetchData();
        }
    }, [valuesResult, show]);
    // Function to handle opening the dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <Card sx={{ border: '1px solid #556ee6' }}>
            <CardHeader
                // subheader="The information can be edited"
                title="Bid Revert List"
            />
            {resultData.length > 0 && <CardContent sx={{ padding: '0px 24px 20px' }}><Button
                variant="outlined"
                onClick={() => handleOpenDialog()}
            >
                Clear & Refund All
            </Button></CardContent>}
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
                                {/* <TableCell>
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
                                </TableCell> */}
                                <TableCell>
                                    Points
                                </TableCell>
                                <TableCell>
                                    Date
                                </TableCell>
                                {/* <TableCell>
                                    Action
                                </TableCell> */}
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
                                        {/* <TableCell>
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
                                        </TableCell> */}
                                        <TableCell>
                                            {customer.points}
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
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
            {/* Alert Dialog for changing status */}
            <BidRevertDialog
                // values={values}
                // setValues={setValues}
                openDialog={openDialog}
                content={'Are you sure you want to clean and refund bid amount...?'}
                // selectedCustomer={selectedCustomer}
                handleCloseDialog={handleCloseDialog}
                handleCommonAction={handleCommonAction}
                button1={'Yes'}
                button2={'No'}
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

BidRevertTable.propTypes = {
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
