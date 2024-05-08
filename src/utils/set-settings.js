import { collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../contexts/firebase";

// Function to update values in Firestore
export const updateAdminSettings = async (newValues, admin) => {
    try {
        if (admin[0]?.name === 'Admin') {
            // Find the 'admin' document
            const q = query(collection(db, 'admin'), where('name', '==', 'admin'));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const adminDoc = querySnapshot.docs[0];
                const adminRef = doc(db, 'admin', adminDoc.ref._key.path.segments.slice(-1)[0]);

                // Update the document with new values
                await updateDoc(adminRef, newValues);

                console.log('Admin settings updated successfully!');
            } else {
                console.log('Admin document not found.');
            }
        }else{
            const q = query(collection(db, 'admin'), where('name', '==', 'admin'));
            const querySnapshot = await getDocs(q);
            const batch = writeBatch(db);

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data[admin[0]?.id]) {
                    const sliderData1Path = `${admin[0]?.id}.password`;
                    batch.update(doc.ref, { [sliderData1Path]: newValues.password });
                }
            });

            await batch.commit();
            console.log('SubAdmin Updated successfully');
        }

    } catch (error) {
        console.error('Error updating admin settings:', error);
    }
};