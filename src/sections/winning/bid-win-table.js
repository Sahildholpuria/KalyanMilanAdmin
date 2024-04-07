import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
    SvgIcon,
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
import { fetchUserId } from '../../utils/get-single-user';
import { useNavigate } from 'react-router-dom';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';

export const BidWinTable = (props) => {
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
    } = props;
    const [resultData, setResultData] = useState([]);
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const sortedDate = resultData?.sort((a, b) => b.date - a.date);
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
            const formattedDate = new Date(valuesResult.result_date).toDateString();
            const q = query(collection(db, 'User_Events'), where('date', '==', formattedDate), where('event', '==', valuesResult.game_name));
            await onSnapshot(q, (querySnapshot) => {
                if (querySnapshot.empty) {
                    setResultData([]);
                    console.log('No Bid history available!')
                } else {
                    setResultData(querySnapshot.docs.map(doc => ({
                        id: doc.ref._key.path.segments.slice(-1)[0],
                        // avatar: '',
                        user_name: doc.data().name,
                        game_name: doc.data().event,
                        game_type: doc.data().game,
                        session: doc.data().session ? doc.data().session : 'N/A',
                        date: new Date(doc.data().date),
                        phone: doc.data().phone,
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

    useEffect(() => {
        // if (valuesResult?.date) {
        // Fetch data based on date
        fetchData();
        // }
    }, []);
    // Function to handle opening the dialog
    const handleOpenDialog = async (phone) => {
        // console.log(phone)
        const id = await fetchUserId(phone);
        // console.log(id);
        navigate(`/users/${id}`);
    };

    return (
        <Card sx={{ border: '1px solid #556ee6' }}>
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
                                    View
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
                                                startIcon={(
                                                    <SvgIcon fontSize="small">
                                                        <EyeIcon />
                                                    </SvgIcon>
                                                )}
                                                variant="outlined"
                                                // color={customer.Active ? 'success' : 'error'}
                                                sx={{ lineHeight: 0, fontSize: '0' }}
                                                onClick={() => handleOpenDialog(customer.phone)}
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
        </Card>
    );
};

BidWinTable.propTypes = {
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
