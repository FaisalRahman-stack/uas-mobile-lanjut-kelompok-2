import React from 'react';
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
  return (
    <ChatScreen />
  );
}

