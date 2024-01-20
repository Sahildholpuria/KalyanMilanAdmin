import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../contexts/firebase";

export const fetchGameData = async (id, setUser) => {
    try {
        const userDocRef = doc(db, 'Events', id);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            setUser(userDocSnapshot.data());
        } else {
            console.log('Document not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

export const updateGame = async (gameId, updatedData) => {
    try {
        // Reference to the user document in Firestore
        const userRef = doc(db, 'Events', gameId);

        // Update the document with the new data
        await updateDoc(userRef, updatedData);

        console.log('Game data updated successfully!');
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error; // Propagate the error for handling in the calling component
    }
};
