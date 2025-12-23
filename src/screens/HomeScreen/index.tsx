import { AppNavigation } from '@navigation/AppNavigation';
import { ROUTES } from '@navigation/routes';
import { SupabaseService } from '@services/supabase.service';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

function HomeScreen(props: Props) {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('Testing connection...');

    try {
      const result = await SupabaseService.testConnection();
      setConnectionStatus(result.message);

      if (result.success) {
        Alert.alert('Success', result.message);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      const errorMessage = `Connection test failed: ${error}`;
      setConnectionStatus(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const result = await SupabaseService.signOut();
      if (result.success) {
        Alert.alert('Success', result.message, [
          {
            text: 'OK',
            onPress: () => {
              AppNavigation.navigate(ROUTES.LOGIN.name);
            },
          },
        ]);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', `Sign out failed: ${error}`);
    }
  };

  return (
    <SafeAreaView style={$container}>
      <View style={styles.content}>
        <Text style={styles.title}>GameStore Home</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supabase Integration</Text>

          <Button
            title="Test Supabase Connection"
            onPress={handleTestConnection}
            disabled={isTestingConnection}
          />

          {isTestingConnection && (
            <ActivityIndicator
              size="small"
              color="#0000ff"
              style={styles.loader}
            />
          )}

          {connectionStatus && (
            <Text style={styles.status}>{connectionStatus}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Navigation</Text>
          <Button
            title="Go to Details"
            onPress={() =>
              AppNavigation.navigate(ROUTES.DETAILS.name, { userId: 123 })
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Button title="Sign Out" onPress={handleSignOut} color="#ff3b30" />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const $container: ViewStyle = {
  flex: 1,
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  loader: {
    marginTop: 10,
  },
  status: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    fontSize: 14,
  },
});
