import { createHash, HexBase64Latin1Encoding } from 'crypto';

export const sha256 = (
  data: string,
  encoding: HexBase64Latin1Encoding = 'hex',
): string =>
  createHash('sha256')
    .update(data)
    .digest(encoding);
