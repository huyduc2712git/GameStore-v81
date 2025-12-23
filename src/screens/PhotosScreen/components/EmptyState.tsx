import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const EmptyState: React.FC = () => {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>No files uploaded yet</Text>
      <Text style={styles.emptySubtext}>
        Tap the upload area above to get started
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    marginTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
  },
});
