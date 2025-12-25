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
  ScrollView,
  Keyboard,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { gameStore } from '@stores/gameStore';
import { Images } from '@assets/images';

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
        animationType="slide"
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <View style={styles.modalContainer}>
            {/* Drag Handle */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => Keyboard.dismiss()}
            >
              <View style={styles.dragHandle} />
            </TouchableOpacity>

            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.title}>Add player</Text>

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
                    <Image
                      source={Images.ic_upload_image}
                      style={styles.uploadIconText}
                    />
                    <Text style={styles.uploadText}>
                      Upload your files here
                    </Text>
                    <Text style={styles.browseText}>Browse</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Nhập tên người chơi"
                value={playerName}
                onChangeText={setPlayerName}
                placeholderTextColor="#565a5a"
                autoFocus
                editable={gameStore.canAddPlayer}
              />

              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Mô tả tính cách người chơi (tuỳ chọn)"
                value={playerDescription}
                onChangeText={setPlayerDescription}
                placeholderTextColor="#565a5a"
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
                  <Text style={styles.cancelButtonText}>Cancel</Text>
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
                    Add Player
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    paddingHorizontal: verticalScale(24),
    paddingBottom: verticalScale(24),
    height: '85%',
  },
  uploadIconText: {
    width: moderateScale(32),
    height: moderateScale(32),
    tintColor: '#007AFF',
  },
  uploadText: {
    fontSize: scaleFont(14),
    color: '#666',
  },
  browseText: {
    fontSize: scaleFont(14),
    color: '#007AFF',
    fontWeight: '600',
  },
  dragHandle: {
    width: moderateScale(40),
    height: moderateScale(4),
    backgroundColor: '#D1D5DB',
    borderRadius: moderateScale(2),
    alignSelf: 'center',
    marginTop: verticalScale(12),
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: scaleFont(24),
    lineHeight: scaleFont(26),
    fontFamily: FontFamily.fredokaSemiBold,
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: verticalScale(6),
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
    borderWidth: 1,
    borderColor: '#f59e0b',
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
    width: '100%',
    height: moderateScale(200),
    borderRadius: moderateScale(8),
    backgroundColor: '#F8F9FD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: verticalScale(16),
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: moderateScale(200),
    borderRadius: moderateScale(8),
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: verticalScale(40),
    gap: verticalScale(12),
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
    fontFamily: FontFamily.fredokaSemiBold,
    color: '#666666',
  },
  addButton: {
    backgroundColor: '#60abe9',
  },
  addButtonText: {
    fontSize: scaleFont(16),
    fontFamily: FontFamily.fredokaSemiBold,
    color: '#ffffff',
  },
  disabledButton: {
    backgroundColor: '#E8ECF4',
  },
  disabledButtonText: {
    color: '#999999',
  },
});
