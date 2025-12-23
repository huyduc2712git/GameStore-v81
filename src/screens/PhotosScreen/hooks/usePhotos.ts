import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SupabaseService } from '@services/supabase.service';

export interface Photo {
  id: string;
  file_name: string;
  file_url: string;
  file_path: string;
  file_size: number | null;
  uploaded_at: string;
}

export const usePhotos = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null);

  // Load photos from database on mount
  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    setIsLoading(true);
    try {
      const userPhotos = await SupabaseService.getUserPhotos();
      setPhotos(userPhotos);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickAndUpload = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to pick image');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.uri) {
          await uploadImage({
            uri: asset.uri,
            type: asset.type || 'image/jpeg',
            name: asset.fileName || `image_${Date.now()}.jpg`,
            size: asset.fileSize || 0,
          });
        }
      }
    } catch (error) {
      Alert.alert('Error', `Failed to pick image: ${error}`);
    }
  };

  const uploadImage = async (file: {
    uri: string;
    type: string;
    name: string;
    size: number;
  }) => {
    setIsUploading(true);
    setUploadProgress('Uploading file...');

    try {
      // Upload to storage
      const uploadResult = await SupabaseService.uploadImage(file);

      if (!uploadResult.success) {
        Alert.alert('Error', uploadResult.message);
        setUploadProgress(null);
        return;
      }

      // Save metadata to database
      const metadataResult = await SupabaseService.savePhotoMetadata({
        file_name: file.name,
        file_url: uploadResult.url!,
        file_path: uploadResult.path!,
        file_size: file.size,
        mime_type: file.type,
      });

      if (metadataResult.success) {
        setUploadProgress('Upload complete!');
        // Reload photos from database
        await loadPhotos();
        setTimeout(() => setUploadProgress(null), 2000);
      } else {
        Alert.alert('Warning', 'File uploaded but metadata save failed');
        setUploadProgress(null);
      }
    } catch (error) {
      Alert.alert('Error', `Upload failed: ${error}`);
      setUploadProgress(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (photo: Photo) => {
    Alert.alert(
      'Delete File',
      `Are you sure you want to delete ${photo.file_name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await SupabaseService.deletePhoto(
                photo.id,
                photo.file_path,
              );
              if (result.success) {
                await loadPhotos();
                Alert.alert('Success', 'Photo deleted successfully');
              } else {
                Alert.alert('Error', result.message);
              }
            } catch (error) {
              Alert.alert('Error', `Delete failed: ${error}`);
            }
          },
        },
      ],
    );
  };

  const openPreview = (photo: Photo) => {
    setPreviewPhoto(photo);
  };

  const closePreview = () => {
    setPreviewPhoto(null);
  };

  return {
    // State
    isUploading,
    isLoading,
    photos,
    uploadProgress,
    previewPhoto,
    // Actions
    handlePickAndUpload,
    handleDelete,
    openPreview,
    closePreview,
  };
};
