import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
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
import { updateCustomerField } from '../../utils/get-single-user';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
// import { useRouter } from 'next/router';

export const CustomersTable = (props) => {
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
    handleRowSelect,
    searchQuery = '', // Accept search query as a prop
  } = props;
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
  const handleFieldUpdate = async (customerId, field, value) => {
    try {
      await updateCustomerField(customerId, field, value);
    } catch (error) {
      console.error('Error updating customer field:', error);
      // Optionally, handle the error (e.g., show a notification to the user)
    }
  };
  return (
    <Card sx={{ border: '1px solid #556ee6' }}>
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
                  Email
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Coins
                </TableCell>
                <TableCell>
                  Betting
                </TableCell>
                <TableCell>
                  Transfer
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
                const createdAt = format(customer.date, 'dd/MM/yyyy');

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
                    <TableCell sx={{wordBreak: 'break-word', maxWidth: '30%'}}>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {/* {customer.address.city}, {customer.address.state}, {customer.address.country} */}
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      {customer.phone}
                    </TableCell>
                    <TableCell>
                      {customer.coins}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color={customer.Betting ? 'success' : 'error'}
                        sx={{lineHeight: 1, fontSize: '0.85rem'}}
                        onClick={() => handleFieldUpdate(customer.id, 'Betting', !customer.Betting)}
                      >
                        {customer.Betting ? 'Yes' : 'No'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color={customer.Transfer ? 'success' : 'error'}
                        sx={{lineHeight: 1, fontSize: '0.85rem'}}
                        onClick={() => handleFieldUpdate(customer.id, 'Transfer', !customer.Transfer)}
                      >
                        {customer.Transfer ? 'Yes' : 'No'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color={customer.Active ? 'success' : 'error'}
                        sx={{lineHeight: 1, fontSize: '0.85rem'}}
                        onClick={() => handleFieldUpdate(customer.id, 'Active', !customer.Active)}
                      >
                        {customer.Active ? 'Yes' : 'No'}
                      </Button>
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
                        sx={{lineHeight: 0, fontSize: '0'}}
                        onClick={() => handleRowSelect(customer.id)}
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

CustomersTable.propTypes = {
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
