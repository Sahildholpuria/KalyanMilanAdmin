import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

export const ActionDialog = ({ openDialog, handleCloseDialog, handleCommonAction, content, button1, button2 }) => {
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Change Status</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    {content}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCommonAction('Approve')}>{button1}</Button>
                <Button onClick={() => handleCommonAction('Reject')}>{button2}</Button>
            </DialogActions>
        </Dialog>
    )
}