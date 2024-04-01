import { AntDesign, Octicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ColorSoundsData } from '@/constants/ColorSounds';
import { useCustomColor } from '@/hooks/useRandomColor';

Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

export default function Page() {
  const randomColorData = useCustomColor();

  const rightTapIn = async () => {
    const { sound } = await Audio.Sound.createAsync(randomColorData.soundRight);
    await sound.playAsync();
  };

  const centerTapIn = async () => {
    const { sound } = await Audio.Sound.createAsync(randomColorData.soundCenter);
    await sound.playAsync();
  };

  const leftTapIn = async () => {
    const { sound } = await Audio.Sound.createAsync(randomColorData.soundLeft);
    await sound.playAsync();
  };

  useEffect(() => console.log(randomColorData), [randomColorData]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* TODO: Open when camera components will be created */}
      {/* <Link href="/camera">
        <Text>To camera</Text>
      </Link> */}
      <View style={styles(randomColorData).container}>
        <View style={styles(randomColorData).block}>
          <View style={styles(randomColorData).button} onTouchStart={rightTapIn}>
            <AntDesign name="caretup" size={32} color="white" />
          </View>
        </View>
        <View style={styles(randomColorData).block}>
          <View style={styles(randomColorData).button} onTouchStart={centerTapIn}>
            <Octicons name="dot-fill" size={60} color="white" />
          </View>
        </View>
        <View style={styles(randomColorData).block}>
          <View style={styles(randomColorData).button} onTouchStart={leftTapIn}>
            <AntDesign name="caretdown" size={32} color="white" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = (colorData: ColorSoundsData) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      paddingLeft: 10,
      paddingRight: 10,
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
