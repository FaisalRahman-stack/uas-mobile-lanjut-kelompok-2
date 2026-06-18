import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SocialScreen from './src/screens/SocialScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SocialScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});