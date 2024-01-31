import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import { WinningResultTable } from "../sections/results/winning-result"

export const ResultShowWinner = ({ openDialog, handleCloseDialog, tableData }) => {
    // Calculate total bid amount and total winning amount
    const calculateTotalAmounts = () => {
        let totalBidAmount = 0;
        let totalWinningAmount = 0;

        tableData.forEach((item) => {
            totalBidAmount += parseInt(item.points, 10) || 0;
            totalWinningAmount += parseInt(item.won, 10) || 0;
        });

        return { totalBidAmount, totalWinningAmount };
    };

    const total = calculateTotalAmounts();

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true} maxWidth='md'>
            <DialogTitle>Winniner List</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                    >
                        <Stack spacing={1}>
                            <Typography variant="h6">
                                Total Bid Amount : {total.totalBidAmount}
                            </Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="h6">
                                Total Winning Amount : {total.totalWinningAmount}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <WinningResultTable valuesResult={tableData}/>
            </DialogContent>
        </Dialog>
    )
}