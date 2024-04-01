import { AVPlaybackSource } from 'expo-av';

export interface ColorSounds {
  [key: string]: ColorSoundsData;
}

export interface ColorSoundsData {
  color: string;
  soundRight: AVPlaybackSource;
  soundCenter: AVPlaybackSource;
  soundLeft: AVPlaybackSource;
}

export default {
  red: {
    color: '#d34437',
    soundRight: require('../assets/sounds/_C5.mp3'),
    soundCenter: require('../assets/sounds/_F4.mp3'),
    soundLeft: require('../assets/sounds/_B3.mp3'),
  },
  green: {
    color: '#408d51',
    soundRight: require('../assets/sounds/_D5.mp3'),
    soundCenter: require('../assets/sounds/_A4.mp3'),
    soundLeft: require('../assets/sounds/_C4.mp3'),
  },
  blue: {
    color: '#254889',
    soundRight: require('../assets/sounds/_E5.mp3'),
    soundCenter: require('../assets/sounds/_G4.mp3'),
    soundLeft: require('../assets/sounds/_D4.mp3'),
  },
  yellow: {
    color: '#f5c148',
    soundRight: require('../assets/sounds/_B4.mp3'),
    soundCenter: require('../assets/sounds/_E4.mp3'),
    soundLeft: require('../assets/sounds/_A3.mp3'),
  },
} as ColorSounds;
