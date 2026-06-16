import { db } from './firebaseconfig';
import { collection, addDoc, query, orderBy, 
        onSnapshot, serverTimestamp } from 'firebase/firestore';

// mengirim pesan
export const sendMessage = async (chatRoomId, senderId, receiverId, Text, messageType = 'text', mediaUrl = '') => {
        try {
            const encryptedText = Text; 

            const messageData = {
                senderId,
                receiverId,
                text: encryptedText,
                messageType,
                mediaUrl,
                status: 'sent',
                timestamp: serverTimestamp(),
            };

            const messageRef = collection(db, 'chats', chatRoomId, 'messages');
            await addDoc(messageRef, messageData);

            return {success : true};
        } catch (error){
            console.error("Gagal mengirim pesan: ", error);
            return {success : false, error};
        }
};

// fungsi real time listener
export const listenMessages = (chatRoomId, callBack) => {
    const messageRef = collection(db, 'chats', chatRoomId, 'messages');
    const q = query(messageRef, orderBy('timestamp', 'asc'));

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
            const data = doc.data();

            const decryptedText = data.text;

            return {
                id: doc.id,
                ...data,
                text: decryptedText,
            };
        });

        callBack(messages);
    });
};