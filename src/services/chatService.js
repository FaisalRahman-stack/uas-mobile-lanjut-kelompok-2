

// mengirim pesan (simulasi)
export const sendMessage = async (chatRoomId, senderId, receiverId, Text, messageType = 'text', mediaUrl = '') => {
        try {
        console.log(`[Mock Firebase] Pesan dikirim ke ${chatRoomId}: "${Text}"`);
        return { success: true };
    } catch (error) {
        console.error("Gagal mengirim pesan simulasi: ", error);
        return { success: false, error };
    }
};

// fungsi real time listener (simulasi)
export const listenMessages = (chatRoomId, callBack) => {
   console.log(`[Mock Firebase] Mulai mendengarkan room: ${chatRoomId}`);
    
    // data dummy awal agar FlatList tidak kosong saat dibuka
    const dummyMessages = [
        { id: '1', senderId: 'user_lain', text: 'Hai! jangan lupa project uas', timestamp: '20:00' },
        { id: '2', senderId: 'kamu', text: 'On Progress ya', timestamp: '20:05' },
    ];
    
    callBack(dummyMessages);

    return () => {
        console.log(`[Mock Firebase] Berhenti mendengarkan room: ${chatRoomId}`);
    };
};