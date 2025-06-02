/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import RNFS from 'react-native-fs';
import NativeWallpaper from '../../spec/NativeWallpaper';
import { heightPercentageToDP, widthPercentageToDP } from '../utils/responsive';


function WallpaperScreen(): React.JSX.Element {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const data = [
    require('../assets/image1.jpg'),
    require('../assets/image2.jpg'),
    require('../assets/image3.jpg'),
    require('../assets/image4.jpg'),
    require('../assets/image5.jpg'),
  ];

  const handleSetWallpaper = async () => {

    if (Platform.OS !== 'android') {
      Alert.alert(
        'Unsupported',
        'Wallpaper setting is only supported on Android for this module.',
      );
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      const assetSource = Image.resolveAssetSource(selectedImage);
      let filePath = assetSource.uri;

      if (filePath.startsWith('http')) {
        const localPath = `${RNFS.CachesDirectoryPath}/wallpaper.jpg`;
        await RNFS.downloadFile({fromUrl: filePath, toFile: localPath}).promise;
        filePath = localPath;
      }

      const success = await NativeWallpaper?.setWallpaper(filePath);
      if (success) {
        setStatus('Wallpaper set successfully!');
        Alert.alert('Success', 'Wallpaper set successfully!');
      } else {
        setStatus('Failed to set wallpaper.');
        Alert.alert('Failed', 'Failed to set wallpaper.');
      }
    } catch (e: any) {
      console.error('Wallpaper error:', e.code, e.message);
      setStatus(`Error: ${e.message}`);
      Alert.alert('Error', e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
      setModal(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(item);
              setModal(true);
            }}
            style={{paddingTop: heightPercentageToDP(4)}}>
            <Image
              source={item}
              style={{
                height: heightPercentageToDP(50),
                width: widthPercentageToDP(100),
              }}
              alt="checking"
            />
          </TouchableOpacity>
        )}
      />
      <Modal
        visible={modal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModal(false)}>
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {selectedImage && (
            <Image
              source={selectedImage}
              style={{
                width: widthPercentageToDP(80),
                height: heightPercentageToDP(60),
                borderRadius: 12,
                marginBottom: 20,
              }}
              resizeMode="contain"
            />
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSetWallpaper}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Set as Wallpaper</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#aaa', marginTop: 10}]}
            onPress={() => setModal(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {status && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#4C51BF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    minWidth: 180,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#E0F2F7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7D9EE',
  },
  statusText: {
    color: '#007B8A',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default WallpaperScreen;
