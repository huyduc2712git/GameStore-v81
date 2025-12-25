import { moderateScale, scaleFont, verticalScale } from '@utils/scale';
import { FontFamily, FontWeight } from '@utils/typography';
import {
  Button,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  colors: string[];
  title: string;
  description: string;
  onPress: () => void;
  image: ImageSourcePropType | undefined;
}

function CardMain(props: Props) {
  const {
    colors = ['#d75fe1', '#4a4ae2'],
    title,
    description,
    onPress,
    image,
  } = props;

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.4, y: 0 }}
      style={{
        borderRadius: moderateScale(12),
      }}
    >
      <View style={styles.container}>
        <View style={styles.contentLeft}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{'Know More'}</Text>
          </Pressable>
        </View>
        <View>
          <Image source={image} style={styles.imageCard} />
        </View>
      </View>
    </LinearGradient>
  );
}

export default CardMain;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: verticalScale(12),
    gap: verticalScale(12),
  },
  contentLeft: {
    flex: 1,
    gap: verticalScale(8),
  },
  imageCard: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  title: {
    fontSize: scaleFont(20),
    lineHeight: scaleFont(24),
    fontFamily: FontFamily.fredokaSemiBold,
    color: '#fff',
  },
  description: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(18),
    fontFamily: FontFamily.medium,
    color: '#fff',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#ffcc5b',
    padding: verticalScale(8),
    borderRadius: moderateScale(6),
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: scaleFont(16),
    lineHeight: scaleFont(18),
    fontFamily: FontFamily.fredokaSemiBold,
    color: '#515dae',
  },
});
