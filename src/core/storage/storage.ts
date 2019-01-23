import stream from 'stream';

import * as config from '../../config';
import { FileUpload, URL } from '../types';

import { storage } from './client';
import { makeFilename } from './names';
import { makeFileUrl } from './urls';

export type UploadFilesArgs = Readonly<{
  files: ReadonlyArray<FileUpload>;
  namespace: string;
}>;

export async function uploadFiles(
  args: UploadFilesArgs,
): Promise<ReadonlyArray<URL>> {
  const promisesToUpload = args.files.map(async file => {
    const filename = makeFilename(args.namespace, file.filename);

    const bucket = storage.bucket(config.env.gcpStorageBucketName);

    const writableStream = bucket
      .file(filename)
      .createWriteStream({ metadata: { contentType: file.mimetype } });

    await pipeFileToBucket(file.stream, writableStream);

    const url = makeFileUrl(bucket.name, filename);

    return url;
  });

  const urls = await Promise.all(promisesToUpload);

  return urls;
}

function pipeFileToBucket(
  fileStream: stream.Readable,
  bucketStream: stream.Writable,
): Promise<void> {
  const promise = new Promise((resolve, reject) => {
    fileStream
      .pipe(bucketStream)
      .on('error', error => {
        reject(error);
      })
      .on('finish', () => resolve());
  }) as Promise<void>;

  return promise;
}
