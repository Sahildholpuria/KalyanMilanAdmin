import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Button,
    Card,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';
import { getInitials } from '../../utils/get-initials';
import { useState } from 'react';
import { ActionDialog } from '../../utils/action-dialog';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../contexts/firebase';
import { useNavigate } from 'react-router-dom';
import { fetchUserDataByPhone, fetchUserId } from '../../utils/get-single-user';
// import { useRouter } from 'next/router';

export const WithdrawTable = (props) => {
    // const router = useRouter();
    const {
        count = 0,
        items = [],
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
        searchQuery = '',
        handleOpenSnackbar, // Accept search query as a prop
    } = props;
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const sortedDate = items?.sort((a, b) => b.date - a.date);
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
    // Function to handle opening the dialog
    const handleOpenDialog = (customer) => {
        setSelectedCustomer(customer);
        setOpenDialog(true);
    };
    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setSelectedCustomer(null);
        setOpenDialog(false);
    };
    const handleRowSelect = async (phone) => {
        const id = await fetchUserId(phone);
        console.log(id);
        navigate(`/users/${id}`);
    }
    // Function to handle the common action (in this case, console.log)
    const handleCommonAction = async (action) => {
        try {
            // Update the status in the Firebase document
            const withdrawDocRef = doc(db, 'Withdraw_List', selectedCustomer.id);

            // Determine the status based on the action
            const newStatus = action === 'Approve' ? 'Approved' : 'Rejected';

            // Update the document with the new status
            await updateDoc(withdrawDocRef, {
                status: newStatus,
            });

            // Log success message
            console.log(`Withdraw request ${newStatus} successfully!`);
            handleOpenSnackbar(`Withdraw request ${newStatus} successfully!`)
            // Close the dialog
            handleCloseDialog();
        } catch (error) {
            handleOpenSnackbar('Error updating withdraw request');
            console.error('Error updating withdraw request:', error);
        }
    };
    return (
        <Card sx={{border: '1px solid #556ee6'}}>
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
                                    Name
                                </TableCell>
                                <TableCell>
                                    Mobile
                                </TableCell>
                                <TableCell>
                                    Date
                                </TableCell>
                                <TableCell>
                                    Method
                                </TableCell>
                                <TableCell>
                                    Amount
                                </TableCell>
                                <TableCell>
                                    Status
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
                                const createdAt = format(customer?.date, 'dd MMM yyyy hh:mm a');
                                const statusColor = customer.status === 'pending' ? 'warning.main' : customer.status === 'Approved' ? 'success.main' : 'error.main';
                                return (
                                    <TableRow
                                        hover
                                        key={customer.id}
                                    // selected={isSelected}
                                        onClick={() => handleRowSelect(customer.phone)}
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
                                        <TableCell>
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
                                        </TableCell>
                                        <TableCell>
                                            {customer.phone}
                                        </TableCell>
                                        <TableCell>
                                            {createdAt}
                                        </TableCell>
                                        <TableCell>
                                            {customer.method}
                                        </TableCell>
                                        <TableCell>
                                            {customer.amount}
                                        </TableCell>
                                        <TableCell sx={{ color: statusColor, textTransform: 'capitalize' }}>
                                            {customer.status}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleOpenDialog(customer)}
                                                disabled={customer.status !== 'pending'}
                                            >
                                                Action
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
            <ActionDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleCommonAction={handleCommonAction}
                content={'Do you want to approve or reject the withdraw request?'}
                button1={'Approve'}
                button2={'Reject'}
            />
        </Card>
    );
};

WithdrawTable.propTypes = {
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
