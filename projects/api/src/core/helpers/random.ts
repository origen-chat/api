import { Integer } from '../types';

export function generateRandomInteger(
  min: Integer = 0,
  max: Integer = 100,
): Integer {
  const randomInteger = Math.floor(Math.random() * (max - min + 1) + min);

  return randomInteger;
}
