import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

export const SliderActionDialog = ({ openDialog, handleCloseDialog, handleCommonAction, title, content, button1, button2 }) => {
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{title}</DialogTitle>
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