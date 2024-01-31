import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

export const ResultActionDialog = ({ openDialog, handleCloseDialog, handleCommonAction, content, button1, button2 }) => {
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Delete Result</DialogTitle>
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