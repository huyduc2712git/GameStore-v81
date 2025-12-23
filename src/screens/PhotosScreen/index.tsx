import { AppNavigation } from '@navigation/AppNavigation';
import { SupabaseService } from '@services/supabase.service';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

function PhotosScreen(props: Props) {
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handlePickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to pick image');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.uri) {
          setSelectedImage({
            uri: asset.uri,
            type: asset.type || 'image/jpeg',
            name: asset.fileName || `image_${Date.now()}.jpg`,
          });
          setUploadedUrl(null); // Reset uploaded URL when new image selected
        }
      }
    } catch (error) {
      Alert.alert('Error', `Failed to pick image: ${error}`);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setIsUploading(true);

    try {
      const result = await SupabaseService.uploadImage(selectedImage);

      if (result.success) {
        setUploadedUrl(result.url || null);
        Alert.alert('Success', result.message);
        console.log('Uploaded image URL:', result.url);
      } else {
        Alert.alert('Error', result.message);
        console.log('Upload error:', result.message);
      }
    } catch (error) {
      Alert.alert('Error', `Upload failed: ${error}`);
      console.log('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Photos Upload</Text>
          <Text style={styles.subtitle}>Upload images to Supabase Storage</Text>
        </View>

        <View style={styles.content}>
          {/* Image Preview */}
          {selectedImage && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage.uri }} style={styles.image} />
              <Text style={styles.imageInfo}>{selectedImage.name}</Text>
            </View>
          )}

          {/* No Image Selected */}
          {!selectedImage && (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>No image selected</Text>
              <Text style={styles.placeholderSubtext}>
                Tap the button below to pick an image
              </Text>
            </View>
          )}

          {/* Pick Image Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handlePickImage}
            disabled={isUploading}
          >
            <Text style={styles.buttonText}>
              {selectedImage ? 'Pick Another Image' : 'Pick Image'}
            </Text>
          </TouchableOpacity>

          {/* Upload Button */}
          {selectedImage && (
            <TouchableOpacity
              style={[
                styles.button,
                styles.uploadButton,
                isUploading && styles.buttonDisabled,
              ]}
              onPress={handleUploadImage}
              disabled={isUploading}
            >
              {isUploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Upload to Supabase</Text>
              )}
            </TouchableOpacity>
          )}

          {/* Uploaded URL Display */}
          {uploadedUrl && (
            <View style={styles.urlContainer}>
              <Text style={styles.urlLabel}>Uploaded Successfully!</Text>
              <Text style={styles.url} numberOfLines={2}>
                {uploadedUrl}
              </Text>
              <Image
                source={{ uri: uploadedUrl }}
                style={styles.uploadedImage}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PhotosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  imageContainer: {
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  imageInfo: {
    fontSize: 12,
    color: '#666',
  },
  placeholder: {
    height: 300,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    gap: 8,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#ccc',
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#34C759',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  urlContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    gap: 8,
  },
  urlLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  url: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
});
