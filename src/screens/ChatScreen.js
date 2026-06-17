import React, { useState, useEffect, useRef } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    Animated, 
    Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
    const [messages, setMessages] = useState([
        {id: '1', senderId: 'user_lain', text: 'Hai! jangan lupa project uas', timestamp: '20:00'},
        {id: '2', senderId: 'kamu', text: 'On Progress ya', timestamp: '20:05'},
    ]);

    const [inputText, setInputText] = useState('');
    const paddingBottom = useRef(new Animated.Value(0)).current;

    useEffect(() => {
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
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

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
                    <TouchableOpacity style={styles.sendButton}>
                        <Text style={{color: '#fff'}}>Kirim</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    mainView: { flex: 1 },
    messageContainer: { marginVertical: 4, flexDirection: 'row' },
    myMessageContainer: { justifyContent: 'flex-end' },
    theirMessageContainer: { justifyContent: 'flex-start' },
    messageBubble: { padding: 12, borderRadius: 16, maxWidth: '80%' },
    myBubble: { backgroundColor: '#007AFF' },
    theirBubble: { backgroundColor: '#e5e5ea' },
    myText: { color: '#fff' },
    theirText: { color: '#000' },
    inputContainer: { 
        flexDirection: 'row', 
        padding: 10, 
        backgroundColor: '#fff', 
        borderTopWidth: 1, 
        borderColor: '#eee' 
    },
    input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 15, marginRight: 10 },
    sendButton: { backgroundColor: '#007AFF', borderRadius: 20, paddingHorizontal: 20, justifyContent: 'center' }
});