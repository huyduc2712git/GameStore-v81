// src/navigation/AppNavigation.ts
import { createNavigationContainerRef } from '@react-navigation/native';
import { ROUTES } from './routes';

// Tạo navigation ref
export const navigationRef = createNavigationContainerRef<any>();

export const AppNavigation = {
  navigate(name: typeof ROUTES[keyof typeof ROUTES]['name'], params?: object) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  },
  goBack() {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  },
};
