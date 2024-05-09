import { collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../contexts/firebase";

// Function to update values in Firestore
export const updateAdminSettings = async (newValues) => {
    try {
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
    } catch (error) {
        console.error('Error updating admin settings:', error);
    }
};