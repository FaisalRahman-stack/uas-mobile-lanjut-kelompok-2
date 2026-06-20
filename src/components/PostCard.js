import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useSocialStore } from '../store/useSocialStore';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

const PostCard = memo(({ item, currentUserId, onFollowPress, onLikePress, onCommentPress }) => {
  const { followingList } = useSocialStore();
  const isFollowing = followingList.includes(item.userId);
  const isLiked = item.likes?.includes(currentUserId) || false;
  
  const formatPostDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.creatorProfile}>
          <Image source={{ uri: item.userPhoto }} style={styles.avatarImage} priority="high" cachePolicy="disk" />
          <View style={styles.creatorInfo}>
            <Text style={styles.usernameText}>
              {item.displayName || item.username} 
            </Text>
            {/* Tanggal dipindah ke sini, menggantikan tag */}
            <Text style={styles.dateText}>{formatPostDate(item.createdAt)}</Text>
          </View>
        </View>
        
        {item.userId !== currentUserId && (
          <TouchableOpacity 
            style={[styles.actionButton, isFollowing ? styles.activeButton : styles.inactiveButton]}
            onPress={() => onFollowPress(item.userId)}
            activeOpacity={0.7}
          >
            <Text style={[styles.actionButtonText, isFollowing && styles.activeButtonText]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Image */}
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.mainPostImage}
        contentFit="cover"
        transition={250}
        cachePolicy="disk"
      />

      {/* Interaction Bar */}
      <View style={styles.interactionButtonBar}>
        <View style={styles.leftInteractionGroup}>
          <TouchableOpacity style={styles.iconScaleButton} onPress={() => onLikePress(item.postId)}>
            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? theme.primary : theme.textSecondary} />
            <Text style={styles.interactionCounterText}>{item.likes?.length || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconScaleButton} onPress={() => onCommentPress(item.postId)}>
            <Ionicons name="chatbubble-outline" size={22} color={theme.textSecondary} />
            <Text style={styles.interactionCounterText}>Komentar</Text>
          </TouchableOpacity>
          {/* Tanggal di sebelah komentar sudah dihapus */}
        </View>
      </View>

      {/* Caption */}
      <View style={styles.metadataContentContainer}>
        <Text style={styles.captionTypography} numberOfLines={3}>
          {item.caption}
        </Text>
      </View>
    </View>
  );
});

PostCard.displayName = 'PostCard';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.background,
    marginBottom: 8,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.backgroundSecondary,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  creatorProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.backgroundSecondary,
  },
  creatorInfo: {
    marginLeft: 12,
  },
  usernameText: {
    fontWeight: '700',
    fontSize: 14,
    color: theme.textPrimary,
  },
  dateText: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 1,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  inactiveButton: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  activeButton: {
    backgroundColor: theme.background,
    borderColor: theme.secondary || theme.backgroundSecondary,
  },
  actionButtonText: {
    color: theme.background,
    fontWeight: '600',
    fontSize: 12,
  },
  activeButtonText: {
    color: theme.textSecondary,
  },
  mainPostImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: theme.backgroundSecondary,
  },
  interactionButtonBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  leftInteractionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconScaleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  interactionCounterText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  metadataContentContainer: {
    paddingHorizontal: 16,
    marginTop: 2,
  },
  captionTypography: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.textPrimary,
  },
});

export default PostCard;