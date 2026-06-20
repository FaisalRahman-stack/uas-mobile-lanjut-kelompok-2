import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../utils/theme';
import { dummyUsers } from '../utils/userDummyData'; 

export default function ChatListScreen({ navigation }) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => {
        navigation.navigate('ChatRoom', {
          targetUserId: `room_${item.userId}`,
          userName: item.displayName
        });
      }}
    >
      <Image source={{ uri: item.userPhoto }} style={styles.avatar} />
      
      <View style={styles.chatInfo}>
        <View style={styles.chatHeaderRow}>
          <Text style={styles.chatName}>{item.displayName}</Text>
          <Text style={styles.chatTime}>18:39</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          Tap untuk membuka obrolan dengan @{item.username}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>

      <View style={styles.contentContainer}>
        {dummyUsers.length === 0 ? (
          <Text style={styles.placeholderText}>Belum ada obrolan terbaru</Text>
        ) : (
          <FlatList
            data={dummyUsers}
            keyExtractor={(item) => item.userId}
            renderItem={renderChatItem}
            style={{ width: '100%' }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  headerContainer: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: theme.background,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.backgroundSecondary || '#333',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: theme.background,
  },
  placeholderText: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.backgroundSecondary || '#222',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  chatTime: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  lastMessage: {
    fontSize: 14,
    color: theme.textSecondary,
  },
});