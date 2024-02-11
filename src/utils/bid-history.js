import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import { WinningResultTable } from "../sections/results/winning-result"
import { BidWinTable } from "../sections/bids/bid-win-table"
import { useCallback, useState } from "react";

export const BidHistoryDialog = ({ openDialog, handleCloseDialog, values, win }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
        },
        []
    );

    const handleRowsPerPageChange = useCallback(
        (event) => {
            setRowsPerPage(event.target.value);
        },
        []
    );
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true} maxWidth='lg'>
            <DialogTitle>{win ? `Winning History` : `Bid History`}</DialogTitle>
            <DialogContent>
                {win ? <BidWinTable
                    valuesResult={values}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    // onSelectAll={customersSelection.handleSelectAll}
                    // onSelectOne={customersSelection.handleSelectOne}
                    page={page}
                    rowsPerPage={rowsPerPage} /> : <BidWinTable
                    valuesResult={values}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    // onSelectAll={customersSelection.handleSelectAll}
                    // onSelectOne={customersSelection.handleSelectOne}
                    page={page}
                    rowsPerPage={rowsPerPage} />}
            </DialogContent>
        </Dialog>
    )
}