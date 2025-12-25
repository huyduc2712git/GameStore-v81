import { moderateScale, scaleFont, verticalScale } from '@utils/scale';
import { FontFamily, FontWeight } from '@utils/typography';
import {
  ImageSourcePropType,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface Props {
  image: ImageSourcePropType | undefined;
  title: string;
  description: string;
  onPress?: () => void;
}

function CardGame(props: Props) {
  const { image, title, description, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default CardGame;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: verticalScale(8),
    flex: 1,
    paddingHorizontal: verticalScale(12),
    paddingVertical: verticalScale(8),
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: moderateScale(8),
  },
  image: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(8),
  },
  textContainer: {
    flex: 1,
    flexShrink: 1,
  },
  title: {
    fontSize: scaleFont(16),
    fontFamily: FontFamily.fredokaSemiBold,
    color: '#1a1a1a',
    marginBottom: verticalScale(4),
  },
  description: {
    fontSize: scaleFont(12),
    fontFamily: FontFamily.regular,
    color: '#666666',
  },
});
