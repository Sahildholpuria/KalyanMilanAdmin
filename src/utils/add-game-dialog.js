import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import React, { useCallback, useState } from 'react'

const AddGameDialog = ({ values, setValues, openDialog, handleCloseDialog, handleReset, handleCommonAction, button1, button2 }) => {
    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );
    const handleTimeChange = useCallback(
        (name, newValue) => {
            // Ensure that newValue is a Date object
            // const selectedTime = newValue instanceof Date ? newValue : new Date();

            // Extract the time portion
            const timeValue = newValue.format('hh:mm A');

            // Update the state
            setValues((prevState) => ({
                ...prevState,
                [name]: timeValue,
            }));
        },
        []
    );

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} >
            <DialogTitle>Add Game</DialogTitle>
            <DialogContent sx={{ paddingBottom: '10px' }}>
                <Grid xs={12} md={12} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Grid
                        xs={12}
                        md={12}
                        sx={{ padding: '5px' }}
                    >
                        <TextField
                            fullWidth
                            // helperText="Please specify the first name"
                            label="Game Title"
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
                            name="isActive"
                            onChange={handleChange}
                            required
                            value={values.isActive}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        md={12}
                        lg={12}
                        sx={{ padding: '5px' }}
                    >
                        <Stack sx={{
                            '& .css-4jnixx-MuiStack-root': {
                                padding: '2px'
                            }
                        }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker
                                        label="Open Time"
                                        value={dayjs(values.open, 'hh:mm A')}
                                        onChange={(newValue) => handleTimeChange('open', newValue)}
                                        textField={(props) => (
                                            <TextField
                                                fullWidth
                                                label="Open Time"
                                                {...props}
                                                sx={{
                                                    width: '100%',
                                                }}
                                            />
                                        )}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Stack>
                        {/* <TextField
                                    fullWidth
                                    label="Open Time"
                                    name="open"
                                    type='timepicker'
                                    onChange={handleChange}
                                    required
                                    value={values.open}
                                /> */}
                    </Grid>
                    <Grid
                        xs={12}
                        md={12}
                        sx={{ padding: '5px' }}
                    >
                        <Stack sx={{
                            '& .css-4jnixx-MuiStack-root': {
                                padding: '2px'
                            }
                        }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker
                                        label="Close Time"
                                        value={dayjs(values.close, 'hh:mm A')}
                                        onChange={(newValue) => handleTimeChange('close', newValue)}
                                        textField={(props) => (
                                            <TextField
                                                fullWidth
                                                label="Close Time"
                                                {...props}
                                                sx={{
                                                    width: '100%',
                                                }}
                                            />
                                        )}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Stack>
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

export default AddGameDialog
