import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Button,
    Backdrop,
    Card,
    CardHeader,
    CircularProgress,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    SvgIcon,
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
import { db, imgDB } from '../../contexts/firebase';
import { useNavigate } from 'react-router-dom';
import { fetchUserDataByPhone, fetchUserId } from '../../utils/get-single-user';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import WalletIcon from '@heroicons/react/24/solid/WalletIcon';
import { updateCoins } from '../../utils/withdraw-reject-update-coins';
import { UploadDialog } from './uploaded-image-preview';
import { deleteObject, ref } from 'firebase/storage';
// import { useRouter } from 'next/router';

export const WithdrawReportTable = (props) => {
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
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');
    const [uploadedImg, setUploadedImg] = useState('');
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
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
    // Calculate total accepted and rejected amounts
    const totalAcceptedAmount = filteredItems
        ?.filter(item => item.status === 'Approved')
        ?.reduce((total, item) => total + Number(item.amount), 0);

    const totalRejectedAmount = filteredItems
        ?.filter(item => item.status === 'Rejected')
        ?.reduce((total, item) => total + Number(item.amount), 0);

    // const totalPendingAmount = filteredItems?.reduce((acc, item) => {
    //     return acc + parseInt(item.amount, 10);
    // }, 0);
    // console.log(totalAcceptedAmount, totalRejectedAmount)
    // const selectedSome = (selected.length > 0) && (selected.length < items.length);
    // const selectedAll = (items.length > 0) && (selected.length === items.length);
    // Function to handle opening the dialog
    const handleOpenDialog = (customer) => {
        setSelectedCustomer(customer);
        setOpenDialog(true);
    };
    // Function to handle closing the dialog
    const handleCloseDialog = (action) => {
        setSelectedCustomer(null);
        if (action === 'Reject' || action === 'Cancel') {
            if (img) {
                const imageRef = ref(imgDB, img);
                deleteObject(imageRef)
                    .then(() => {
                        // Image deleted successfully
                    })
                    .catch((error) => {
                        // Handle error
                        console.log(error, 'error');
                    });
            }
        }
        setOpenDialog(false);
    };
    const handleRowSelect = async (phone) => {
        const id = await fetchUserId(phone);
        // console.log(id);
        navigate(`/users/${id}`);
    }
    const handleApproveSelect = (image) => {
        setUploadedImg(image);
        setOpenUploadDialog(true);
    }
    const handleCloseUploadDialog = () => {
        setUploadedImg('');
        setOpenUploadDialog(false);
    }
    // Function to handle the common action (in this case, console.log)
    const handleCommonAction = async (action) => {
        if (action === 'Approve' && img === '') {
            handleOpenSnackbar('Please Upload Payment ScreenShot!')
            return;
        }
        try {
            // Update the status in the Firebase document
            const withdrawDocRef = doc(db, 'Withdraw_List', selectedCustomer.id);

            // Determine the status based on the action
            const newStatus = action === 'Approve' ? 'Approved' : 'Rejected';

            // Update the document with the new status
            await updateDoc(withdrawDocRef, {
                status: newStatus,
                image: img,
            });
            if (action === 'Reject'){
                await updateCoins(selectedCustomer);
            }
            // Log success message
            console.log(`Withdraw request ${newStatus} successfully!`);
            handleOpenSnackbar(`Withdraw request ${newStatus} successfully!`)
            // Close the dialog
            handleCloseDialog(action);
        } catch (error) {
            handleOpenSnackbar('Error updating withdraw request');
            console.error('Error updating withdraw request:', error);
        }
    };
    return (
        <Card sx={{ border: '1px solid #556ee6' }}>
            <CardHeader title={'Withdraw List'}/>
            <Scrollbar sx={{ '.simplebar-placeholder': { display: 'none !important' } }}>
                <Box sx={{ minWidth: 800 }}>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: 1, marginLeft: 3}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, backgroundColor: 'info.main', padding: '0.47rem 0.75rem' }}>
                            <SvgIcon fontSize="small">
                                <WalletIcon />
                            </SvgIcon>
                            <Typography variant='button'>Total Withdraw Amount :-</Typography>
                            <Typography variant='button'>0</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, backgroundColor: 'warning.main', padding: '0.47rem 0.75rem' }}>
                            <SvgIcon fontSize="small">
                                <WalletIcon />
                            </SvgIcon>
                            <Typography variant='button'>Total Accepted :-</Typography>
                            <Typography variant='button'>{totalAcceptedAmount ? totalAcceptedAmount : 0}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, backgroundColor: 'error.main', padding: '0.47rem 0.75rem' }}>
                            <SvgIcon fontSize="small">
                                <WalletIcon />
                            </SvgIcon>
                            <Typography variant='button'>Total Rejected :-</Typography>
                            <Typography variant='button'>{totalRejectedAmount ? totalRejectedAmount : 0}</Typography>
                        </Box>
                        {/* <Box>Somthing</Box>
                        <Box>Somthing</Box> */}
                    </Box>
                    <Table sx={{mt: 3}}>
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
                                <TableCell>
                                    View
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
                                    // onClick={() => handleRowSelect(customer.phone)}
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
                                            {customer.status === 'Approved' && customer?.image ? <Button
                                                startIcon={(
                                                    <SvgIcon fontSize="small">
                                                        <EyeIcon />
                                                    </SvgIcon>
                                                )}
                                                variant="outlined"
                                                // color={customer.Active ? 'success' : 'error'}
                                                sx={{ lineHeight: 0, fontSize: '0' }}
                                                onClick={() => handleApproveSelect(customer?.image)}
                                            ></Button> : <Button
                                                variant="outlined"
                                                onClick={() => handleOpenDialog(customer)}
                                                disabled={customer.status !== 'pending'}
                                            >
                                                Action
                                            </Button>}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                startIcon={(
                                                    <SvgIcon fontSize="small">
                                                        <EyeIcon />
                                                    </SvgIcon>
                                                )}
                                                variant="outlined"
                                                // color={customer.Active ? 'success' : 'error'}
                                                sx={{ lineHeight: 0, fontSize: '0' }}
                                                onClick={() => handleRowSelect(customer.phone)}
                                            >
                                                {/* {customer.Active ? 'Yes' : 'No'} */}
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
                rowsPerPageOptions={[10, 25, 50, 75, 150, 200]}
            />
            {/* Alert Dialog for changing status */}
            <ActionDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleCommonAction={handleCommonAction}
                selectedCustomer={selectedCustomer}
                setImg={setImg}
                setLoading={setLoading}
                content={'Do you want to approve or reject the withdraw request? If you approve request than please upload screenshot.'}
                button1={'Approve'}
                button2={'Reject'}
                handleOpenSnackbar={handleOpenSnackbar}
            />
            <UploadDialog
                openDialog={openUploadDialog}
                uploadedImg={uploadedImg}
                handleCloseDialog={handleCloseUploadDialog}
                button2={'Close'}
                content={'No Image found!'}
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

WithdrawReportTable.propTypes = {
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
