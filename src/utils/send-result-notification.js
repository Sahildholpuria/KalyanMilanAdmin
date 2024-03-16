import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../contexts/firebase";

const getTokens = async () => {
    const resultQuery = collection(db, 'RegisteredDevice');
    const resultSnapshot = await getDocs(resultQuery);

    const fcmTokens = resultSnapshot.docs.map((doc) => {
        return { id: doc.id, token: doc.data().token };
    });

    // console.log(fcmTokens);

    return fcmTokens;
}

const removeInvalidTokens = async (invalidTokenIds) => {
    const registeredDevicesCollection = collection(db, 'RegisteredDevice');

    for (const tokenId of invalidTokenIds) {
        await deleteDoc(doc(registeredDevicesCollection, tokenId.id));
        // console.log(`Token removed: ${tokenId.token}`);
    }
}

export const SendRandomNotification = async (title, message) => {
    try {
        const fcmTokens = await getTokens();
        // console.log(fcmTokens);
        const serverKey = 'AAAAUthtCLE:APA91bFs5unrO7fJD3XrP2iXhbjBPnvjace7MWIGWwydcLWHhI_nmhMT0qZyoOKO9B_lri-mrTKsc_tX_x2X2wtuEyxQptZmB7YG_9yDXrNZunkBMV8qsFN0bwPCULyhYOWCLGcU5q2b';

        const notification = {
            title: title,
            body: message,
            icon: 'ic_notification',
        };

        let payloadTokens;
        if (fcmTokens.length > 1) {
            payloadTokens = fcmTokens.map((item) => item.token);
        } else {
            payloadTokens = [fcmTokens[0].token];
        }

        const body = fcmTokens.length === 1 ? JSON.stringify({
            to: payloadTokens[0],
            priority: 'high',
            notification: notification,
        }) : JSON.stringify({
            registration_ids: payloadTokens,
            priority: 'high',
            notification: notification,
        });

        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${serverKey}`,
            },
            body: body,
        });

        const responseData = await response.json();
        // console.log('Notification sent successfully:', responseData);

        // Check for "NotRegistered" error and remove invalid tokens
        const invalidTokenIds = fcmTokens.filter((item, index) => {
            return responseData.results[index]?.error === "NotRegistered";
        });

        if (invalidTokenIds.length > 0) {
            await removeInvalidTokens(invalidTokenIds);
        }

    } catch (error) {
        console.error('Error sending notifications:', error);
    }
}

export const SendResultNotification = async (title, session) => {
    try {
        const fcmTokens = await getTokens();
        // console.log(fcmTokens);
        const serverKey = 'AAAAUthtCLE:APA91bFs5unrO7fJD3XrP2iXhbjBPnvjace7MWIGWwydcLWHhI_nmhMT0qZyoOKO9B_lri-mrTKsc_tX_x2X2wtuEyxQptZmB7YG_9yDXrNZunkBMV8qsFN0bwPCULyhYOWCLGcU5q2b';

        const notification = {
            title: 'Result Declared',
            body: `${title.toUpperCase()} result for ${session} has been declared`,
            icon: 'ic_notification',
        };

        const data = {
            title: title,
            action: 'Results',
        };

        let payloadTokens;
        if (fcmTokens.length > 1) {
            payloadTokens = fcmTokens.map((item) => item.token);
        } else {
            payloadTokens = [fcmTokens[0].token];
        }

        const body = fcmTokens.length === 1 ? JSON.stringify({
            to: payloadTokens[0],
            priority: 'high',
            notification: notification,
            data: data,
        }) : JSON.stringify({
            registration_ids: payloadTokens,
            priority: 'high',
            notification: notification,
            data: data,
        });

        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${serverKey}`,
            },
            body: body,
        });

        const responseData = await response.json();
        // console.log('Notification sent successfully:', responseData);

        // Check for "NotRegistered" error and remove invalid tokens
        const invalidTokenIds = fcmTokens.filter((item, index) => {
            return responseData.results[index]?.error === "NotRegistered";
        });

        if (invalidTokenIds.length > 0) {
            await removeInvalidTokens(invalidTokenIds);
        }

    } catch (error) {
        console.error('Error sending notifications:', error);
    }
}