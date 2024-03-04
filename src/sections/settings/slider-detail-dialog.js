import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imgDB, db } from "../../contexts/firebase";

const AddSlider = ({ values, setValues, setImg, openDialog, setLoading, handleOpenSnackbar, handleCloseDialog, handleReset, handleCommonAction, button1, button2 }) => {
    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );
    const handleUpload = (e) => {
        console.log(e.target.files[0])
        if (!values.title) {
            handleOpenSnackbar('Please type title first!');
            return;
        } else {
            setLoading(true)
            const imgs = ref(imgDB, `SliderImages/${values?.title}`)
            uploadBytes(imgs, e.target.files[0]).then(data => {
                getDownloadURL(data.ref).then(val => {
                    setImg(val)
                    setValues((prevState) => ({
                        ...prevState,
                        image: val,
                    }));
                    console.log(val)
                })
            })
            setLoading(false);
            handleOpenSnackbar('File Uploaded Successfully!')
        }
    }
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} >
            <DialogTitle>Add Game</DialogTitle>
            <DialogContent sx={{ paddingBottom: '10px' }}>
                <Grid xs={12} md={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Grid
                        xs={12}
                        md={12}
                        sx={{ padding: '5px' }}
                    >
                        <TextField
                            fullWidth
                            // helperText="Please specify the first name"
                            label="Slider Title"
                            name="title"
                            onChange={handleChange}
                            required
                            value={values.title}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        md={12}
                        sx={{ padding: '5px' }}
                    >
                        <TextField
                            fullWidth
                            helperText="Please specify the Yes or No"
                            label="Active status"
                            name="status"
                            onChange={handleChange}
                            required
                            value={values.status}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        md={12}
                        lg={12}
                        sx={{ padding: '5px' }}
                    >
                        <TextField
                            fullWidth
                            type='number'
                            // helperText="Please specify the Yes or No"
                            label="Display Order"
                            name="order"
                            onChange={handleChange}
                            required
                            value={values.order}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        md={12}
                        sx={{ padding: '15px', textWrap: 'wrap' }}
                    >
                        <input type="file" onChange={(e) => handleUpload(e)} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCommonAction()}>{button1}</Button>
                <Button onClick={() => handleReset()}>{button2}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddSlider
