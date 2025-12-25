import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from './components/EmptyState';
import { LoadingState } from './components/LoadingState';
import { PhotosList } from './components/PhotosList';
import { PreviewModal } from './components/PreviewModal';
import { UploadArea } from './components/UploadArea';
import { usePhotos } from './hooks/usePhotos';
import { verticalScale } from '@utils/scale';
import Header from '@components/Header';

interface Props {}

function PhotosScreen(props: Props) {
  const {
    isUploading,
    isLoading,
    photos,
    uploadProgress,
    previewPhoto,
    handlePickAndUpload,
    handleDelete,
    openPreview,
    closePreview,
  } = usePhotos();

  const insets = useSafeAreaInsets();

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Photos" />
      <ScrollView style={styles.content}>
        <UploadArea
          onPress={handlePickAndUpload}
          disabled={isUploading}
          uploadProgress={uploadProgress}
          isUploading={isUploading}
        />

        {isLoading && <LoadingState />}

        {!isLoading && (
          <PhotosList
            photos={photos}
            onPhotoPress={openPreview}
            onPhotoDelete={handleDelete}
            formatFileSize={formatFileSize}
            formatDate={formatDate}
          />
        )}

        {!isLoading && photos.length === 0 && !isUploading && <EmptyState />}
      </ScrollView>

      <PreviewModal
        photo={previewPhoto}
        onClose={closePreview}
        formatFileSize={formatFileSize}
      />
    </View>
  );
}

export default PhotosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF4',
  },
  backButton: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'TikTokSans-Bold',
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
    padding: verticalScale(16),
    backgroundColor: '#F8F9FD',
  },
});
