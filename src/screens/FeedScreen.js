import React, { useState, useCallback } from 'react';
import { SafeAreaView, FlatList, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import PostCard from '../components/PostCard';
import { dummyPosts } from '../utils/dummyData';

export default function FeedScreen() {
  const [posts, setPosts] = useState(dummyPosts);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const currentUserId = "user_ana_id";

  const handleFollow = useCallback((userId) => {
    console.log("Follow target user ID:", userId);
  }, []);

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
      onFollowPress={handleFollow}
      onLikePress={handleLike}
      onCommentPress={handleComment}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.postId}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        initialNumToRender={5}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoadingMore ? (
          <View style={styles.footerLoader}>
            <ActivityIndicator size="small" color="#1DA1F2" />
          </View>
        ) : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});