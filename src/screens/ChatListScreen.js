import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../utils/theme';

export default function ChatListScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.placeholderText}>Belum ada obrolan terbaru</Text>
      </View>

    </SafeAreaView>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  headerContainer: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: theme.background,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.backgroundSecondary,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  placeholderText: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});