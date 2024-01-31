import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../contexts/firebase";

// Calculate winning points based on game type and points
export const calculateWinningPoints = (gameRates, game, points) => {
    switch (game) {
        case "Single Digit":
            return Math.round(points * (parseFloat(gameRates.singleDigitValue2) / 10));
        case "Jodi Digit":
            return Math.round(points * (parseFloat(gameRates.jodiDigitValue2) / 10));
        case "Single Panna":
            return Math.round(points * (parseFloat(gameRates.singlePannaValue2) / 10));
        case "Double Panna":
            return Math.round(points * (parseFloat(gameRates.doublePannaValue2) / 10));
        case "Triple Panna":
            return Math.round(points * (parseFloat(gameRates.triplePannaValue2) / 10));
        case "Half Sangam":
            return Math.round(points * (parseFloat(gameRates.halfSangamValue2) / 10));
        case "Full Sangam":
            return Math.round(points * (parseFloat(gameRates.fullSangamValue2) / 10));
        default:
            return 0;
    }
};

// Function to Add values in Firestore
export const AddWinningHistory = async (tableData) => {
    try {
        // Loop through tableData to add documents to 'winningHistory' collection
        for (const data of tableData) {
            await addDoc(collection(db, 'winningHistory'), data);
        }

        // Loop through tableData to update user's coins
        for (const data of tableData) {
            // Fetch the user with the specified phone number
            const userQuery = query(collection(db, 'Users'), where('phone', '==', data.phone));
            const userSnapshot = await getDocs(userQuery);

            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0];
                const userId = userDoc.ref._key.path.segments.slice(-1)[0];

                // Get the current coins value
                const currentCoins = userDoc.data().coins;

                // Add the won amount to the coins value
                const updatedCoins = currentCoins + Number(data.won);

                // Update the user's coins value in the 'Users' collection
                await updateDoc(doc(db, 'Users', userId), {
                    coins: updatedCoins,
                });
            }
        }
    } catch (error) {
        console.error('Error Add Data:', error);
    }
};
// Function to Add values in Firestore
export const RemoveWinningHistory = async (selectedCustomer) => {
    try {
        // Fetch winning history data where date matches resultDate
        const winningHistoryQuery = query(collection(db, 'winningHistory'), where('date', '==', selectedCustomer.result_date));
        const winningHistorySnapshot = await getDocs(winningHistoryQuery);

        // Loop through winning history data to remove won points
        for (const docSnapshot of winningHistorySnapshot.docs) {
            const winningData = docSnapshot.data();

            // Fetch the user with the specified phone number
            const userQuery = query(collection(db, 'Users'), where('phone', '==', winningData.phone));
            const userSnapshot = await getDocs(userQuery);

            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0];
                const userId = userDoc.ref._key.path.segments.slice(-1)[0];

                // Get the current coins value
                const currentCoins = userDoc.data().coins;

                // Subtract the won amount from the coins value
                const updatedCoins = currentCoins - Number(winningData.won);

                // Update the user's coins value in the 'Users' collection
                await updateDoc(doc(db, 'Users', userId), {
                    coins: updatedCoins,
                });
            }

            // Delete the winning history document
            await deleteDoc(doc(db, 'winningHistory', docSnapshot.id));
        }

    } catch (error) {
        console.error('Error Add Data:', error);
    }
};