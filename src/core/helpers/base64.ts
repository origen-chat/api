import { Base64 } from '../types';

export function encodeBase64(decodedData: string): Base64 {
  const encodedData = Buffer.from(decodedData).toString('base64');

  return encodedData;
}

export function decodeBase64(encodedData: Base64): string {
  const decodedData = Buffer.from(encodedData, 'base64').toString('utf8');

  return decodedData;
}
