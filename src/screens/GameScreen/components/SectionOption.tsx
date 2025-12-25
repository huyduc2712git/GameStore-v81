import { Images } from '@assets/images';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CardGame from './CardGame';
import { verticalScale } from '@utils/scale';

interface Props {
  onAddPlayer: () => void;
  onCalculatePoints: () => void;
}

const SectionOption = ({ onAddPlayer, onCalculatePoints }: Props) => {
  const options = [
    {
      id: 1,
      title: 'Point +',
      image: Images.ic_plus_point,
      description: 'Tính điểm mỗi ván',
      onPress: onCalculatePoints,
    },
    {
      id: 2,
      title: 'Add player',
      image: Images.ic_add_player,
      description: 'Thêm người chơi vào trận',
      onPress: onAddPlayer,
    },
  ];

  return (
    <View style={styles.container}>
      {options.map(option => (
        <CardGame
          key={option.id}
          image={option.image}
          title={option.title}
          description={option.description}
          onPress={option.onPress}
        />
      ))}
    </View>
  );
};

export default SectionOption;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: verticalScale(16),
    // paddingHorizontal: verticalScale(16),
    // paddingHorizontal: 0,
  },
});
