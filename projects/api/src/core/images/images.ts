import { uploadFiles } from '../storage';
import { FileUpload, URL } from '../types';
import { processImages } from './processing';

export type UploadImagesArgs = Readonly<{
  images: ReadonlyArray<FileUpload>;
  namespace: string;
}>;

export async function uploadImages(
  args: UploadImagesArgs,
): Promise<ReadonlyArray<URL>> {
  const processedImages = processImages({ images: args.images });

  const urls = await uploadFiles({
    files: processedImages,
    namespace: args.namespace,
  });

  return urls;
}
