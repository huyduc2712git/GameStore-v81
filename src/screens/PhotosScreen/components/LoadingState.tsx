import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export const LoadingState: React.FC = () => {
  return (
    <View style={styles.loadingSection}>
      <ActivityIndicator color="#007AFF" size="large" />
      <Text style={styles.loadingText}>Loading your photos...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingSection: {
    marginTop: 40,
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
});
