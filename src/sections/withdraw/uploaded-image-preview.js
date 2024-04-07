import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material"

export const UploadDialog = ({ openDialog, handleCloseDialog, button2, uploadedImg, content }) => {
    console.log(uploadedImg)
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Uploaded Screeshot</DialogTitle>
            <DialogContent>
                {uploadedImg ?
                <Grid xs={12} md={12} >
                    <iframe src={uploadedImg} alt="uploadedSS" />
                    </Grid> : <Typography variant="body1">
                        {content}
                    </Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseDialog}>{button2}</Button>
            </DialogActions>
        </Dialog>
    )
}