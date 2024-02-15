import PropTypes from 'prop-types';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';
import { EditBidDialog } from '../../utils/bids-edit-dialog';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../contexts/firebase';

export const PreWinnerTable = (props) => {
    const {
        valuesResult,
        handleOpenSnackbar,
        setTableData,
    } = props;
    const [values, setValues] = useState({
        open_panna: '',
        open_digit: '',
        close_panna: '',
        close_digit: '',
    });
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const sortedDate = valuesResult?.sort((a, b) => b.date - a.date);
    const handleOpenDialog = (customer) => {
        setSelectedCustomer(customer);
        setValues((prevState) => ({
            ...prevState,
            // updated_bid: bid, 
            open_panna: customer?.openpanna,
            open_digit: customer?.opendigit,
            close_panna: customer?.closepanna,
            close_digit: customer?.closedigit,
        }))
        setOpenDialog(true);
    };
    const handleCommonAction = async () => {
        try {
            handleCloseDialog();
            setLoading(true);
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
            setTableData(prevValues => prevValues.filter(item => item.id !== selectedCustomer.id));
            // Log success message
            console.log('Document updated successfully!');
            handleOpenSnackbar(`Bid updated successfully!`);

            // Close the dialog
        } catch (error) {
            handleOpenSnackbar(`Error updating bid!`);
            console.error('Error updating bid:', error);
        }
        setLoading(false);
    };
    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setSelectedCustomer(null);
        setOpenDialog(false);
    };

    return (
        <Card sx={{ mt: 2 }}>
            <Scrollbar sx={{ '.simplebar-placeholder': { display: 'none !important' } }}>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    #
                                </TableCell>
                                <TableCell>
                                    User Name
                                </TableCell>
                                <TableCell>
                                    Bid Points
                                </TableCell>
                                <TableCell>
                                    Winning Amount
                                </TableCell>
                                <TableCell>
                                    Type
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedDate?.length === 0 ? ( // Check if there are no matching results
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        No user data
                                    </TableCell>
                                </TableRow>
                            ) : (sortedDate?.map((customer, index) => {

                                return (
                                    <TableRow
                                        hover
                                        key={customer.points}
                                    >
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {customer.name.toUpperCase()}
                                        </TableCell>
                                        <TableCell>
                                            {customer.points}
                                        </TableCell>
                                        <TableCell>
                                            {customer.won}
                                        </TableCell>
                                        <TableCell>
                                            {customer.game}
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

PreWinnerTable.propTypes = {
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
