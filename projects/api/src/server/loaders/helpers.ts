import DataLoader from 'dataloader';

import * as core from '../../core';
import { BatchLoadFunction } from './types';

export type MakeLoaderArgs<
  TKey,
  TValue extends { [key in TKeyName]: TKey },
  TKeyName extends keyof TValue
> = MakeBatchFunctionArgs<TKey, TValue, TKeyName>;

export function makeLoader<
  TKey,
  TValue extends { [key in TKeyName]: TKey },
  TKeyName extends keyof TValue
>(args: MakeLoaderArgs<TKey, TValue, TKeyName>): DataLoader<TKey, TValue> {
  const batchLoadFunction = makeBatchLoadFunction({
    originalBatchLoadFunction: args.originalBatchLoadFunction,
    keyName: args.keyName,
  });

  const loader = new DataLoader(batchLoadFunction as any);

  return loader as any;
}

export type MakeBatchFunctionArgs<
  TKey,
  TValue extends { [key in TKeyName]: TKey },
  TKeyName extends keyof TValue
> = Readonly<{
  originalBatchLoadFunction: BatchLoadFunction<TKey, TValue>;
  keyName: TKeyName;
}>;

export function makeBatchLoadFunction<
  TKey,
  TValue extends { [key in TKeyName]: TKey },
  TKeyName extends keyof TValue
>({
  originalBatchLoadFunction,
  keyName,
}: MakeBatchFunctionArgs<TKey, TValue, TKeyName>): BatchLoadFunction<
  TKey,
  core.types.Nullable<TValue>
> {
  const batchFunction: BatchLoadFunction<
    TKey,
    core.types.Nullable<TValue>
  > = keys =>
    originalBatchLoadFunction(keys).then(values =>
      keys.map(key => {
        const foundValue = values.find(value => value[keyName] === key);

        if (!foundValue) {
          return null;
        }

        return foundValue;
      }),
    );

  return batchFunction;
}
