import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { authStore } from '@stores/authStore';
import { ROUTES } from './routes';
import { navigationRef } from './AppNavigation';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

export const AppNavigator = observer(() => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for auth store hydration
    if (authStore.isHydrated) {
      setIsReady(true);
    }
  }, [authStore.isHydrated]);

  // Show loading while hydrating
  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const screenOptions = {
    headerShown: false,
    statusBarHidden: true,
    statusBarTranslucent: true,
  };

  // Set initial route based on auth state
  const initialRouteName = authStore.isAuthenticated
    ? ROUTES.HOME.name
    : ROUTES.LOGIN.name;

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
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
});

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
