import { useState } from 'react';

import DATA, { ColorSoundsData } from '@/constants/ColorSounds';

export type RandomColor = Colors.RED | Colors.GREEN | Colors.YELLOW | Colors.BLUE;

export enum Colors {
  RED = 'red',
  GREEN = 'green',
  YELLOW = 'yellow',
  BLUE = 'blue',
}

const COLORS_ARR: RandomColor[] = [Colors.BLUE, Colors.RED, Colors.GREEN, Colors.YELLOW];

export function useCustomColor() {
  const [color] = useState<ColorSoundsData>(getRandomColor(4));

  function getRandomColor(max: number) {
    const randomNumber = Math.floor(Math.random() * max);

    return DATA[COLORS_ARR[randomNumber]];
  }
  return color;
}
