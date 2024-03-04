import { collection, deleteField, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db, imgDB } from "../contexts/firebase";
import { deleteObject, ref } from "firebase/storage";

export const deleteSlider = async (id, img) => {
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
        if (img) {
            const imageRef = ref(imgDB, img);
            deleteObject(imageRef)
                .then(() => {
                    // Image deleted successfully
                })
                .catch((error) => {
                    // Handle error
                    console.log(error, 'error');
                });
        }
        console.log('SliderData deleted successfully');
    } catch (error) {
        console.error('Error deleting slider:', error);
    }
};
export const updateSlider = async (id, value) => {
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
        console.log('SliderData Updated successfully');
    } catch (error) {
        console.error('Error update slider:', error);
    }
};
export const addSliderData = async (values, now, handleOpenSnackbar, setLoading) => {
    try {
        const q = query(collection(db, 'admin'), where('name', '==', 'admin'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const data = doc.data();
            let newSliderData = {};
            let newKey = '';

            // Find the next available sliderData field
            for (let i = 1; i <= 10; i++) {
                const key = `sliderData${i}`;
                if (!data[key]) {
                    newKey = key;
                    break;
                }
            }

            if (!newKey) {
                // Maximum number of sliderData fields reached
                handleOpenSnackbar('Cannot add more sliderData fields');
                setLoading(false);
                return;
            }

            newSliderData[newKey] = {
                title: values.title,
                status: values.status === 'Yes' ? true : false,
                order: values.order,
                image: values.image,
                date: now.toString(),
            };

            // const docRef = doc(db, 'admin', doc.id);
            await updateDoc(doc.ref, newSliderData);

            // Log success message
            console.log('SliderData added successfully!');
            handleOpenSnackbar('SliderData added successfully!');
        });
    } catch (error) {
        
    }
};