import { moderateScale, scaleFont, verticalScale } from '@utils/scale';
import { FontFamily, FontWeight } from '@utils/typography';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { gameStore } from '@stores/gameStore';

interface AddPlayerModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddPlayerModal = observer(
  ({ visible, onClose }: AddPlayerModalProps) => {
    const [playerName, setPlayerName] = useState('');
    const [playerDescription, setPlayerDescription] = useState('');
    const [avatarUri, setAvatarUri] = useState<string | null>(null);

    const handleImagePick = () => {
      Alert.alert('Chọn ảnh đại diện', 'Bạn muốn chọn ảnh từ đâu?', [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(
              {
                mediaType: 'photo',
                cameraType: 'front',
                quality: 0.5,
              },
              response => {
                if (response.didCancel) {
                  return;
                }
                if (response.errorCode) {
                  Alert.alert(
                    'Lỗi',
                    response.errorMessage || 'Không thể mở camera',
                  );
                  return;
                }
                if (response.assets && response.assets[0].uri) {
                  setAvatarUri(response.assets[0].uri);
                }
              },
            );
          },
        },
        {
          text: 'Thư viện',
          onPress: () => {
            launchImageLibrary(
              {
                mediaType: 'photo',
                quality: 0.5,
              },
              response => {
                if (response.didCancel) {
                  return;
                }
                if (response.errorCode) {
                  Alert.alert(
                    'Lỗi',
                    response.errorMessage || 'Không thể mở thư viện',
                  );
                  return;
                }
                if (response.assets && response.assets[0].uri) {
                  setAvatarUri(response.assets[0].uri);
                }
              },
            );
          },
        },
        {
          text: 'Hủy',
          style: 'cancel',
        },
      ]);
    };

    const handleAddPlayer = () => {
      if (!gameStore.canAddPlayer) {
        Alert.alert(
          'Giới hạn người chơi',
          'Chỉ có thể thêm tối đa 6 người chơi!',
        );
        return;
      }

      if (playerName.trim()) {
        const success = gameStore.addPlayer({
          id: Date.now().toString(),
          name: playerName.trim(),
          score: 0,
          avatar: avatarUri || '',
          description: playerDescription.trim(),
        });

        if (success) {
          setPlayerName('');
          setPlayerDescription('');
          setAvatarUri(null);
          onClose();
        } else {
          Alert.alert('Lỗi', 'Không thể thêm người chơi!');
        }
      }
    };

    const handleClose = () => {
      setPlayerName('');
      setPlayerDescription('');
      setAvatarUri(null);
      onClose();
    };

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={e => e.stopPropagation()}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Thêm người chơi</Text>

              {!gameStore.canAddPlayer && (
                <View style={styles.warningContainer}>
                  <Text style={styles.warningText}>
                    ⚠️ Đã đạt giới hạn tối đa 6 người chơi
                  </Text>
                </View>
              )}

              {gameStore.canAddPlayer && (
                <Text style={styles.subtitle}>
                  Còn {gameStore.remainingSlots} chỗ trống
                </Text>
              )}

              {/* Avatar Picker */}
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={handleImagePick}
                disabled={!gameStore.canAddPlayer}
              >
                {avatarUri ? (
                  <Image
                    source={{ uri: avatarUri }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarPlaceholderText}>📷</Text>
                    <Text style={styles.avatarPlaceholderLabel}>Chọn ảnh</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Nhập tên người chơi"
                value={playerName}
                onChangeText={setPlayerName}
                autoFocus
                editable={gameStore.canAddPlayer}
              />

              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Mô tả tính cách người chơi (tuỳ chọn)"
                value={playerDescription}
                onChangeText={setPlayerDescription}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                editable={gameStore.canAddPlayer}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleClose}
                >
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.addButton,
                    !gameStore.canAddPlayer && styles.disabledButton,
                  ]}
                  onPress={handleAddPlayer}
                  disabled={!gameStore.canAddPlayer}
                >
                  <Text
                    style={[
                      styles.addButtonText,
                      !gameStore.canAddPlayer && styles.disabledButtonText,
                    ]}
                  >
                    Thêm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(16),
    padding: verticalScale(24),
    width: moderateScale(320),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: scaleFont(20),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
    color: '#1a1a1a',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scaleFont(12),
    fontFamily: FontFamily.regular,
    color: '#666666',
    textAlign: 'center',
    marginBottom: verticalScale(16),
  },
  warningContainer: {
    backgroundColor: '#FFF3CD',
    borderRadius: moderateScale(8),
    padding: verticalScale(12),
    marginBottom: verticalScale(16),
  },
  warningText: {
    fontSize: scaleFont(12),
    fontFamily: FontFamily.medium,
    color: '#856404',
    textAlign: 'center',
  },
  avatarContainer: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: '#F8F9FD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: verticalScale(16),
    borderWidth: 2,
    borderColor: '#E8ECF4',
    borderStyle: 'dashed',
  },
  avatarImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    fontSize: scaleFont(32),
    marginBottom: verticalScale(4),
  },
  avatarPlaceholderLabel: {
    fontSize: scaleFont(12),
    fontFamily: FontFamily.regular,
    color: '#666666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: moderateScale(8),
    padding: verticalScale(12),
    fontSize: scaleFont(16),
    fontFamily: FontFamily.regular,
    marginBottom: verticalScale(12),
  },
  descriptionInput: {
    height: verticalScale(80),
    marginBottom: verticalScale(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: verticalScale(12),
  },
  button: {
    flex: 1,
    padding: verticalScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F8F9FD',
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  cancelButtonText: {
    fontSize: scaleFont(16),
    fontFamily: FontFamily.medium,
    fontWeight: FontWeight.medium,
    color: '#666666',
  },
  addButton: {
    backgroundColor: '#60abe9',
  },
  addButtonText: {
    fontSize: scaleFont(16),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
    color: '#ffffff',
  },
  disabledButton: {
    backgroundColor: '#E8ECF4',
  },
  disabledButtonText: {
    color: '#999999',
  },
});
