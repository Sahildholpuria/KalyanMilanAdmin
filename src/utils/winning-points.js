import { addDoc, collection, deleteDoc, deleteField, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
export const AddWinningHistory = async (tableData, wonData) => {
    try {
        // Loop through tableData to add documents to 'winningHistory' collection
        for (const data of tableData) {
            await addDoc(collection(db, 'winningHistory'), data);
        }
        // console.log(wonData);
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
        // Loop through wonData to update documents in 'User_Events' collection
        for (const data of wonData) {
            // Fetch the document in 'User_Events' based on the data
            const userEventsQuery = query(collection(db, 'User_Events'),
                where('event', '==', data.event),
                where('date', '==', data.date),
                where('name', '==', data.name),
                where('session', '==', data.session)
            );

            const userEventsSnapshot = await getDocs(userEventsQuery);

            if (!userEventsSnapshot.empty) {
                // console.log(data.won)
                // Update the document in 'User_Events' with the won amount
                const userEventsDocRef = userEventsSnapshot.docs[0].ref;
                await updateDoc(userEventsDocRef, {
                    won: Number(data.won),
                });
            } else {
                // Handle case when no document is found
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
        // Fetch user events data where date matches resultDate
        const userEventsQuery = query(collection(db, 'User_Events'), where('date', '==', selectedCustomer.result_date));
        const userEventsSnapshot = await getDocs(userEventsQuery);

        // Loop through user events data to remove won points
        for (const docSnapshot of userEventsSnapshot.docs) {
            // Update the document in 'User_Events' to remove the 'won' column
            const userEventsDocRef = docSnapshot.ref;
            await updateDoc(userEventsDocRef, {
                won: deleteField(),
            });
        }
    } catch (error) {
        console.error('Error Add Data:', error);
    }
};