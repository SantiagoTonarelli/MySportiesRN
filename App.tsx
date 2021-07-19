import 'react-native-gesture-handler';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navegations/DrawerNavigator';
import {ActivitiesProvider} from './src/context/ActivitiesContext';
import TabCalendarNavigator from './src/navegations/TabCalendarNavigator';
import {useWindowDimensions} from 'react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2195f2',
    light: '#6ec5ff',
    dark: '#0068bf',
  },
};

const App = () => {
  const {width, height} = useWindowDimensions();
  return (
    <PaperProvider theme={theme}>
      <ActivitiesProvider>
        <NavigationContainer>
          {height < width ? <DrawerNavigator /> : <TabCalendarNavigator />}
        </NavigationContainer>
      </ActivitiesProvider>
    </PaperProvider>
  );
};

export default App;
