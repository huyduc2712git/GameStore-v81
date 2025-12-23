import { SupabaseService } from '@services/supabase.service';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigation } from '@navigation/AppNavigation';
import { ROUTES } from '@navigation/routes';

interface Props {}

function LoginScreen(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleAuth = async () => {
    // Validation
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const result = isSignUpMode
        ? await SupabaseService.signUpWithEmail(email, password)
        : await SupabaseService.signInWithEmail(email, password);

      if (result.success) {
        Alert.alert('Success', result.message, [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to HomeScreen
              AppNavigation.navigate(ROUTES.HOME.name);
            },
          },
        ]);
        console.log('Success', result.message);
      } else {
        Alert.alert('Error', result.message);
        console.log('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', `Authentication failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setEmail('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>GameStore</Text>
              <Text style={styles.subtitle}>
                {isSignUpMode ? 'Create your account' : 'Welcome back'}
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your.email@example.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!isLoading}
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  editable={!isLoading}
                  placeholderTextColor="#999"
                />
              </View>

              {/* Auth Button */}
              <TouchableOpacity
                style={[
                  styles.authButton,
                  isLoading && styles.authButtonDisabled,
                ]}
                onPress={handleAuth}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.authButtonText}>
                    {isSignUpMode ? 'Sign Up' : 'Login'}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Toggle Mode */}
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>
                  {isSignUpMode
                    ? 'Already have an account?'
                    : "Don't have an account?"}
                </Text>
                <TouchableOpacity onPress={toggleMode} disabled={isLoading}>
                  <Text style={styles.toggleButton}>
                    {isSignUpMode ? 'Login' : 'Sign Up'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#1a1a1a',
  },
  authButton: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  authButtonDisabled: {
    backgroundColor: '#ccc',
  },
  authButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 6,
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
  },
  toggleButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
});
