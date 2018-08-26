import * as IDBKeyVal from 'idb-keyval';

export async function set(key: string, value: any): Promise<void> {
  await IDBKeyVal.set(key, value);
}

export async function get(key: string): Promise<any> {
  const value = await IDBKeyVal.get(key);

  return value;
}

export async function remove(key: string): Promise<void> {
  await IDBKeyVal.del(key);
}

export async function clear(): Promise<void> {
  await IDBKeyVal.clear();
}
