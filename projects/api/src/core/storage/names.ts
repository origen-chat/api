import uuidv4 from 'uuid/v4';

export function makeFilename(
  namespace: string,
  originalFilename: string,
): string {
  const filename = `${namespace}/${uuidv4()}/${originalFilename}`;

  return filename;
}
