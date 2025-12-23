import DetailsScreen from '@screens/DetailsScreen';
import HomeScreen from '@screens/HomeScreen';
import LoginScreen from '@screens/LoginScreen';

export const ROUTES = {
  LOGIN: {
    name: 'LoginScreen',
    component: LoginScreen,
    options: { title: 'Login' },
  },
  HOME: {
    name: 'HomeScreen',
    component: HomeScreen,
    options: { title: 'Home' },
  },
  DETAILS: {
    name: 'DetailsScreen',
    component: DetailsScreen,
    options: { title: 'Details' },
  },
};
