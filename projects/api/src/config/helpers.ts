import { ConfigError } from './errors';
import { GetEnvOrThrowOptions, ValueType } from './types';

export function getEnvOrThrow<TReturn>(
  key: string,
  options: GetEnvOrThrowOptions,
): TReturn {
  const value = process.env[key];

  if (!value) {
    if (options.defaultValue === undefined) {
      throw new ConfigError(`${key} environmental variable not set`);
    } else {
      return options.defaultValue as any;
    }
  }

  return castValue<TReturn>(value, options.valueType);
}

export function castValue<TReturn>(value: string, type: ValueType): TReturn {
  if (type === 'boolean') {
    if (value === 'false') {
      return false as any;
    }

    return true as any;
  }

  if (type === 'number') {
    return parseInt(value, 10) as any;
  }

  return value as any;
}
