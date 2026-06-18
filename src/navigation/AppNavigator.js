import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabNavigator} 
        options={{ headerShown: false }} 
      />
      
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatScreen} 
        options={{ 
          title: 'Chat Room',
          headerShown: true
        }} 
      />
    </Stack.Navigator>
  );
}