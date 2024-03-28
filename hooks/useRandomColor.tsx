import { useState } from 'react';

export type RandomColor = 'red' | 'green' | 'yellow' | 'blue';

const COLORS_ARR: RandomColor[] = ['red', 'green', 'yellow', 'blue'];

export function useCustomColor() {
  const [color] = useState<RandomColor>(getRandomColor(4));

  function getRandomColor(max: number) {
    const randomNumber = Math.floor(Math.random() * max);
    console.log(randomNumber);
    return COLORS_ARR[randomNumber];
  }
  return color;
}
