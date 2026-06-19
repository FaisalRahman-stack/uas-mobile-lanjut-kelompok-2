import React, { useState, useMemo, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { dummyUsers } from '../utils/userDummyData';
import { toggleFollowUser } from '../services/firebaseService';
import { theme } from '../utils/theme';

export default function SocialScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('followers');
  const [followingList, setFollowingList] = useState(['user_002', 'user_004']);
  const [useFallbackDummy, setUseFallbackDummy] = useState(true);

  const handleFollowToggle = async (targetUserId) => {
    const currentUserId = "user_ana_id";
    const isCurrentlyFollowing = followingList.includes(targetUserId);

    setFollowingList((prevList) =>
      isCurrentlyFollowing
        ? prevList.filter((id) => id !== targetUserId)
        : [...prevList, targetUserId]
    );

    if (!useFallbackDummy) {
      try {
        await toggleFollowUser(currentUserId, targetUserId, isCurrentlyFollowing);
      } catch (error) {
        setFollowingList((prevList) =>
          isCurrentlyFollowing
            ? [...prevList, targetUserId]
            : prevList.filter((id) => id !== targetUserId)
        );
      }
    }
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
    backgroundColor: theme.background,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.backgroundSecondary,
  },
  searchInput: {
    backgroundColor: theme.backgroundSecondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 14,
    color: theme.textPrimary,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: theme.backgroundSecondary,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: theme.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  activeTabText: {
    color: theme.primary,
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
    backgroundColor: theme.backgroundSecondary,
  },
  textSection: {
    marginLeft: 12,
    flex: 1,
  },
  displayNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  usernameText: {
    fontSize: 13,
    color: theme.textSecondary,
    marginTop: 2,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  followBtn: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  followingBtn: {
    backgroundColor: theme.background,
    borderColor: theme.secondary,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.background,
  },
  followingBtnText: {
    color: theme.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: theme.textSecondary,
    fontSize: 14,
  },
});