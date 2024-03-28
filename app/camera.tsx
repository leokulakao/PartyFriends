import { useImage } from '@shopify/react-native-skia';
import { Image } from 'expo-image';
import { useCallback, useRef, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  Camera,
  CameraRuntimeError,
  PhotoFile,
  useCameraDevice,
  useMicrophonePermission,
} from 'react-native-vision-camera';

import NoCameraView from '@/components/NoCameraView';
import PreviewView from '@/components/PreviewView';

export default function CameraPage() {
  const device = useCameraDevice('back');
  const camera = useRef<Camera | null>(null);
  const [photo, setPhoto] = useState<PhotoFile>();
  const image = useImage(photo?.path);

  const { hasPermission, requestPermission } = useMicrophonePermission();

  if (!hasPermission) {
    requestPermission();
  }

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');

      console.log('Taking photo...');
      const photo = await camera.current.takePhoto();
      setPhoto(photo);
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera]);

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  if (device == null) return <NoCameraView />;
  return (
    <>
      {photo ? (
        <PreviewView photo={photo} />
      ) : (
        <View style={styles.container}>
          <Camera
            style={StyleSheet.absoluteFill}
            onStarted={() => 'Camera started!'}
            onStopped={() => 'Camera stopped!'}
            onError={onError}
            ref={camera}
            photo
            device={device}
            audio={hasPermission}
            isActive
          />

          <Image style={StyleSheet.absoluteFill} source={require('../assets/images/glass.png')} />
          <TouchableOpacity
            style={{ position: 'absolute', alignSelf: 'center', bottom: 200 }}
            onPress={takePhoto}>
            <Text>Take a photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  image: {
    flex: 1,
    position: 'relative',
    height: '100%',
    zIndex: 0,
  },
});
