import { useState } from 'react';
import { Alert } from 'react-native';
import { authStore } from '@stores/authStore';
import { AppNavigation } from '@navigation/AppNavigation';
import { ROUTES } from '@navigation/routes';

export const useAuth = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    // Validation
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // Sign in or sign up
    const result = isSignUpMode
      ? await authStore.signUp(email, password)
      : await authStore.signIn(email, password);

    if (result.success) {
      console.log('Authentication successful');
      // Navigate to HomeScreen after successful login
      AppNavigation.navigate(ROUTES.HOME.name);
    } else {
      Alert.alert('Error', result.message);
      console.log('Error', result.message);
    }
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setEmail('');
    setPassword('');
  };

  return {
    // State
    isSignUpMode,
    email,
    password,
    isLoading: authStore.isLoading,
    // Actions
    setEmail,
    setPassword,
    handleSubmit,
    toggleMode,
  };
};
