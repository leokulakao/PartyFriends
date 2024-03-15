import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

import { Gesture, GestureDetector, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

export default function TabOneScreen() {

  const [sound, setSound] = useState<Audio.Sound>();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/note.mp3'));
    setSound(sound)
    await sound.playAsync();
  }

  const firstTap = Gesture.Tap().onEnd((_event, success) => {
    if (success) {
      console.log('firstTap', _event)
    }
  })

  const secondTap = Gesture.Tap().numberOfTaps(2).onEnd((_event, success) => {
    if (success) {
      console.log('secondTap', _event)
    }
  })

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>

          <GestureDetector gesture={Gesture.Simultaneous(firstTap, secondTap)} >
          <View style={{flex: 1, backgroundColor: 'red'}}>
          </View>
          </GestureDetector>

          <View style={{flex: 1, backgroundColor: 'red'}}>
          </View>
          <View style={{flex: 1, backgroundColor: 'darkorange'}}>
          </View>
          <View style={{flex: 1, backgroundColor: 'green'}}>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
