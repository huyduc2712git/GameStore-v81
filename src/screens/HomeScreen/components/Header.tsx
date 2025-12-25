import { moderateScale, scaleFont, verticalScale } from '@utils/scale';
import { FontFamily, FontWeight } from '@utils/typography';
import { Image, StyleSheet, Text, View } from 'react-native';

function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.contentLeft}>
        <Text style={styles.title}>{`Hi' ${'Joker'}`}</Text>
        <Text style={styles.description}>{`Good morning.`}</Text>
      </View>
      <View style={styles.contentRight}>
        <Image
          source={{
            uri: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg',
          }}
          style={styles.profileImage}
        />
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentLeft: {
    gap: verticalScale(3),
  },
  contentRight: {
    width: verticalScale(48),
    height: verticalScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: '#E8ECF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: scaleFont(22),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
  },
  description: {
    fontSize: scaleFont(16),
    fontFamily: FontFamily.regular,
    fontWeight: FontWeight.regular,
    color: '#808080',
  },
  profileImage: {
    width: verticalScale(48),
    height: verticalScale(48),
    borderRadius: moderateScale(24),
  },
});
