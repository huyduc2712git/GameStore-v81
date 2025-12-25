import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from './components/LoginForm';
import { useAuth } from './hooks/useAuth';

interface Props {}

function LoginScreen(props: Props) {
  const {
    isSignUpMode,
    email,
    password,
    isLoading,
    setEmail,
    setPassword,
    handleSubmit,
    toggleMode,
  } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <LoginForm
        email={email}
        password={password}
        isSignUpMode={isSignUpMode}
        isLoading={isLoading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
        onToggleMode={toggleMode}
      />
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
