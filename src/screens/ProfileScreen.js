import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../utils/theme';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.coverPhoto} />
      
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Gavin Narendra</Text>
          <Text style={styles.usernameText}>@gavinnarendra</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.bioText}>
          Mahasiswa Sistem Informasi 💻 | Project Officer 🎬 | React Native Developer
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Postingan</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Pengikut</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Mengikuti</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Aktivitas Terbaru</Text>
        
        <View style={styles.mockPost}>
          <Text style={styles.postText}>
            Baru selesai survei lokasi di Lapangan Banteng buat syuting video nanti. Pencahayaannya bakal mantap banget! 🎥
          </Text>
        </View>
        
        <View style={styles.mockPost}>
          <Text style={styles.postText}>
            Ada yang mau mabar ranked Valorant atau Minecraft malam ini? Butuh santai dulu setelah ngoding.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  coverPhoto: {
    height: 120,
    backgroundColor: theme.backgroundSecondary,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  avatarContainer: {
    padding: 4,
    backgroundColor: theme.background,
    borderRadius: 50,
    marginTop: -30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.primary,
  },
  nameContainer: {
    marginLeft: 8,
    marginTop: 8,
    flex: 1,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.textPrimary,
  },
  usernameText: {
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 2,
  },
  infoSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  bioText: {
    fontSize: 14,
    color: theme.textPrimary,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  statBox: {
    marginRight: 24,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginRight: 4,
  },
  statLabel: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.backgroundSecondary,
    marginVertical: 16,
  },
  contentSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginBottom: 12,
  },
  mockPost: {
    padding: 16,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: 12,
    marginBottom: 12,
  },
  postText: {
    color: theme.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
});