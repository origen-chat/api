import { createHash, HexBase64Latin1Encoding, randomBytes } from 'crypto';

import { NonNegativeInteger } from '../types';

export function sha256(
  data: string,
  encoding: HexBase64Latin1Encoding = 'hex',
): string {
  const hash = createHash('sha256')
    .update(data)
    .digest(encoding);

  return hash;
}

export async function generateRandomHexString(
  length: NonNegativeInteger,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const bytes = Math.ceil(length / 2);

    randomBytes(bytes, (error, buffer) => {
      if (error) {
        reject(error);

        return;
      }

      const hexString = buffer.toString('hex');

      resolve(hexString);
    });
  });
}
