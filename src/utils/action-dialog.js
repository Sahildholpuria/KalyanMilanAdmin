import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { imgDB } from "../contexts/firebase"

export const ActionDialog = ({ openDialog, handleCloseDialog, handleCommonAction, content, button1, button2, handleOpenSnackbar, setLoading, setImg, selectedCustomer }) => {
    const handleUpload = (e) => {
        // console.log(e.target.files[0])
        try {
            setLoading(true)
            const imgs = ref(imgDB, `Withdraw/${selectedCustomer.id}`)
            uploadBytes(imgs, e.target.files[0]).then(data => {
                getDownloadURL(data.ref).then(val => {
                    setImg(val)
                    // console.log(val)
                })
            })
            setLoading(false);
            handleOpenSnackbar('File Uploaded Successfully!')
        } catch (error) {
            handleOpenSnackbar('Error Uploading File!')
        }
    }
    return (
        <Dialog open={openDialog} onClose={() => handleCloseDialog('Cancel')}>
            <DialogTitle>Change Status</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    {content}
                </Typography>
                <Grid xs={12} md={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Grid
                        xs={12}
                        md={12}
                        sx={{ paddingTop: '20px', textWrap: 'wrap', textAlign: 'center' }}
                    >
                        <input type="file" onChange={(e) => handleUpload(e)} style={{maxWidth: '100%'}}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCommonAction('Approve')}>{button1}</Button>
                <Button onClick={() => handleCommonAction('Reject')}>{button2}</Button>
            </DialogActions>
        </Dialog>
    )
}