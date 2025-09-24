import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import JobListScreen from '../screens/JobListScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import PublishJobScreen from '../screens/PublishJobScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MyPostulationsScreen from '../screens/MyPostulationsScreen';
import ChatScreen from '../screens/ChatScreen';
import RatingScreen from '../screens/RatingScreen';
import { useAuth } from '../services/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0b9d57' }, headerTintColor: '#fff' }}>
      <Tab.Screen name="Trabajos" component={JobListScreen} />
      <Tab.Screen name="Publicar" component={PublishJobScreen} />
      <Tab.Screen name="Mis Postulaciones" component={MyPostulationsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) return null;

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="JobDetail" component={JobDetailScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Rating" component={RatingScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}