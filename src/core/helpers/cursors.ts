import { Cursor, CursorData } from '../types';
import { decodeBase64, encodeBase64 } from './base64';

export function encodeCursor(cursorData: CursorData): Cursor {
  const stringifiedCursorData = JSON.stringify(cursorData);

  const cursor = encodeBase64(stringifiedCursorData);

  return cursor;
}

export function decodeCursor(cursor: Cursor): CursorData {
  const stringifiedCursorData = decodeBase64(cursor);

  const cursorData = JSON.parse(stringifiedCursorData);

  return cursorData;
}

export function isCursor(value: string): value is Cursor {
  let cursorData: CursorData;

  try {
    const stringifiedCursorData = decodeBase64(value);

    cursorData = JSON.parse(stringifiedCursorData);
  } catch {
    return false;
  }

  if (typeof cursorData !== 'object') {
    return false;
  }

  if (!cursorData || !cursorData.order || !Array.isArray(cursorData.order)) {
    return false;
  }

  if (
    !cursorData.order.every((orderValue: unknown) =>
      ['string', 'number', 'boolean'].includes(typeof orderValue),
    )
  ) {
    return false;
  }

  return true;
}
