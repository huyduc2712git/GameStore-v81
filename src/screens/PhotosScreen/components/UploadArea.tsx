import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  onPress: () => void;
  disabled: boolean;
  uploadProgress: string | null;
  isUploading: boolean;
}

export const UploadArea: React.FC<Props> = ({
  onPress,
  disabled,
  uploadProgress,
  isUploading,
}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.uploadArea}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.uploadIcon}>
          <Text style={styles.uploadIconText}>📤</Text>
        </View>
        <Text style={styles.uploadText}>Upload your files here</Text>
        <Text style={styles.browseText}>Browse</Text>
      </TouchableOpacity>

      {uploadProgress && (
        <View style={styles.progressSection}>
          <Text style={styles.progressText}>{uploadProgress}</Text>
          {isUploading && <ActivityIndicator color="#007AFF" size="small" />}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  uploadArea: {
    marginTop: 20,
    padding: 40,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#F0F7FF',
    alignItems: 'center',
    gap: 12,
  },
  uploadIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconText: {
    fontSize: 28,
  },
  uploadText: {
    fontSize: 14,
    color: '#666',
  },
  browseText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  progressSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
});
