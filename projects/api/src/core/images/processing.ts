import sharp from 'sharp';

import { FileUpload, NonNegativeInteger } from '../types';

export type ProcessImagesArgs = Readonly<{
  images: ReadonlyArray<FileUpload>;
  resize?: Readonly<{
    width?: NonNegativeInteger;
    height?: NonNegativeInteger;
  }>;
}>;

export function processImages(
  args: ProcessImagesArgs,
): ReadonlyArray<FileUpload> {
  let pipeline = sharp().webp();

  if (args.resize) {
    pipeline = pipeline.resize(args.resize.width, args.resize.height);
  }

  const transformedImages = args.images.map(image => {
    const stream = image.stream.pipe(pipeline);

    const transformedImage: FileUpload = {
      ...image,
      stream,
    };

    return transformedImage;
  });

  return transformedImages;
}
