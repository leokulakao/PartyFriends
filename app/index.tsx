import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RandomColor, useCustomColor } from '@/hooks/useRandomColor';

Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

export default function Page() {
  const randomColor = useCustomColor();

  const firstTapIn = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/1.mp3'));
    await sound.playAsync();
  };

  const secondTapIn = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/2.mp3'));
    await sound.playAsync();
  };

  const thirdTapIn = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/3.mp3'));
    await sound.playAsync();
  };

  useEffect(() => console.log(randomColor), [randomColor]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* TODO: Open when camera components will be created */}
      {/* <Link href="/camera">
        <Text>To camera</Text>
      </Link> */}
      <View style={styles(randomColor).container}>
        <View style={styles(randomColor).block}>
          <View style={styles(randomColor).button} onTouchStart={firstTapIn}>
            <AntDesign name="caretup" size={32} color="white" />
          </View>
        </View>
        <View style={styles(randomColor).block}>
          <View style={styles(randomColor).button} onTouchStart={secondTapIn}>
            <AntDesign name="star" size={32} color="white" />
          </View>
        </View>
        <View style={styles(randomColor).block}>
          <View style={styles(randomColor).button} onTouchStart={thirdTapIn}>
            <AntDesign name="caretdown" size={32} color="white" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = (color: RandomColor) =>
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
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
