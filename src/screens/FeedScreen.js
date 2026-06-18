import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PostCard from '../components/PostCard';
import { dummyPosts } from '../utils/dummyData';
import { fetchFeedPosts, toggleLikePost } from '../services/firebaseService';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [useFallbackDummy, setUseFallbackDummy] = useState(false);

  const loadFeedData = useCallback(async (isInitial = true) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const startAfterDoc = isInitial ? null : lastVisible;
      const result = await fetchFeedPosts(startAfterDoc, 5);
      
      if (isInitial) {
        setPosts(result.posts);
      } else {
        setPosts((prev) => [...prev, ...result.posts]);
      }
      setLastVisible(result.lastVisible);
      setUseFallbackDummy(false);
    } catch (error) {
      if (isInitial) {
        setPosts(dummyPosts);
        setUseFallbackDummy(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [lastVisible, isLoading]);

  useEffect(() => {
    loadFeedData(true);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLastVisible(null);
    await loadFeedData(true);
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (!useFallbackDummy && lastVisible && !isLoading) {
      loadFeedData(false);
    }
  };

  const handleLike = async (postId) => {
    const currentUserId = "user_ana_id";
    const targetPost = posts.find((p) => p.id === postId || p.postId === postId);
    if (!targetPost) return;

    const likesArray = targetPost.likes || [];
    const hasLiked = likesArray.includes(currentUserId);

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        const isTarget = post.id === postId || post.postId === postId;
        if (isTarget) {
          const updatedLikes = hasLiked
            ? likesArray.filter((id) => id !== currentUserId)
            : [...likesArray, currentUserId];
          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );

    if (!useFallbackDummy) {
      try {
        await toggleLikePost(postId, currentUserId, hasLiked);
      } catch (error) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            const isTarget = post.id === postId || post.postId === postId;
            if (isTarget) return targetPost;
            return post;
          })
        );
      }
    }
  };

  const renderItem = ({ item }) => (
    <PostCard
      item={item}
      currentUserId="user_ana_id"
      onLikePress={() => handleLike(item.id || item.postId)}
      onFollowPress={(userId) => console.log('Follow clicked:', userId)}
      onCommentPress={(postId) => console.log('Comment clicked:', postId)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || item.postId}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading && !isRefreshing ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#1DA1F2" />
            </View>
          ) : null
        }
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
    paddingVertical: 15,
    alignItems: 'center',
  },
});