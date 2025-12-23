import { AppNavigation } from '@navigation/AppNavigation';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from './components/EmptyState';
import { LoadingState } from './components/LoadingState';
import { PhotosList } from './components/PhotosList';
import { PreviewModal } from './components/PreviewModal';
import { UploadArea } from './components/UploadArea';
import { usePhotos } from './hooks/usePhotos';

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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => AppNavigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Files</Text>
        <View style={styles.profileIcon}>
          <Text style={styles.profileText}>👤</Text>
        </View>
      </View>

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
    </SafeAreaView>
  );
}

export default PhotosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
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
    fontWeight: '600',
    color: '#1a1a1a',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8ECF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
