import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

export default function TabOneScreen() {

  const [sound, setSound] = useState<Audio.Sound>();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/note.mp3'));
    setSound(sound)
    await sound.playAsync();
  }

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
          
          <View style={{flex: 1, backgroundColor: 'red'}}>
            <TouchableOpacity style={{ width: '100%', height: '100%'}} onPress={playSound}>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, backgroundColor: 'darkorange'}}>
            <TouchableOpacity style={{ width: '100%', height: '100%'}} onPress={playSound}>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, backgroundColor: 'green'}}>
            <TouchableOpacity style={{ width: '100%', height: '100%'}} onPress={playSound}>
            </TouchableOpacity>
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
