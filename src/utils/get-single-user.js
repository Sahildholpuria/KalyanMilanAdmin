import { collection, doc, getDoc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../contexts/firebase";
import { getRandomAvatar } from "./get-initials";

export const fetchUserData = async (id, setUser) => {
    try {
        const userDocRef = doc(db, 'Users', id);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            setUser({
                ...userDocSnapshot.data(),
                avatar: getRandomAvatar(), // Assign a random avatar to the avatar property
            });
        } else {
            console.log('Document not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};
export const fetchUserId = async (phone) => {
    try {
        const q = query(collection(db, 'Users'), where('phone', '==', phone));
        return new Promise((resolve, reject) => {
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const ref = querySnapshot.docs[0].ref;
                    const userId = ref._key.path.segments.slice(-1)[0];
                    resolve(userId);
                } else {
                    console.log('Document not found');
                    resolve(null); // Or you can reject with an error if needed
                }
            }, (error) => {
                console.error('Error fetching user data:', error);
                reject(error);
            });

            // Make sure to unsubscribe when the promise resolves or rejects
            return () => unsubscribe();
        });
    } catch (error) {
    console.error('Error fetching user data:', error);
    }
};
export const updateUser = async (userId, updatedData) => {
    try {
        // Reference to the user document in Firestore
        const userRef = doc(db, 'Users', userId);

        // Update the document with the new data
        await updateDoc(userRef, updatedData);

        console.log('User data updated successfully!');
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error; // Propagate the error for handling in the calling component
    }
};
export const updateCustomerField = async (customerId, field, value) => {
    try {
        const userRef = doc(db, 'Users', customerId);
        await updateDoc(userRef, { [field]: value });
        console.log(`Customer field '${field}' updated successfully for user '${customerId}'.`);
    } catch (error) {
        console.error('Error updating customer field:', error);
        throw error; // Optionally, handle the error in your component
    }
};
export const updateEventField = async (customerId, field, value) => {
    try {
        const userRef = doc(db, 'Events', customerId);
        await updateDoc(userRef, { [field]: value });
        console.log(`Customer field '${field}' updated successfully for user '${customerId}'.`);
    } catch (error) {
        console.error('Error updating customer field:', error);
        throw error; // Optionally, handle the error in your component
    }
};
export const updateUserCoins = async (values) => {
    try {
        // Fetch the document from the Users collection where userName matches the phone number
        const userDocRef = doc(db, 'Users', values.user_name);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            // Retrieve the current value of the coins field
            const currentCoins = userDocSnapshot.data().coins;

            // Calculate the new value of coins by adding the amount to the current value
            const newCoins = currentCoins + Number(values.amount);

            // Update the document in the Users collection with the new value of coins
            await updateDoc(userDocRef, { coins: newCoins });

            console.log(`Coins updated successfully for user ${values.user_name}`);
        } else {
            console.log(`User ${values.user_name} not found`);
        }
    } catch (error) {
        console.error('Error updating user coins:', error);
    }
};
