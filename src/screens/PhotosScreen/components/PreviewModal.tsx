import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { Photo } from '../hooks/usePhotos';

interface Props {
  photo: Photo | null;
  onClose: () => void;
  formatFileSize: (bytes: number | null) => string;
}

export const PreviewModal: React.FC<Props> = ({
  photo,
  onClose,
  formatFileSize,
}) => {
  return (
    <Modal
      visible={photo !== null}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <View style={styles.modalContent}>
            {photo && (
              <Image
                source={{ uri: photo.file_url }}
                style={styles.fullscreenImage}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
  modalInfo: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  modalFileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  modalFileSize: {
    fontSize: 14,
    color: '#cccccc',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
  },
});
