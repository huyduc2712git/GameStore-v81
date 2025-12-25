import Header from '@components/Header';
import { moderateScale, scaleFont, verticalScale } from '@utils/scale';
import { FontFamily, FontWeight } from '@utils/typography';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionOption from './components/SectionOption';
import { AddPlayerModal } from './components/AddPlayerModal';
import { PointCalculatorModal } from './components/PointCalculatorModal';
import { PlayerList } from './components/PlayerList';
import { useState } from 'react';

interface Props {}

function GameScreen(props: Props) {
  const insets = useSafeAreaInsets();
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [showPointCalculatorModal, setShowPointCalculatorModal] =
    useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Games" />
      <View style={styles.content}>
        <SectionOption
          onAddPlayer={() => setShowAddPlayerModal(true)}
          onCalculatePoints={() => setShowPointCalculatorModal(true)}
        />
        <PlayerList />
      </View>

      <AddPlayerModal
        visible={showAddPlayerModal}
        onClose={() => setShowAddPlayerModal(false)}
      />

      <PointCalculatorModal
        visible={showPointCalculatorModal}
        onClose={() => setShowPointCalculatorModal(false)}
      />
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // padding: verticalScale(16),
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(12),
    padding: verticalScale(16),
    gap: verticalScale(16),
  },
});
