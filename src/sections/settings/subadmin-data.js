import { useCallback, useEffect, useMemo, useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Container, Snackbar, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../../layouts/dashboard/layout';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, imgDB } from '../../contexts/firebase';
import { SliderDataTable } from './slider-data-table';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import AddSlider from './slider-detail-dialog';
import { deleteObject, ref } from 'firebase/storage';
import { addSliderData } from '../../utils/slider-actions';
import { SubAdminDataTable } from './subadmin-data-table';
import AddSubAdmin from './subadmin-detail-dialog';
import { addSubAdminData, validateEmail } from '../../utils/subAdmin-actions';

const now = new Date();

const SubAdminData = () => {
    const [loading, setLoading] = useState(false);
    const [subAdminData, setSubAdminData] = useState(null);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        status: '',
        date: now.toString(),
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    // const [img, setImg] = useState('')

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleReset = () => {
        // if (img) {
        //     const imageRef = ref(imgDB, img);
        //     deleteObject(imageRef)
        //         .then(() => {
        //             // Image deleted successfully
        //         })
        //         .catch((error) => {
        //             // Handle error
        //             console.log(error, 'error');
        //         });
        // }
        setValues((prevState) => ({
            ...prevState,
            name: '',
            email: '',
            password: '',
            status: '',
            date: now.toString(),
        }))
    }
    const handleCommonAction = async () => {
        try {
            if (!values.name || !values.status || !values.email || !values.password) {
                handleOpenSnackbar('All fields are required!')
                return;
            }
            if(validateEmail(values.email)){
                handleOpenSnackbar(validateEmail(values.email));
                return;
            }
            handleCloseDialog();
            setLoading(true);
            // Add the data to the Events table in Firebase
            await addSubAdminData(values, now, handleOpenSnackbar, setLoading);
            setValues((prevState) => ({
                ...prevState,
                name: '',
                email: '',
                password: '',
                status: '',
                date: now.toString(),
            }))

            // Close the dialog
            handleCloseDialog();
        } catch (error) {
            handleOpenSnackbar(`Error Adding slider!`);
            console.error('Error Adding sliderData:', error);
        }
        setLoading(false);
    };
    const handleSliderData = async () => {
        try {
            const q = query(collection(db, 'admin'), where('name', '==', 'admin'));
            await onSnapshot(q, (querySnapshot) => {
                const data = querySnapshot.docs[0].data();
                const subAdminData = [];
                // Iterate over the keys of the document
                for (const key in data) {
                    // Check if the key starts with 'slider' and the value is truthy
                    if (key.startsWith('subAdmin') && data[key]) {
                        subAdminData.push({
                            id: key, // Assuming key is the ID
                            ...data[key],
                        });
                    }
                }
                // console.log(subAdminData)
                setSubAdminData(subAdminData);
            })
        } catch (error) {
            console.log(error, 'error')
        }
    }
    useEffect(() => {
        handleSliderData();
    }, [])
    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };
    const handleOpenSnackbar = (message) => {
        setSnackbarMessage(message);
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={!!snackbarMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h5">
                                    Sub Admin Management
                                </Typography>
                                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
                            </Stack>
                            <div>
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    onClick={handleOpenDialog}
                                >
                                    Add SubAdmin
                                </Button>
                            </div>
                        </Stack>
                        <SubAdminDataTable valuesResult={subAdminData} handleOpenSnackbar={handleOpenSnackbar} />
                    </Stack>
                </Container>
            </Box>
            <AddSubAdmin
                values={values}
                setValues={setValues}
                // setImg={setImg}
                openDialog={openDialog}
                handleOpenSnackbar={handleOpenSnackbar}
                setLoading={setLoading}
                // selectedCustomer={selectedCustomer}
                handleCloseDialog={handleCloseDialog}
                handleCommonAction={handleCommonAction}
                handleReset={handleReset}
                button1={'Submit'}
                button2={'Reset'}
            />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default SubAdminData;
