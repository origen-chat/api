import { URL } from '../types';

import { storageBaseUrl } from './constants';

export function makeFileUrl(bucketName: string, fileName: string): URL {
  const fileUrl = `${storageBaseUrl}${bucketName}/${fileName}`;

  return fileUrl;
}
