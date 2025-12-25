import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Photo } from '../hooks/usePhotos';
import { Images } from '@assets/images';
import { moderateScale, scale, scaleFont, verticalScale } from '@utils/scale';

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
      <TouchableOpacity onPress={onDelete}>
        <Image source={Images.ic_delete_image} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: verticalScale(12),
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(8),
    gap: scale(8),
  },
  fileThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E8ECF4',
  },
  fileInfo: {
    flex: 1,
    gap: scale(4),
  },
  fileName: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#1a1a1a',
  },
  fileSize: {
    fontSize: scaleFont(12),
    color: '#999',
  },
  fileDate: {
    fontSize: scaleFont(12),
    color: '#999',
  },
  deleteIcon: {
    width: moderateScale(32),
    height: moderateScale(32),
  },
});
