import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PhotoItem } from './PhotoItem';
import type { Photo } from '../hooks/usePhotos';

interface Props {
  photos: Photo[];
  onPhotoPress: (photo: Photo) => void;
  onPhotoDelete: (photo: Photo) => void;
  formatFileSize: (bytes: number | null) => string;
  formatDate: (dateString: string) => string;
}

export const PhotosList: React.FC<Props> = ({
  photos,
  onPhotoPress,
  onPhotoDelete,
  formatFileSize,
  formatDate,
}) => {
  if (photos.length === 0) {
    return null;
  }

  return (
    <View style={styles.recentSection}>
      <View style={styles.recentHeader}>
        <Text style={styles.recentTitle}>Recent uploaded</Text>
        <Text style={styles.recentCount}>{photos.length} items</Text>
      </View>

      {photos.map(photo => (
        <PhotoItem
          key={photo.id}
          photo={photo}
          onPress={() => onPhotoPress(photo)}
          onDelete={() => onPhotoDelete(photo)}
          formatFileSize={formatFileSize}
          formatDate={formatDate}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  recentSection: {
    marginTop: 24,
    marginBottom: 20,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  recentCount: {
    fontSize: 14,
    color: '#999',
  },
});
