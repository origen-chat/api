import { FileUpload } from '../types';

export type ProcessImagesArgs = Readonly<{
  images: ReadonlyArray<FileUpload>;
}>;

export async function processImages(
  args: ProcessImagesArgs,
): Promise<ReadonlyArray<FileUpload>> {
  return args.images;
}
