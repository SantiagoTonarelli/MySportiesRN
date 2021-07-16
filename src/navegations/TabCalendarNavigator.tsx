import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import { StackCalendarNavigator, StackSelectNavigator } from './StackNavigator';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialBottomTabNavigator();

const TabCalendarNavigator = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused}) => {
          let iconName: string = '';
          switch (route.name) {
            case 'Agendarme':
              iconName = 'sports-tennis';
              break;

            case 'Agenda':
              iconName = 'calendar-today';
              break;
          }

          return <Icon name={iconName} size={20} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Agendarme"
        options={{title: 'Agendarme'}}
        component={StackSelectNavigator}
      />
      <Tab.Screen
        name="Agenda"
        options={{title: 'Agenda'}}
        component={StackCalendarNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabCalendarNavigator;
