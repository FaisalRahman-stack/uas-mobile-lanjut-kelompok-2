import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import SocialScreen from '../screens/SocialScreen';
import { View, Text } from 'react-native';
import { theme } from '../utils/theme';
import ProfileScreen from '../screens/ProfileScreen';

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