import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';

export const WinningResultTable = (props) => {
    const {
        valuesResult,
    } = props;
    const sortedDate = valuesResult?.sort((a, b) => b.date - a.date);

    return (
        <Card sx={{mt: 2}}>
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
                                    </TableRow>
                                );
                            }))}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
        </Card>
    );
};

WinningResultTable.propTypes = {
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
