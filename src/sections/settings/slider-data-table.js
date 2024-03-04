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
import { format } from 'date-fns';
import { SliderActionDialog } from '../../utils/silder-action-dialog';
import { deleteSlider, updateSlider } from '../../utils/slider-actions';

export const SliderDataTable = (props) => {
    const {
        valuesResult,
        handleOpenSnackbar,
        // setTableData,
    } = props;
    // const [values, setValues] = useState({
    //     open_panna: '',
    //     open_digit: '',
    //     close_panna: '',
    //     close_digit: '',
    // });
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const sortedDate = valuesResult?.sort((a, b) => b.date - a.date);
    const handleOpenDialog = (customer) => {
        setSelectedCustomer(customer);
        // setValues((prevState) => ({
        //     ...prevState,
        //     // updated_bid: bid, 
        //     open_panna: customer?.openpanna,
        //     open_digit: customer?.opendigit,
        //     close_panna: customer?.closepanna,
        //     close_digit: customer?.closedigit,
        // }))
        setOpenDialog(true);
    };
    const handleCommonAction = async () => {
        try {
            handleCloseDialog();
            setLoading(true);
            await deleteSlider(selectedCustomer.id, selectedCustomer.image);
            console.log('SliderData deleted successfully!');
            handleOpenSnackbar(`SliderData deleted successfully!`);
        } catch (error) {
            handleOpenSnackbar(`Error Deleting Slider!`);
            console.error('Error Deleting Slider Data:', error);
        }
        setLoading(false);
    };
    const handleStatus = async (id, status) => {
        try {
            await updateSlider(id, !status);
            console.log('SliderData Updated successfully!');
        } catch (error) {
            console.error('Error updating slider:', error);
        }
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
                                    Slider Image
                                </TableCell>
                                <TableCell>
                                    Slider Title
                                </TableCell>
                                <TableCell>
                                    Display Order
                                </TableCell>
                                <TableCell>
                                    Creation Date
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell sx={{textAlign: 'center'}}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedDate?.length === 0 ? ( // Check if there are no matching results
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        No slider data
                                    </TableCell>
                                </TableRow>
                            ) : (sortedDate?.map((customer, index) => {
                                const formatDate = new Date(customer?.date);
                                const createdAt = formatDate && format(formatDate, 'dd MMM yyyy hh:mm a');
                                const statusColor = customer.status ? 'success.main' : 'error.main';
                                return (
                                    <TableRow
                                        hover
                                        key={index}
                                    >
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell sx={{width: '25%'}}>
                                            <a href={customer?.image} target='blank'>
                                            <img src={customer?.image} alt='sliderimg' style={{ height: '50%', width: '80%' }} />
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            {customer.title}
                                        </TableCell>
                                        <TableCell>
                                            {customer.order}
                                        </TableCell>
                                        <TableCell>
                                            {createdAt}
                                        </TableCell>
                                        <TableCell sx={{ color: statusColor, textTransform: 'capitalize' }}>
                                            {customer.status ? 'Active' : 'Inactive'}
                                        </TableCell>
                                        <TableCell sx={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleOpenDialog(customer)}
                                                color='error'
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleStatus(customer?.id, customer?.status)}
                                                color={customer?.status ? 'success' : 'error'}
                                            >
                                                {customer?.status ? 'Inactivate' : 'Activate'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            }))}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <SliderActionDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleCommonAction={handleCommonAction}
                content={'Are you sure you want to delete this image?'}
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

SliderDataTable.propTypes = {
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
