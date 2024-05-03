import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ColorSoundsData } from '@/constants/ColorSounds';
import { useCustomColor } from '@/hooks/useRandomColor';

Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

export default function Page() {
  const randomColorData = useCustomColor();
  const [soundRight, setSoundRight] = useState<Audio.Sound>();
  const [soundCenter, setSoundCenter] = useState<Audio.Sound>();
  const [soundLeft, setSoundLeft] = useState<Audio.Sound>();

  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>();

  useEffect(() => {
    (async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      const soundRightAudio = await Audio.Sound.createAsync(randomColorData.soundRight);
      const soundCenterAudio = await Audio.Sound.createAsync(randomColorData.soundCenter);
      const soundLeftAudio = await Audio.Sound.createAsync(randomColorData.soundLeft);

      setSoundRight(soundRightAudio.sound);
      setSoundCenter(soundCenterAudio.sound);
      setSoundLeft(soundLeftAudio.sound);
      setOrientation(orientation);
    })();
  }, []);

  const play = (sound: Audio.Sound) => {
    sound.replayAsync().then((value) => console.log(value));
  };

  const handleOrientationChange = (event: ScreenOrientation.OrientationChangeEvent) => {
    setOrientation(event.orientationInfo.orientation);
  };

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    return () => ScreenOrientation.removeOrientationChangeListeners();
  }, []);

  useEffect(() => {
    console.log(orientation);
  }, [orientation]);

  useEffect(() => {
    if (soundRight) {
      return () => {
        soundRight.unloadAsync();
      };
    }

    if (soundCenter) {
      return () => {
        soundCenter.unloadAsync();
      };
    }

    if (soundLeft) {
      return () => {
        soundLeft.unloadAsync();
      };
    }
  }, [soundRight, soundCenter, soundLeft]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT ? (
        <>
          {soundRight && soundCenter && soundLeft && (
            <View style={styles(randomColorData).container}>
              <View style={styles(randomColorData).block}>
                <Pressable style={styles(randomColorData).button} onPress={() => play(soundRight)}>
                  <AntDesign name="caretleft" size={32} color="white" />
                </Pressable>
              </View>
              <View style={styles(randomColorData).block}>
                <Pressable style={styles(randomColorData).button} onPress={() => play(soundCenter)}>
                  <Octicons name="dot-fill" size={60} color="white" />
                </Pressable>
              </View>
              <View style={styles(randomColorData).block}>
                <Pressable style={styles(randomColorData).button} onPress={() => play(soundLeft)}>
                  <AntDesign name="caretright" size={32} color="white" />
                </Pressable>
              </View>
            </View>
          )}
        </>
      ) : (
        <>
          <View style={styles(randomColorData).infoBlockContainer}>
            <Ionicons name="phone-landscape-outline" size={24} color="black" />
            <Text>Change the orientation to the landscape</Text>
          </View>
        </>
      )}

      {/* TODO: Open when camera components will be created */}
      {/* <Link href="/camera">
        <Text>To camera</Text>
      </Link> */}
    </SafeAreaView>
  );
}

const styles = (colorData: ColorSoundsData) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 10,
      paddingRight: 10,
    },
    infoBlockContainer: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    block: {
      flex: 1,
      padding: 10,
    },
    button: {
      flex: 1,
      height: '100%',
      borderRadius: 10,
      backgroundColor: colorData.color,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
