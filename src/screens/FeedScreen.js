import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostCard from '../components/PostCard';
import { dummyPosts } from '../utils/dummyData';
import { useTheme } from '../utils/theme';
import { useSocialStore } from '../store/useSocialStore';

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [posts, setPosts] = useState(dummyPosts);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const currentUserId = "user_ana_id";

  const { toggleFollow } = useSocialStore();

  const handleLike = useCallback((postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.postId === postId) {
          const hasLiked = post.likes.includes(currentUserId);
          const updatedLikes = hasLiked
            ? post.likes.filter(id => id !== currentUserId)
            : [...post.likes, currentUserId];
          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );
  }, []);

  const handleComment = useCallback((postId) => {
    console.log("Navigasi ke komentar untuk post ID:", postId);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    
    setTimeout(() => {
      const morePosts = dummyPosts.map((post, index) => ({
        ...post,
        postId: `${post.postId}_more_${Date.now()}_${index}`,
        createdAt: new Date().toISOString()
      }));
      
      setPosts(prev => [...prev, ...morePosts]);
      setIsLoadingMore(false);
    }, 1500);
  };

  const renderItem = ({ item }) => (
    <PostCard
      item={item}
      currentUserId={currentUserId}
      onLikePress={() => handleLike(item.id || item.postId)}
      onFollowPress={(userId) => toggleFollow(userId)}
      onCommentPress={(postId) => handleComment(postId)}
    />
  );

  return (
    <View style={[styles.container, { paddingTop: Math.max(0, insets.top - 10) }]}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || item.postId}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore && !isRefreshing ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color={theme.primary} />
            </View>
          ) : null
        }
      />
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  }
});