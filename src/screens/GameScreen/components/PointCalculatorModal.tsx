import { moderateScale, scaleFont, verticalScale } from '@utils/scale';
import { FontFamily, FontWeight } from '@utils/typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { gameStore } from '@stores/gameStore';
import { usePointCalculator } from '../hooks/usePointCalculator';

interface PointCalculatorModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PointCalculatorModal = observer(
  ({ visible, onClose }: PointCalculatorModalProps) => {
    const {
      handleWinnerToggle,
      handleDrawerToggle,
      getScorePreview,
      handleApplyResults,
      resetSelections,
      getPlayerStatus,
    } = usePointCalculator();

    const handleClose = () => {
      resetSelections();
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
          <View
            style={styles.modalContainer}
            onStartShouldSetResponder={() => true}
            onTouchEnd={e => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <View style={styles.dragHandle} />

            <View style={styles.header}>
              <Text style={styles.title}>Tính điểm</Text>
              <Text style={styles.instructions}>
                Chọn 1 người thắng và 1 người hòa (nếu có). Những người còn lại
                sẽ tự động thua.
              </Text>

              <View style={styles.scoringInfo}>
                <Text style={styles.scoringTitle}>📊 Cách tính điểm:</Text>
                <Text style={styles.scoringText}>
                  🏆 Người thắng: + tổng điểm của tất cả người thua
                </Text>
                <Text style={styles.scoringText}>
                  🤝 Người hòa: giữ nguyên điểm (+0)
                </Text>
                <Text style={styles.scoringText}>
                  💀 Người thua: -5 điểm (điểm bắt đầu)
                </Text>
              </View>
            </View>

            <FlatList
              data={gameStore.currentPlayers.slice()}
              keyExtractor={item => item.id}
              renderItem={({ item: player }) => {
                const {
                  isWinner,
                  isDrawer,
                  isLoser,
                  isWinnerDisabled,
                  isDrawerDisabled,
                } = getPlayerStatus(player.id);

                const scorePreview = getScorePreview(player.id, player.score);

                return (
                  <View
                    key={player.id}
                    style={[
                      styles.playerRow,
                      isWinner && styles.winnerRow,
                      isDrawer && styles.drawerRow,
                      isLoser && styles.loserRow,
                    ]}
                  >
                    <View style={styles.playerInfo}>
                      <Text style={styles.playerName}>{player.name}</Text>
                      <View style={styles.scoreContainer}>
                        <Text style={styles.currentScore}>
                          Điểm: {player.score}
                        </Text>
                        {scorePreview !== player.score && (
                          <Text
                            style={[
                              styles.scorePreview,
                              {
                                color:
                                  scorePreview > player.score
                                    ? '#22c55e'
                                    : '#ef4444',
                              },
                            ]}
                          >
                            → {scorePreview}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={styles.buttonGroup}>
                      <TouchableOpacity
                        style={[
                          styles.roleButton,
                          isWinner
                            ? styles.winnerButton
                            : isWinnerDisabled
                            ? styles.disabledButton
                            : styles.defaultButton,
                        ]}
                        onPress={() => handleWinnerToggle(player.id)}
                        disabled={isWinnerDisabled}
                      >
                        <Text
                          style={[
                            styles.roleButtonText,
                            isWinnerDisabled && styles.disabledButtonText,
                          ]}
                        >
                          {isWinner ? '🏆' : 'Thắng'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.roleButton,
                          isDrawer
                            ? styles.drawerButton
                            : isDrawerDisabled
                            ? styles.disabledButton
                            : styles.defaultButton,
                        ]}
                        onPress={() => handleDrawerToggle(player.id)}
                        disabled={isDrawerDisabled}
                      >
                        <Text
                          style={[
                            styles.roleButtonText,
                            isDrawerDisabled && styles.disabledButtonText,
                          ]}
                        >
                          {isDrawer ? '🤝' : 'Hòa'}
                        </Text>
                      </TouchableOpacity>

                      <View
                        style={[
                          styles.loserIndicator,
                          isLoser ? styles.loserButton : styles.disabledButton,
                        ]}
                      >
                        <Text
                          style={[
                            styles.roleButtonText,
                            isLoser
                              ? styles.loserButtonText
                              : styles.disabledButtonText,
                          ]}
                        >
                          {isLoser ? '💀' : 'Thua'}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
              style={styles.playersList}
              contentContainerStyle={styles.playersListContent}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
              bounces={true}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={() => handleApplyResults(handleClose)}
              >
                <Text style={styles.updateButtonText}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
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
  innerWrapper: {
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    paddingHorizontal: verticalScale(24),
    paddingBottom: verticalScale(24),
    maxHeight: '85%',
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
  header: {
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: scaleFont(20),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
    color: '#1a1a1a',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  instructions: {
    fontSize: scaleFont(12),
    fontFamily: FontFamily.regular,
    color: '#666666',
    textAlign: 'center',
    marginBottom: verticalScale(12),
    fontStyle: 'italic',
  },
  scoringInfo: {
    padding: verticalScale(12),
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: moderateScale(8),
    backgroundColor: '#F8F9FD',
  },
  scoringTitle: {
    fontSize: scaleFont(14),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
    marginBottom: verticalScale(8),
    color: '#1a1a1a',
  },
  scoringText: {
    fontSize: scaleFont(11),
    fontFamily: FontFamily.regular,
    color: '#666666',
    marginBottom: verticalScale(4),
  },
  playersList: {
    flexGrow: 0,
    maxHeight: moderateScale(400),
  },
  playersListContent: {
    paddingBottom: verticalScale(8),
  },
  playerRow: {
    padding: verticalScale(10),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(8),
    borderWidth: 1,
    borderColor: '#E8ECF4',
    backgroundColor: '#ffffff',
  },
  winnerRow: {
    backgroundColor: '#d1fae5',
    borderColor: '#22c55e',
  },
  drawerRow: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
  },
  loserRow: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
  },
  playerInfo: {
    marginBottom: verticalScale(8),
  },
  playerName: {
    fontSize: scaleFont(16),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
    color: '#1a1a1a',
    marginBottom: verticalScale(4),
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentScore: {
    fontSize: scaleFont(12),
    fontFamily: FontFamily.regular,
    color: '#666666',
    marginRight: verticalScale(8),
  },
  scorePreview: {
    fontSize: scaleFont(12),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: verticalScale(8),
  },
  roleButton: {
    flex: 1,
    paddingVertical: verticalScale(8),
    paddingHorizontal: verticalScale(12),
    borderRadius: moderateScale(6),
    alignItems: 'center',
  },
  loserIndicator: {
    flex: 1,
    paddingVertical: verticalScale(8),
    paddingHorizontal: verticalScale(12),
    borderRadius: moderateScale(6),
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: '#3b82f6',
  },
  winnerButton: {
    backgroundColor: '#22c55e',
  },
  drawerButton: {
    backgroundColor: '#f59e0b',
  },
  loserButton: {
    backgroundColor: '#ef4444',
  },
  disabledButton: {
    backgroundColor: '#E8ECF4',
  },
  roleButtonText: {
    fontSize: scaleFont(12),
    fontFamily: FontFamily.medium,
    fontWeight: FontWeight.medium,
    color: '#ffffff',
  },
  loserButtonText: {
    color: '#ffffff',
  },
  disabledButtonText: {
    color: '#999999',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: verticalScale(12),
    marginTop: verticalScale(12),
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
  updateButton: {
    backgroundColor: '#10b981',
  },
  updateButtonText: {
    fontSize: scaleFont(16),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
    color: '#ffffff',
  },
});
