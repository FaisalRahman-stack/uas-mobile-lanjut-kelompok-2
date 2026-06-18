import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import PostCard from './src/components/PostCard';

const dummyPostData = {
  postId: "post_test_01",
  userId: "user_orang_lain",
  username: "megadeth_fan",
  userPhoto: "https://picsum.photos/100",
  caption: "Mencoba optimasi expo-image untuk tugas besar ConnectSphere! 🚀🎸",
  imageUrl: "https://picsum.photos/400",
  likes: ["user_ana_id"],
  createdAt: new Date().toISOString()
};
import { SafeAreaView, StyleSheet } from 'react-native';
import FeedScreen from './src/screens/FeedScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
});

import React from 'react';
import ChatScreen from './src/screens/ChatScreen';

export default function App() {
  const handleFollow = (userId) => console.log('Follow user:', userId);
  const handleLike = (postId) => console.log('Like post:', postId);
  const handleComment = (postId) => console.log('Comment post:', postId);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <PostCard 
          item={dummyPostData}
          currentUserId="user_ana_id"
          onFollowPress={handleFollow}
          onLikePress={handleLike}
          onCommentPress={handleComment}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
});
