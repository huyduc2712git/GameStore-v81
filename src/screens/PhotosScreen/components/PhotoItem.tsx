import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Photo } from '../hooks/usePhotos';

interface Props {
  photo: Photo;
  onPress: () => void;
  onDelete: () => void;
  formatFileSize: (bytes: number | null) => string;
  formatDate: (dateString: string) => string;
}

export const PhotoItem: React.FC<Props> = ({
  photo,
  onPress,
  onDelete,
  formatFileSize,
  formatDate,
}) => {
  return (
    <View style={styles.fileItem}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: photo.file_url }} style={styles.fileThumbnail} />
      </TouchableOpacity>
      <View style={styles.fileInfo}>
        <Text style={styles.fileName} numberOfLines={1}>
          {photo.file_name}
        </Text>
        <Text style={styles.fileSize}>{formatFileSize(photo.file_size)}</Text>
        <Text style={styles.fileDate}>{formatDate(photo.uploaded_at)}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
  },
  fileThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E8ECF4',
  },
  fileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: '#999',
  },
  fileDate: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 18,
  },
});
