import {useNavigation, NavigationProp} from '@react-navigation/native';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from '../utils/responsive';

type RootStackParamList = {
  Home: undefined;
  Calculator: undefined;
  Wallpaper: undefined;
};

function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const NavData: Array<{ navigate: keyof RootStackParamList; icon: any }> = [
    {
      navigate: 'Calculator',
      icon: require('../assets/calculator.png'),
    },
    {
      navigate: 'Wallpaper',
      icon: require('../assets/wallpaper.png'),
    },
  ];
  return (
    <>
      <FlatList
        data={NavData}
        numColumns={3}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.navigate)}
          style={{
              height: heightPercentageToDP(10),
              paddingRight: widthPercentageToDP(5),
              paddingLeft: widthPercentageToDP(3),
              marginTop: heightPercentageToDP(5),
            }}>
            <Image
              style={{
                height: heightPercentageToDP(5),
                width: widthPercentageToDP(15),
              }}
              resizeMode="contain"
              source={item.icon}
            />
            <Text>{item.navigate}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

export default HomeScreen;
