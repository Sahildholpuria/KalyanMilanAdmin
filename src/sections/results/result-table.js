import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Grid,
    Stack,
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
import { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { useRouter } from 'next/router';

export const ResultTable = (props) => {
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
        searchQuery = '', // Accept search query as a prop
    } = props;
    const [values, setValues] = useState({
        result_date: dayjs().format('YYYY-MM-DD'),
        game_name: null,
    });
    const filteredItems = items?.filter((customer) =>
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

    return (
        <Card>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedItems?.length === 0 ? ( // Check if there are no matching results
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No user data
                                    </TableCell>
                                </TableRow>
                            ) : (paginatedItems?.map((customer) => {
                                // const isSelected = selected.includes(customer.id);
                                const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

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
                                            {customer.email}
                                        </TableCell>
                                        <TableCell>
                                            {customer.address.city}, {customer.address.state}, {customer.address.country}
                                        </TableCell>
                                        <TableCell>
                                            {customer.phone}
                                        </TableCell>
                                        <TableCell>
                                            {createdAt}
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
