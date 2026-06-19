import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import SocialScreen from '../screens/SocialScreen';
import { View, Text } from 'react-native';
import { theme } from '../utils/theme';

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.textPrimary }}>Profile Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.inactive,
      }}
    >
      <Tab.Screen 
        name="FeedTab" 
        component={FeedScreen} 
        options={{ title: 'Feed' }} 
      />
      <Tab.Screen 
        name="SocialTab" 
        component={SocialScreen} 
        options={{ title: 'Social' }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }} 
      />
    </Tab.Navigator>
  );
}