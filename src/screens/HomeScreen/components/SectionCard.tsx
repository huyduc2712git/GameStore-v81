import { StyleSheet, Text, View } from 'react-native';
import CardMain from './CardMain';

interface Props {}

function SectionCard(props: Props) {
  return (
    <View style={styles.container}>
      <CardMain />
    </View>
  );
}

export default SectionCard;

const styles = StyleSheet.create({
  container: {},
});
