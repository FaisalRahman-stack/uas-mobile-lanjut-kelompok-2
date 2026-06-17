import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

// Komponen menggunakan React.memo untuk optimasi scroll di FlatList
const PostCard = memo(({ item, currentUserId, onFollowPress, onLikePress, onCommentPress }) => {
  // Cek apakah user saat ini sudah menyukai postingan ini
  const isLiked = item.likes?.includes(currentUserId) || false;
  
  // Format tanggal postingan
  const formatPostDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <View style={styles.cardContainer}>
      {/* Header: Profil Pembuat Post & Tombol Follow */}
      <View style={styles.headerContainer}>
        <View style={styles.creatorProfile}>
          <Image 
            source={{ uri: item.userPhoto }} 
            style={styles.avatarImage}
            priority="high"
            cachePolicy="disk"
          />
          <View style={styles.creatorInfo}>
            <Text style={styles.usernameText}>{item.username}</Text>
            <Text style={styles.dateText}>{formatPostDate(item.createdAt)}</Text>
          </View>
        </View>
        
        {/* Tombol Follow hanya muncul jika ini postingan orang lain */}
        {item.userId !== currentUserId && (
          <TouchableOpacity 
            style={[styles.actionButton, isLiked ? styles.activeButton : styles.inactiveButton]}
            onPress={() => onFollowPress(item.userId)}
            activeOpacity={0.7}
          >
            <Text style={[styles.actionButtonText, isLiked && styles.activeButtonText]}>
              Follow
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Gambar Utama Postingan */}
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.mainPostImage}
        contentFit="cover"
        transition={250}
        cachePolicy="disk"
      />

      {/* Bar Tombol Interaksi */}
      <View style={styles.interactionButtonBar}>
        <View style={styles.leftInteractionGroup}>
          <TouchableOpacity 
            style={styles.iconScaleButton} 
            onPress={() => onLikePress(item.postId)}
            activeOpacity={0.6}
          >
            <Text style={styles.interactionIconText}>
              {isLiked ? '❤️' : '🤍'}
            </Text>
            <Text style={styles.interactionCounterText}>
              {item.likes?.length || 0}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconScaleButton} 
            onPress={() => onCommentPress(item.postId)}
            activeOpacity={0.6}
          >
            <Text style={styles.interactionIconText}>💬</Text>
            <Text style={styles.interactionCounterText}>Komentar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Caption Postingan */}
      <View style={styles.metadataContentContainer}>
        <Text style={styles.captionTypography} numberOfLines={3}>
          <Text style={styles.boldUsernameContext}>{item.username} </Text>
          {item.caption}
        </Text>
      </View>
    </View>
  );
});

PostCard.displayName = 'PostCard';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    marginBottom: 8,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
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
    backgroundColor: '#F5F8FA',
  },
  creatorInfo: {
    marginLeft: 12,
  },
  usernameText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#14171A',
  },
  dateText: {
    fontSize: 11,
    color: '#657786',
    marginTop: 2,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  inactiveButton: {
    backgroundColor: '#1DA1F2',
    borderColor: '#1DA1F2',
  },
  activeButton: {
    backgroundColor: '#ffffff',
    borderColor: '#AAB8C2',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  activeButtonText: {
    color: '#657786',
  },
  mainPostImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F5F8FA',
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
  interactionIconText: {
    fontSize: 20,
  },
  interactionCounterText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#657786',
  },
  metadataContentContainer: {
    paddingHorizontal: 16,
    marginTop: 2,
  },
  captionTypography: {
    fontSize: 14,
    lineHeight: 20,
    color: '#14171A',
  },
  boldUsernameContext: {
    fontWeight: '700',
  },
});

export default PostCard;