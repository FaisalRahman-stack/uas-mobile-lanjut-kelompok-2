import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { dummyUsers } from '../utils/userDummyData';

export default function SocialScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('followers');
  const [followingList, setFollowingList] = useState(['user_002', 'user_004']);

  const handleFollowToggle = (userId) => {
    setFollowingList((prevList) =>
      prevList.includes(userId)
        ? prevList.filter((id) => id !== userId)
        : [...prevList, userId]
    );
  };

  const filteredUsers = useMemo(() => {
    return dummyUsers.filter((user) => {
      const matchesSearch = user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.username.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === 'following') {
        return matchesSearch && followingList.includes(user.userId);
      }
      return matchesSearch;
    });
  }, [searchQuery, activeTab, followingList]);

  const renderUserItem = ({ item }) => {
    const isFollowing = followingList.includes(item.userId);

    return (
      <View style={styles.userCard}>
        <View style={styles.profileSection}>
          <Image source={{ uri: item.userPhoto }} style={styles.avatar} cachePolicy="disk" />
          <View style={styles.textSection}>
            <Text style={styles.displayNameText}>{item.displayName}</Text>
            <Text style={styles.usernameText}>@{item.username}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.actionButton, isFollowing ? styles.followingBtn : styles.followBtn]}
          onPress={() => handleFollowToggle(item.userId)}
        >
          <Text style={[styles.actionButtonText, isFollowing && styles.followingBtnText]}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari pengguna..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'followers' && styles.activeTabButton]}
          onPress={() => setActiveTab('followers')}
        >
          <Text style={[styles.tabText, activeTab === 'followers' && styles.activeTabText]}>
            Followers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'following' && styles.activeTabButton]}
          onPress={() => setActiveTab('following')}
        >
          <Text style={[styles.tabText, activeTab === 'following' && styles.activeTabText]}>
            Following ({followingList.length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.userId}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada pengguna ditemukan</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
  },
  searchInput: {
    backgroundColor: '#F5F8FA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#1DA1F2',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#657786',
  },
  activeTabText: {
    color: '#1DA1F2',
  },
  listContent: {
    paddingVertical: 8,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F8FA',
  },
  textSection: {
    marginLeft: 12,
    flex: 1,
  },
  displayNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#14171A',
  },
  usernameText: {
    fontSize: 13,
    color: '#657786',
    marginTop: 2,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  followBtn: {
    backgroundColor: '#14171A',
    borderColor: '#14171A',
  },
  followingBtn: {
    backgroundColor: '#ffffff',
    borderColor: '#AAB8C2',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  followingBtnText: {
    color: '#657786',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: '#657786',
    fontSize: 14,
  },
});