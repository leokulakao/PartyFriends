import { Canvas, Image, SkImage, Skia, useImage } from '@shopify/react-native-skia';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { PhotoFile } from 'react-native-vision-camera';

const { width, height } = Dimensions.get('window');
// export const ImageDimensions = rect(0, 0, width, height);

const imageGlass = require('../assets/images/glass.png');

interface PreviewViewProps {
  photo: PhotoFile;
}

export default function PreviewView(props: PreviewViewProps) {
  const { photo } = props;

  const [image, setImage] = useState<SkImage>();
  const glass = useImage(imageGlass);

  useEffect(() => {
    console.log('dimentions ', width, height);
    loadImage();
  }, [photo]);

  const loadImage = async () => {
    const imageData = await Skia.Data.fromURI(`file://${photo.path}`);
    if (imageData == null) {
      return;
    }

    const image = Skia.Image.MakeImageFromEncoded(imageData);
    if (image == null) {
      return;
    }
    setImage(image);
  };

  useEffect(() => console.log(image), [image]);
  return (
    <Canvas style={styles.container}>
      <Image x={0} y={0} width={width} height={height} image={image} fit="cover" />
      <Image x={0} y={0} width={width} height={height} image={glass} fit="cover" />
    </Canvas>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});
