import { AppNavigation } from '@navigation/AppNavigation';
import { ROUTES } from '@navigation/routes';
import { SupabaseService } from '@services/supabase.service';
import { scaleFont, verticalScale } from '@utils/scale';
import { FontFamily, FontWeight } from '@utils/typography';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Header from './components/Header';
import SectionCard from './components/SectionCard';

interface Props {}

function HomeScreen(props: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={$container}>
      <View style={[styles.content, { marginTop: insets.top }]}>
        <Header />
        <View style={styles.section}>
          <SectionCard />
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Button title="Sign Out" onPress={handleSignOut} color="#ff3b30" />
        </View> */}
      </View>
    </View>
  );
}

export default HomeScreen;

const $container: ViewStyle = {
  flex: 1,
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: verticalScale(16),
    gap: verticalScale(16),
  },
  title: {
    fontSize: scaleFont(20),
    fontFamily: FontFamily.bold,
    fontWeight: FontWeight.bold,
  },
  description: {
    fontSize: scaleFont(14),
    fontFamily: FontFamily.regular,
    fontWeight: FontWeight.regular,
  },
  section: {},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  loader: {
    marginTop: 10,
  },
  status: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    fontSize: 14,
  },
});
