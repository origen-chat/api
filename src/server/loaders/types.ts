export type BatchLoadFunction<TKey, TValue> = (
  keys: ReadonlyArray<TKey>,
) => Promise<ReadonlyArray<TValue>>;
