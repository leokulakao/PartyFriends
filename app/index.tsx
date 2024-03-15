import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

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
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity style={{flex: 1, backgroundColor: 'red'}} onPress={playSound}>
          <View />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, backgroundColor: 'darkorange'}} onPress={playSound}>
          <View />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, backgroundColor: 'green'}} onPress={playSound}>
          <View />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
