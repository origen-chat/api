import { Base64 } from '../types';

export function encodeBase64(decodedData: string): Base64 {
  return Buffer.from(decodedData).toString('base64');
}

export function decodeBase64(encodedData: Base64): string {
  return Buffer.from(encodedData, 'base64').toString('utf8');
}
