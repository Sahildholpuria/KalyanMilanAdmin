import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

export const BidRevertDialog = ({ openDialog, handleCloseDialog, handleCommonAction, content, button1, button2 }) => {
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Clear & Refund All</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    {content}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCommonAction()}>{button1}</Button>
                <Button onClick={handleCloseDialog}>{button2}</Button>
            </DialogActions>
        </Dialog>
    )
}