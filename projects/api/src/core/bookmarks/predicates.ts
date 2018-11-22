import { Bookmark } from './types';

export function isBookmark(value: any): value is Bookmark {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.authorId &&
    (value.messageId || value.messageId === null)
  );
}
