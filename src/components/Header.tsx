import { Images } from '@assets/images';
import { AppNavigation } from '@navigation/AppNavigation';
import { moderateScale, scaleFont, verticalScale } from '@utils/scale';
import { FontFamily, FontWeight } from '@utils/typography';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  style?: ViewStyle;
}

function Header({
  title,
  onBackPress,
  showBackButton = true,
  style,
}: HeaderProps) {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      AppNavigation.goBack();
    }
  };

  return (
    <View style={[styles.header, style]}>
      <Text style={styles.headerTitle}>{title}</Text>
      {showBackButton ? (
        <TouchableOpacity onPress={handleBackPress}>
          <Image source={Images.ic_left_arrow} style={styles.backButtonImage} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: verticalScale(20),
    paddingBottom: verticalScale(12),
    backgroundColor: '#ffffff',
  },
  backButtonImage: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  headerTitle: {
    fontSize: scaleFont(24),
    lineHeight: scaleFont(26),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.medium,
    color: '#1a1a1a',
    textAlign: 'center',
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  placeholder: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
});
