import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {StackCalendarNavigator, StackSelectNavigator} from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Agendarme" component={StackSelectNavigator} />
      <Drawer.Screen name="Agenda" component={StackCalendarNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
