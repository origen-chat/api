import { Workspace } from './types';

export function isWorkspace(value: any): value is Workspace {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.name &&
    value.displayName &&
    (value.description || value.description === null)
  );
}
