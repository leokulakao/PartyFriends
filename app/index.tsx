import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

export default function TabOneScreen() {
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.block}>
            <View style={styles.button} onTouchStart={firstTapIn}>
              <AntDesign name="caretup" size={32} color="white" />
            </View>
          </View>
          <View style={styles.block}>
            <View style={styles.button} onTouchStart={secondTapIn}>
              <AntDesign name="star" size={32} color="white" />
            </View>
          </View>
          <View style={styles.block}>
            <View style={styles.button} onTouchStart={thirdTapIn}>
              <AntDesign name="caretdown" size={32} color="white" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
