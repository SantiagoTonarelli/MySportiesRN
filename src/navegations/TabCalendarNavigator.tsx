import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import { StackCalendarNavigator, StackSelectNavigator } from './StackNavigator';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

const TabCalendarNavigator = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Agendarme" component={StackSelectNavigator} />
      <Tab.Screen name="Agenda" component={StackCalendarNavigator} />
    </Tab.Navigator>
  );
};

export default TabCalendarNavigator;
