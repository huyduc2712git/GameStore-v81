import { StyleSheet, Text, View } from 'react-native';
import CardMain from './CardMain';
import { verticalScale } from '@utils/scale';
import { Images } from '@assets/images';
import { AppNavigation } from '@navigation/AppNavigation';
import { ROUTES } from '@navigation/routes';

interface Props {}

const sectionData = [
  {
    colors: ['#d75fe1', '#4a4ae2'],
    title: 'Photos',
    description:
      'Phụ vụ upload ảnh và xem ảnh, chúc các bạn trải nghiệm thú vị',
    onPress: () => {
      AppNavigation.navigate(ROUTES.PHOTOS.name);
    },
    image: Images.bg_card_photo,
  },
  {
    colors: ['#60abe9', '#5e92e4'],
    title: 'Games',
    description: 'Phụ vụ tính điểm chơi game, chúc các bạn trải nghiệm thú vị',
    onPress: () => {
      AppNavigation.navigate(ROUTES.GAME.name);
    },
    image: Images.bg_card_game,
  },
];

function SectionCard(props: Props) {
  return (
    <View style={styles.container}>
      {sectionData.map((item, index) => (
        <CardMain key={index} {...item} />
      ))}
    </View>
  );
}

export default SectionCard;

const styles = StyleSheet.create({
  container: {
    gap: verticalScale(12),
  },
});
