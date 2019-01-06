import DataLoader, { Options as DataLoaderOptions } from 'dataloader';

import * as core from '../../core';
import { BatchLoadFunction } from './types';

export type MakeLoaderArgs<
  TKey,
  TValue extends { [key: string]: any }
> = MakeBatchFunctionArgs<TKey, TValue> &
  Readonly<{
    options?: DataLoaderOptions<TKey, TValue>;
  }>;

export function makeLoader<TKey, TValue extends { [key: string]: any }>({
  options,
  ...makeBatchLoadFunctionArgs
}: MakeLoaderArgs<TKey, TValue>): DataLoader<
  TKey,
  core.types.Nullable<TValue>
> {
  const batchLoadFunction = makeBatchLoadFunction(makeBatchLoadFunctionArgs);

  const loader = new DataLoader(batchLoadFunction as any, options);

  return loader as any;
}

export type MakeBatchFunctionArgs<
  TKey,
  TValue extends { [key: string]: any }
> = Readonly<
  {
    originalBatchLoadFunction: BatchLoadFunction<TKey, TValue>;
  } & (
    | { keyName: string; normalizeFunction?: undefined }
    | {
        normalizeFunction: NormalizeFunction<TKey, TValue>;
        keyName?: undefined;
      })
>;

export type NormalizeFunction<TKey, TValue extends { [key: string]: any }> = (
  key: TKey,
) => (value: TValue) => boolean;

export function makeBatchLoadFunction<
  TKey,
  TValue extends { [key: string]: any }
>(
  args: MakeBatchFunctionArgs<TKey, TValue>,
): BatchLoadFunction<TKey, core.types.Nullable<TValue>> {
  const batchFunction: BatchLoadFunction<
    TKey,
    core.types.Nullable<TValue>
  > = keys =>
    args.originalBatchLoadFunction(keys).then(values =>
      keys.map(key => {
        const findValuePredicate = args.normalizeFunction
          ? args.normalizeFunction(key)
          : makeDefaultNormalizeFunction(key, args.keyName as string);

        const foundValue = values.find(findValuePredicate);

        if (!foundValue) {
          return null;
        }

        return foundValue;
      }),
    );

  return batchFunction;
}

function makeDefaultNormalizeFunction<
  TKey,
  TValue extends { [k in TKeyName]: TKey },
  TKeyName extends string
>(key: TKey, keyName: TKeyName): (value: TValue) => boolean {
  return value => value[keyName] === key;
}
