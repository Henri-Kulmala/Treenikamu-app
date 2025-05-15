import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingView from './LandingView';
import WorkoutPlanView from './WorkoutPlanView';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainTheme from '../styles/mainTheme';
import tabStyles from '../styles/tabStyles';
import ProfileView from './ProfileView';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ name, focused }) => (
  <Ionicons
    name={focused? name : `${name}-outline`}
    size={32}
    color={focused ? MainTheme.colors.highlightGreen : MainTheme.colors.highlightGreenMuted}
    style={{ height: 32 , marginVertical: 8}}
  />
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: MainTheme.colors.dark,
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          paddingTop: 16,
          height: 80,
          padding: 24,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={LandingView}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutPlanView}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="barbell" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileView}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="person" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
