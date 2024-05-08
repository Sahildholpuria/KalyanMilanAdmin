import { collection, deleteField, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db, imgDB } from "../contexts/firebase";
import { deleteObject, ref } from "firebase/storage";

export const deleteSubAdmin = async (id) => {
    try {
        const q = query(collection(db, 'admin'), where('name', '==', 'admin'));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data[id]) {
                batch.update(doc.ref, { [id]: deleteField() });
            }
        });

        await batch.commit();
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
        console.log('SubAdmin deleted successfully');
    } catch (error) {
        console.error('Error deleting slider:', error);
    }
};
export const updateSubAdmin = async (id, value) => {
    try {
        const q = query(collection(db, 'admin'), where('name', '==', 'admin'));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data[id]) {
                const sliderData1Path = `${id}.status`;
                batch.update(doc.ref, { [sliderData1Path]: value });
            }
        });

        await batch.commit();
        console.log('SubAdmin Updated successfully');
    } catch (error) {
        console.error('Error update slider:', error);
    }
};
export const addSubAdminData = async (values, now, handleOpenSnackbar, setLoading) => {
    try {
        const q = query(collection(db, 'admin'), where('name', '==', 'admin'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const data = doc.data();
            let newSliderData = {};
            let newKey = '';

            // Find the next available sliderData field
            for (let i = 1; i <= 100; i++) {
                const key = `subAdmin${i}`;
                if (!data[key]) {
                    newKey = key;
                    break;
                }
            }

            if (!newKey) {
                // Maximum number of sliderData fields reached
                handleOpenSnackbar('Cannot add more subAdmin fields');
                setLoading(false);
                return;
            }

            newSliderData[newKey] = {
                name: values.name,
                status: values.status === 'Yes' ? true : false,
                email: values.email,
                password: values.password,
                date: now.toString(),
            };

            // const docRef = doc(db, 'admin', doc.id);
            await updateDoc(doc.ref, newSliderData);

            // Log success message
            console.log('SubAdmin added successfully!');
            handleOpenSnackbar('SubAdmin added successfully!');
        });
    } catch (error) {

    }
};
// Email validation function
export const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    if (!emailRegex) {
        return 'Invalid email address';
    }

    return '';
};