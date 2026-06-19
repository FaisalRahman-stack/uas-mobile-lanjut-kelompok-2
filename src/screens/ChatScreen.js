import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, 
        TouchableOpacity, Keyboard, Animated, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { sendMessage, listenMessages } from '../services/chatService';
import { theme } from '../utils/theme';

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const paddingBottom = useRef(new Animated.Value(0)).current;

    //dummy id 
    const chatRoomId = 'room_uas_kelompok2';
    const myId = 'kamu';
    const receiverId = 'user_lain';
    
    useEffect(() => {
        const unsubscribeFirestore = listenMessages(chatRoomId, (data) => {
            setMessages(data);
        });
        
        // Mendengarkan event keyboard muncul
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSubscription = Keyboard.addListener(showEvent, (e) => {
            Animated.timing(paddingBottom, {
                toValue: e.endCoordinates.height,
                duration: 200,
                useNativeDriver: false,
            }).start();
        });

        const hideSubscription = Keyboard.addListener(hideEvent, () => {
            Animated.timing(paddingBottom, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        });

        return () => {
            unsubscribeFirestore();
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleSend = async () => {
        if (inputText.trim() === '') return;
        
        const textToSend = inputText;
        setInputText('');

        const result = await sendMessage(chatRoomId, myId, receiverId, textToSend);
        if (!result.success){
            alert('Gagal mengirim pesan, periksa koneksi atau setup Firebase anggota 2');
        }
    };

    const renderMessageItem = ({ item }) => {
        const isMyMessage = item.senderId === 'kamu';
        return (
            <View style={[styles.messageContainer, isMyMessage ? styles.myMessageContainer : styles.theirMessageContainer]}>
                <View style={[styles.messageBubble, isMyMessage ? styles.myBubble : styles.theirBubble]}>
                    <Text style={isMyMessage ? styles.myText : styles.theirText}>{item.text}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Animated.View style={[styles.mainView, { paddingBottom }]}>
                <FlatList 
                    style={{ flex: 1 }} 
                    data={messages} 
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessageItem} 
                    contentContainerStyle={{ padding: 16 }}
                    keyboardShouldPersistTaps="handled"
                />
                
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Ketik pesan...'
                        value={inputText} 
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Text style={{color: '#fff'}}>Kirim</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.background 
  },
  mainView: { 
    flex: 1 
  },
  messageContainer: { 
    marginVertical: 4, 
    flexDirection: 'row',
    paddingHorizontal: 10 
  },
  myMessageContainer: { 
    justifyContent: 'flex-end' 
  },
  theirMessageContainer: { 
    justifyContent: 'flex-start' 
  },
  messageBubble: { 
    padding: 12, 
    borderRadius: 16, 
    maxWidth: '80%' 
  },
  myBubble: { 
    backgroundColor: theme.primary 
  },
  theirBubble: { 
    backgroundColor: theme.backgroundSecondary 
  },
  myText: { 
    color: theme.background 
  },
  theirText: { 
    color: theme.textPrimary 
  },
  inputContainer: { 
    flexDirection: 'row', 
    padding: 10, 
    backgroundColor: theme.background, 
    borderTopWidth: 1, 
    borderColor: theme.backgroundSecondary 
  },
  input: { 
    flex: 1, 
    backgroundColor: theme.backgroundSecondary, 
    borderRadius: 20, 
    paddingHorizontal: 15, 
    marginRight: 10,
    color: theme.textPrimary 
  },
  sendButton: { 
    backgroundColor: theme.primary, 
    borderRadius: 20, 
    paddingHorizontal: 20, 
    justifyContent: 'center' 
  }
});