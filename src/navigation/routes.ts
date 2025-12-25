import DetailsScreen from '@screens/DetailsScreen';
import GameScreen from '@screens/GameScreen';
import HomeScreen from '@screens/HomeScreen';
import LoginScreen from '@screens/LoginScreen';
import PhotosScreen from '@screens/PhotosScreen';

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
  PHOTOS: {
    name: 'PhotosScreen',
    component: PhotosScreen,
    options: { title: 'Photos' },
  },
  GAME: {
    name: 'GameScreen',
    component: GameScreen,
    options: { title: 'Game' },
  },
  DETAILS: {
    name: 'DetailsScreen',
    component: DetailsScreen,
    options: { title: 'Details' },
  },
};
