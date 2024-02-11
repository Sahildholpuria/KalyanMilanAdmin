import { collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../contexts/firebase";

export const updateCoinsAndDelete = async (resultData) => {
    try {
        // 1. Fetch the user document where phone is equal to resultData.phone
        const q = query(collection(db, 'Users'), where('phone', '==', resultData.phone));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userRef = doc(db, 'Users', userDoc.id); // Get reference to the user document
            const userData = userDoc.data(); // Get user data
            const newCoins = userData.coins + Number(resultData.points); // Calculate new coins
            // 2. Update the coins field in the fetched user document by adding the points
            await updateDoc(userRef, { coins: newCoins }); // Update the coins field
        }


        // 3. Delete the document in the User_Events collection with the reference ID resultData.id
        const eventRef = doc(db, 'User_Events', resultData.id);
        await deleteDoc(eventRef);

        // Log success message
        console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating bid:', error);
    }
};