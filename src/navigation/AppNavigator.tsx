import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import { navigationRef } from './AppNavigation';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const screenOptions = {
    headerShown: false,
    statusBarHidden: true,
    statusBarTranslucent: true,
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={ROUTES.LOGIN.name}
        screenOptions={screenOptions}
      >
        {Object.values(ROUTES).map(route => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
