import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Activities from '../screen/Activities';
import Calendar from '../screen/Calendar';
import Form from '../screen/Form';
import { Activity } from '../interfaces/interfaces';

export type StackParams = {
  Actividades: undefined;
  Formulario: {activity: Activity};
};

const Stack = createStackNavigator();
const StackAdd = createStackNavigator<StackParams>();

const StackSelectNavigator = () => {
  return (
    <StackAdd.Navigator>
      <StackAdd.Screen name="Actividades" component={Activities} />
      <StackAdd.Screen name="Formulario" component={Form} />
    </StackAdd.Navigator>
  );
};

const StackCalendarNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendario" component={Calendar} />
    </Stack.Navigator>
  );
};

export {StackSelectNavigator, StackCalendarNavigator};
