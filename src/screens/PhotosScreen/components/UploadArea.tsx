import { Images } from '@assets/images';
import { moderateScale, verticalScale } from '@utils/scale';
import React from 'react';
import {
  ActivityIndicator,
  Image,
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
        <Image source={Images.ic_upload_image} style={styles.uploadIconText} />
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
    // marginTop: 20,
    padding: verticalScale(40),
    borderWidth: moderateScale(2),
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: moderateScale(12),
    backgroundColor: '#F0F7FF',
    alignItems: 'center',
    gap: verticalScale(12),
  },
  uploadIcon: {
    width: moderateScale(32),
    height: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconText: {
    width: moderateScale(32),
    height: moderateScale(32),
    tintColor: '#007AFF',
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
