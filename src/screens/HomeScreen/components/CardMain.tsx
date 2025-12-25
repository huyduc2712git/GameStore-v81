import { Images } from '@assets/images';
import { moderateScale, scaleFont, verticalScale } from '@utils/scale';
import { FontFamily, FontWeight } from '@utils/typography';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppNavigation } from '@navigation/AppNavigation';
import { ROUTES } from '@navigation/routes';

function CardMain() {
  const onPressPlayPhoto = () => {
    AppNavigation.navigate(ROUTES.PHOTOS.name);
  };
  return (
    <LinearGradient
      colors={['#d75fe1', '#4a4ae2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.4, y: 0 }}
      style={{
        borderRadius: moderateScale(12),
      }}
    >
      <View style={styles.container}>
        <View style={styles.contentLeft}>
          <Text style={styles.title}>Photos</Text>
          <Text style={styles.description}>
            Phụ vụ upload ảnh và xem ảnh, chúc các bạn trải nghiệm thú vị
          </Text>
          <Pressable style={styles.button} onPress={onPressPlayPhoto}>
            <Text style={styles.buttonText}>Play Photo</Text>
          </Pressable>
        </View>
        <View>
          <Image source={Images.bg_card_photo} style={styles.imageCard} />
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
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
    color: '#fff',
  },
  description: {
    fontSize: scaleFont(14),
    fontFamily: FontFamily.regular,
    fontWeight: FontWeight.light,
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
    fontSize: scaleFont(14),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
    color: '#515dae',
  },
});
