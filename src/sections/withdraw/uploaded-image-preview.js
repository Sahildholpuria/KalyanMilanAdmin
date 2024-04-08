import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material"
import { useState } from "react";

export const UploadDialog = ({ openDialog, handleCloseDialog, button2, uploadedImg, content }) => {
    const [loading, setLoading] = useState(true);
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true} maxWidth='md'>
            <DialogTitle>Uploaded Screeshot</DialogTitle>
            <DialogContent>
                {uploadedImg ?
                    <Grid container justifyContent="center">
                        <img
                            src={uploadedImg}
                            alt="uploadedSS"
                            style={{
                                display: loading ? 'none' : 'block',
                                maxWidth: '100%',
                                maxHeight: '60vh',
                                width: 'auto',
                                height: 'auto',
                            }}
                            onLoad={() => setLoading(false)}
                            onError={() => setLoading(false)}
                        />
                        {loading && (
                            <Typography variant="body1">
                                Loading image...
                            </Typography>
                        )}
                    </Grid> : <Typography variant="body1">
                        {content}
                    </Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>{button2}</Button>
            </DialogActions>
        </Dialog>
    )
}