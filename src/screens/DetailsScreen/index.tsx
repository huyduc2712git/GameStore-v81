import { AppNavigation } from '@navigation/AppNavigation';
import { ROUTES } from '@navigation/routes';
import { Button, Text, View } from 'react-native';

interface Props {}

function DetailsScreen(props: Props) {
  return (
    <View>
      <Text>DetailsScreen</Text>
      <Button title="Go Details" onPress={() => AppNavigation.goBack()} />
    </View>
  );
}

export default DetailsScreen;
