import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  email: string;
  password: string;
  isSignUpMode: boolean;
  isLoading: boolean;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSubmit: () => void;
  onToggleMode: () => void;
}

export const LoginForm: React.FC<Props> = ({
  email,
  password,
  isSignUpMode,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onToggleMode,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>GameStore</Text>
          <Text style={styles.subtitle}>
            {isSignUpMode ? 'Create your account' : 'Welcome back'}
          </Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, isLoading && styles.inputDisabled]}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={onEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, isLoading && styles.inputDisabled]}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={onPasswordChange}
            secureTextEntry
            editable={!isLoading}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>
              {isSignUpMode ? 'Sign Up' : 'Login'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Toggle Mode */}
        <TouchableOpacity
          style={styles.toggleContainer}
          onPress={onToggleMode}
          disabled={isLoading}
        >
          <Text style={styles.toggleText}>
            {isSignUpMode
              ? 'Already have an account? '
              : "Don't have an account? "}
          </Text>
          <Text style={styles.toggleLink}>
            {isSignUpMode ? 'Login' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#999',
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
  },
  toggleLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});
